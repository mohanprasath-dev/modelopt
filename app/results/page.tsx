"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Share2, Printer, RotateCcw, Scale } from "lucide-react"

import modelsData from "@/lib/data/models.json"
import gpusData from "@/lib/data/gpus.json"
import { Button } from "@/components/ui/button"
import { SystemAnalysisCard } from "@/components/results/SystemAnalysisCard"
import {
  ModelRecommendationCard,
  type RecommendationCardData,
} from "@/components/results/ModelRecommendationCard"
import {
  AlternativeModelsTable,
  type AlternativeModel,
} from "@/components/results/AlternativeModelsTable"
import { UpgradeSuggestion } from "@/components/results/UpgradeSuggestion"

interface OptimizeApiResult {
  input: {
    gpu: string
    ram_gb: number
    vram_gb: number
    use_cases: string[]
    speed_preference: number
    deployment: "local" | "cloud"
  }
  summary: string
  meta?: {
    generated_at?: string
  }
  warnings?: string[]
  recommendations?: Array<{
    name: string
    display_name: string
    reason: string
    confidence: number
  }>
}

interface ModelSpec {
  name: string
  display_name: string
  size: string
  vram_min_gb: number
  ram_min_gb: number
  use_cases: string[]
  quantizations: string[]
  context_window: number
  ollama_install: string
  strengths: string
  weaknesses: string
  alternatives: {
    llama_cpp: string
    huggingface: string
  }
  tokens_per_sec_estimate: {
    rtx_4090: number
    rtx_4070: number
    rtx_3060: number
    apple_m2: number
  }
}

interface CompareModel {
  name: string
  display_name: string
  size: string
  vram_min_gb: number
  context_window: number
  use_cases: string[]
  est_speed_tps: number
}

const modelCatalog = modelsData.models as ModelSpec[]
const modelLookup = new Map(modelCatalog.map((item) => [item.name, item]))
const gpuLookup = new Map(gpusData.gpus.map((item) => [item.id, item]))
const MAX_RESULT_AGE_MS = 12 * 60 * 60 * 1000

function averageSpeed(model: ModelSpec): number {
  const tps = model.tokens_per_sec_estimate
  return (tps.rtx_4090 + tps.rtx_4070 + tps.rtx_3060 + tps.apple_m2) / 4
}

const modelSpeedLookup = new Map(modelCatalog.map((model) => [model.name, averageSpeed(model)]))

function useCaseOverlapScore(modelUseCases: string[], requestedUseCases: string[]): number {
  const requested = new Set(requestedUseCases.map((item) => item.toLowerCase()))
  return modelUseCases.reduce(
    (count, useCase) => (requested.has(useCase.toLowerCase()) ? count + 1 : count),
    0
  )
}

function buildCardData(result: OptimizeApiResult): RecommendationCardData[] {
  const slots: RecommendationCardData["slot"][] = ["PRIMARY", "SECONDARY", "LIGHTWEIGHT"]
  const topThree = (result.recommendations ?? []).slice(0, 3)

  return topThree
    .map((entry, index) => {
      const dbModel = modelLookup.get(entry.name)
      if (!dbModel) {
        return null
      }

      return {
        slot: slots[index] ?? "LIGHTWEIGHT",
        name: dbModel.name,
        display_name: dbModel.display_name,
        size: dbModel.size,
        reasoning: entry.reason,
        tokens_per_sec_estimate: modelSpeedLookup.get(dbModel.name) ?? averageSpeed(dbModel),
        context_window: dbModel.context_window,
        recommended_quantization: dbModel.quantizations[0] ?? "Q4_K_M",
        ollama_install: dbModel.ollama_install,
        llama_cpp: dbModel.alternatives.llama_cpp,
        huggingface: dbModel.alternatives.huggingface,
        strengths: dbModel.strengths,
        weaknesses: dbModel.weaknesses,
      }
    })
    .filter((entry): entry is RecommendationCardData => Boolean(entry))
}

function buildAlternativeModels(result: OptimizeApiResult): AlternativeModel[] {
  const used = new Set((result.recommendations ?? []).slice(0, 3).map((entry) => entry.name))

  return modelCatalog
    .filter((model) => !used.has(model.name))
    .filter((model) => model.ram_min_gb <= result.input.ram_gb)
    .filter((model) => result.input.deployment === "cloud" || model.vram_min_gb <= result.input.vram_gb)
    .filter((model) => model.use_cases.length > 0)
    .sort((a, b) => {
      const overlapDiff =
        useCaseOverlapScore(b.use_cases, result.input.use_cases) -
        useCaseOverlapScore(a.use_cases, result.input.use_cases)

      if (overlapDiff !== 0) {
        return overlapDiff
      }

      return (modelSpeedLookup.get(b.name) ?? 0) - (modelSpeedLookup.get(a.name) ?? 0)
    })
    .slice(0, 20)
    .map((model) => ({
      name: model.name,
      display_name: model.display_name,
      size: model.size,
      vram_min_gb: model.vram_min_gb,
      use_cases: model.use_cases,
      est_speed_tps: modelSpeedLookup.get(model.name) ?? averageSpeed(model),
    }))
}

