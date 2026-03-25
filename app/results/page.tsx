"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Share2, Printer, RotateCcw } from "lucide-react"

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

const modelLookup = new Map((modelsData.models as ModelSpec[]).map((item) => [item.name, item]))
const gpuLookup = new Map(gpusData.gpus.map((item) => [item.id, item]))

function averageSpeed(model: ModelSpec): number {
  const tps = model.tokens_per_sec_estimate
  return (tps.rtx_4090 + tps.rtx_4070 + tps.rtx_3060 + tps.apple_m2) / 4
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
        tokens_per_sec_estimate: averageSpeed(dbModel),
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

  return (modelsData.models as ModelSpec[])
    .filter((model) => !used.has(model.name))
    .filter((model) => result.input.deployment === "cloud" || model.vram_min_gb <= result.input.vram_gb)
    .filter((model) => model.use_cases.length > 0)
    .slice(0, 20)
    .map((model) => ({
      name: model.name,
      display_name: model.display_name,
      size: model.size,
      vram_min_gb: model.vram_min_gb,
      use_cases: model.use_cases,
      est_speed_tps: averageSpeed(model),
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

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-200">
        <p>Loading your optimized stack...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <section className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
          <h1 className="text-2xl font-bold">No results found</h1>
          <p className="mt-3 text-slate-400">{error}</p>
          <div className="mt-5 flex justify-center gap-3">
            <Button onClick={() => router.push("/app")} className="bg-blue-500 text-white hover:bg-blue-400">
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
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <section className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
          <h1 className="text-2xl font-bold">No results found</h1>
          <p className="mt-3 text-slate-400">Redirecting to optimizer...</p>
          <div className="mt-5">
            <Button onClick={() => router.push("/app")} className="bg-blue-500 text-white hover:bg-blue-400">
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

  const share = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }

  const startOver = () => {
    sessionStorage.removeItem("modelopt_last_result")
    router.push("/app")
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-7">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/app" className="inline-flex items-center text-sm text-slate-400 hover:text-slate-200">
              <ArrowLeft className="mr-1 size-4" />
              Optimize Again
            </Link>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Your Optimized AI Stack</h1>
            <p className="mt-2 text-sm text-slate-400">
              Generated on {new Date().toLocaleString()}
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
          <h2 className="mb-4 text-xl font-semibold text-slate-100">Model Recommendations</h2>
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
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {cards.map((card, index) => (
              <ModelRecommendationCard key={card.name} data={card} index={index} />
            ))}
          </motion.div>
        </section>

        {upgradeSuggestion ? <UpgradeSuggestion suggestion={upgradeSuggestion} /> : null}

        <AlternativeModelsTable models={alternatives} />

        <section className="sticky bottom-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400">Actions</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={startOver}>
                <RotateCcw className="mr-2 size-4" />
                Start Over
              </Button>
              <Button variant="outline" onClick={() => void share()}>
                <Share2 className="mr-2 size-4" />
                Share Results
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="mr-2 size-4" />
                Export as PDF
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