function getSystemScore(vramGb: number, ramGb: number): "green" | "yellow" | "red" {
  if (vramGb >= 16 && ramGb >= 32) {
    return "green"
  }

  if (vramGb >= 8 && ramGb >= 16) {
    return "yellow"
  }

  return "red"
}

function findUpgradeSuggestion(warnings?: string[]): string | null {
  const match = warnings?.find((warning) => /upgrade|vram|ram|memory|limited/i.test(warning))
  return match ?? null
}

export default function ResultsPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [result, setResult] = React.useState<OptimizeApiResult | null>(null)
  const [generatedAt, setGeneratedAt] = React.useState("")
  const [selectedCompare, setSelectedCompare] = React.useState<string[]>([])
  const [isExportingPdf, setIsExportingPdf] = React.useState(false)

  const loadData = React.useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const raw = sessionStorage.getItem("modelopt_last_result")
      if (!raw) {
        setResult(null)
        return
      }

      const parsed = JSON.parse(raw) as OptimizeApiResult
      if (!parsed?.input?.gpu || !Array.isArray(parsed.recommendations)) {
        throw new Error("Invalid result payload")
      }

      const generatedAtIso = parsed.meta?.generated_at
      if (generatedAtIso) {
        const generatedAtMs = Number(new Date(generatedAtIso))
        if (!Number.isNaN(generatedAtMs) && Date.now() - generatedAtMs > MAX_RESULT_AGE_MS) {
          sessionStorage.removeItem("modelopt_last_result")
          throw new Error("Saved results expired")
        }
        setGeneratedAt(new Date(generatedAtIso).toLocaleString())
      } else {
        setGeneratedAt(new Date().toLocaleString())
      }

      setResult(parsed)
    } catch (loadError) {
      console.error(loadError)
      setError("We could not load your results. Please optimize again.")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void loadData()
  }, [loadData])

  React.useEffect(() => {
    if (!loading && !result && !error) {
      const timer = window.setTimeout(() => {
        router.push("/app")
      }, 1200)

      return () => window.clearTimeout(timer)
    }
  }, [loading, result, error, router])

  const comparePool = React.useMemo(() => {
    return new Map<string, CompareModel>(
      modelCatalog.map((model) => [
        model.name,
        {
          name: model.name,
          display_name: model.display_name,
          size: model.size,
          vram_min_gb: model.vram_min_gb,
          context_window: model.context_window,
          use_cases: model.use_cases,
          est_speed_tps: modelSpeedLookup.get(model.name) ?? averageSpeed(model),
        },
      ])
    )
  }, [])

  React.useEffect(() => {
    if (!result) {
      return
    }

    const fromQuery = (new URLSearchParams(window.location.search).get("compare") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((name) => comparePool.has(name))
      .slice(0, 4)

    if (fromQuery.join(",") !== selectedCompare.join(",")) {
      setSelectedCompare(fromQuery)
    }
  }, [comparePool, result, selectedCompare])

  React.useEffect(() => {
    if (!result) {
      return
    }

    const params = new URLSearchParams(window.location.search)
    const currentCompare = params.get("compare") ?? ""
    const nextCompare = selectedCompare.join(",")

    if (currentCompare === nextCompare) {
      return
    }

    if (nextCompare) {
      params.set("compare", nextCompare)
    } else {
      params.delete("compare")
    }

    const suffix = params.toString()
    const nextUrl = suffix ? `${window.location.pathname}?${suffix}` : window.location.pathname
    window.history.replaceState({}, "", nextUrl)
  }, [result, selectedCompare])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6 text-slate-700">
        <p>Loading your optimized stack...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6 text-slate-900">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_16px_36px_rgba(15,23,42,0.1)]">
          <h1 className="text-2xl font-bold">No results found</h1>
          <p className="mt-3 text-slate-600">{error}</p>
          <div className="mt-5 flex justify-center gap-3">
            <Button onClick={() => router.push("/app")} className="bg-blue-600 text-white hover:bg-blue-500">
              Go to Optimizer
            </Button>
            <Button variant="outline" onClick={() => void loadData()}>
              Retry
            </Button>
          </div>
        </section>
      </main>
    )
  }

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-6 text-slate-900">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_16px_36px_rgba(15,23,42,0.1)]">
          <h1 className="text-2xl font-bold">No results found</h1>
          <p className="mt-3 text-slate-600">Redirecting to optimizer...</p>
          <div className="mt-5">
            <Button onClick={() => router.push("/app")} className="bg-blue-600 text-white hover:bg-blue-500">
              Back to Optimizer
            </Button>
          </div>
        </section>
      </main>
    )
  }

  const gpuName = gpuLookup.get(result.input.gpu)?.display_name ?? result.input.gpu
  const cards = buildCardData(result)
  const alternatives = buildAlternativeModels(result)
  const upgradeSuggestion = findUpgradeSuggestion(result.warnings)
  const systemScore = getSystemScore(result.input.vram_gb, result.input.ram_gb)

  const toggleCompare = (name: string) => {
    setSelectedCompare((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name)
      }

      if (prev.length >= 4) {
        return prev
      }

      return [...prev, name]
    })
  }

  const selectedModels = selectedCompare
    .map((name) => comparePool.get(name))
    .filter((model): model is CompareModel => Boolean(model))

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      window.prompt("Copy this link", window.location.href)
    }
  }

  const startOver = () => {
    sessionStorage.removeItem("modelopt_last_result")
    router.push("/app")
  }

  const exportAsPdf = async () => {
    if (isExportingPdf) {
      return
    }

    setIsExportingPdf(true)
    const previousTitle = document.title
    document.body.classList.add("pdf-exporting")
    document.title = `ModelOpt Results - ${generatedAt || new Date().toLocaleString()}`

    await new Promise<void>((resolve) => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => resolve())
      })
    })

    window.print()

    window.setTimeout(() => {
      document.body.classList.remove("pdf-exporting")
      document.title = previousTitle
      setIsExportingPdf(false)
    }, 250)
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f6f8fc] px-3 py-8 text-slate-900 print:bg-white print:px-0 print:py-0 print:text-slate-900 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-7xl space-y-7 print:max-w-none print:space-y-4 print:p-8">
        <section className="hidden border-b border-slate-200 pb-4 print:block">
          <h1 className="text-2xl font-bold text-slate-900">ModelOpt Result Report</h1>
          <p className="mt-1 text-sm text-slate-600">Generated on {generatedAt || new Date().toLocaleString()}</p>
        </section>
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/app" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 print:hidden">
              <ArrowLeft className="mr-1 size-4" />
              Optimize Again
            </Link>
            <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">Your Optimized AI Stack</h1>
            <p className="mt-2 text-sm text-slate-600">
              Generated on {generatedAt || new Date().toLocaleString()}
            </p>
          </div>
        </header>

        <SystemAnalysisCard
          systemAnalysis={result.summary}
          gpuName={gpuName}
          vramGb={result.input.vram_gb}
          ramGb={result.input.ram_gb}
          score={systemScore}
        />

        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Model Recommendations</h2>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid gap-4 print:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cards.map((card, index) => {
              const active = selectedCompare.includes(card.name)

              return (
                <div key={card.name} className="min-w-0 space-y-2">
                  <ModelRecommendationCard data={card} index={index} />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => toggleCompare(card.name)}
                    disabled={!active && selectedCompare.length >= 4}
                    className="w-full border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    <Scale className="mr-2 size-4" />
                    {active ? "Remove from compare" : "Add to compare"}
                  </Button>
                </div>
              )
            })}
          </motion.div>
        </section>

        {selectedModels.length > 0 ? (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_34px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">Comparison Workspace</h2>
              <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                <Button variant="outline" onClick={() => setSelectedCompare([])} className="flex-1 sm:flex-none">
                  Clear Selection
                </Button>
                <Link href={`/compare?models=${encodeURIComponent(selectedCompare.join(","))}`} className="flex-1 sm:flex-none">
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-500 sm:w-auto">Open Compare Page</Button>
                </Link>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-600">Selected {selectedModels.length}/4 models. Your selection is encoded in the URL for sharing.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {selectedModels.map((model) => (
                <article key={model.name} className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-base font-semibold text-slate-900 break-words">{model.display_name}</h3>
                  <p className="mt-2 text-sm text-slate-700">{model.size} · {model.vram_min_gb}GB VRAM min</p>
                  <p className="mt-1 text-sm text-slate-600">Context {model.context_window.toLocaleString()} · ~{Math.round(model.est_speed_tps)} tok/s</p>
                  <p className="mt-2 break-words text-xs text-slate-500">{model.use_cases.join(", ")}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {upgradeSuggestion ? <UpgradeSuggestion suggestion={upgradeSuggestion} /> : null}

        <AlternativeModelsTable
          models={alternatives}
          selectedNames={selectedCompare}
          onToggleCompare={toggleCompare}
          maxSelections={4}
        />

        <section className="sticky bottom-2 rounded-2xl border border-slate-200 bg-white/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_14px_30px_rgba(15,23,42,0.12)] backdrop-blur-sm print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">Actions</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={startOver}>
                <RotateCcw className="mr-2 size-4" />
                Start Over
              </Button>
              <Button variant="outline" onClick={() => void share()}>
                <Share2 className="mr-2 size-4" />
                Share Results
              </Button>
              <Button
                variant="outline"
                onClick={() => void exportAsPdf()}
                disabled={isExportingPdf}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                <Printer className="mr-2 size-4" />
                {isExportingPdf ? "Preparing PDF..." : "Export as PDF"}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
