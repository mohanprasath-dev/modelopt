"use client"

import * as React from "react"
import { BookmarkPlus, Clock3, LayoutDashboard, Sparkles } from "lucide-react"
import { Toaster, toast } from "sonner"

import { Button } from "@/components/ui/button"
import { OptimizationForm, type OptimizationFormData, type OptimizationProgress } from "@/components/OptimizationForm"

interface SavedConfig {
  id: string
  name: string
  createdAt: string
  data: Partial<OptimizationFormData>
}

const SAVED_CONFIGS_KEY = "modelopt_saved_configs"
const DRAFT_KEY = "modelopt_optimizer_draft"

export default function AppDashboardPage() {
  const [savedConfigs, setSavedConfigs] = React.useState<SavedConfig[]>([])
  const [initialValues, setInitialValues] = React.useState<Partial<OptimizationFormData> | undefined>(undefined)
  const [latestDraft, setLatestDraft] = React.useState<Partial<OptimizationFormData> | null>(null)
  const [progress, setProgress] = React.useState<OptimizationProgress>({
    completed: 0,
    total: 6,
    percentage: 0,
  })

  React.useEffect(() => {
    const rawConfigs = localStorage.getItem(SAVED_CONFIGS_KEY)
    const parsedConfigs = rawConfigs ? (JSON.parse(rawConfigs) as SavedConfig[]) : []
    setSavedConfigs(parsedConfigs)

    const rawDraft = localStorage.getItem(DRAFT_KEY)
    const parsedDraft = rawDraft ? (JSON.parse(rawDraft) as Partial<OptimizationFormData>) : null
    setLatestDraft(parsedDraft)

    const preset = new URLSearchParams(window.location.search).get("preset")
    if (preset) {
      const match = parsedConfigs.find((item) => item.id === preset)
      if (match) {
        setInitialValues(match.data)
        return
      }
    }

    if (parsedDraft) {
      setInitialValues(parsedDraft)
    }
  }, [])

  const onDraftChange = React.useCallback((draft: Partial<OptimizationFormData>) => {
    setLatestDraft(draft)
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  }, [])

  const saveCurrentDraft = () => {
    if (!latestDraft) {
      toast.error("Complete at least one field before saving a configuration.")
      return
    }

    const name = window.prompt("Name this configuration", `Config ${savedConfigs.length + 1}`)
    if (!name) {
      return
    }

    const next: SavedConfig = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
      data: latestDraft,
    }

    const updated = [next, ...savedConfigs].slice(0, 8)
    localStorage.setItem(SAVED_CONFIGS_KEY, JSON.stringify(updated))
    setSavedConfigs(updated)
    toast.success("Configuration saved")
  }

  const loadConfig = (id: string) => {
    const config = savedConfigs.find((item) => item.id === id)
    if (!config) {
      return
    }

    setInitialValues(config.data)
    toast.success(`Loaded ${config.name}`)
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 sm:py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="inline-flex items-center gap-2 text-sm text-blue-300">
              <LayoutDashboard className="size-4" /> Optimization Progress
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{progress.percentage}% complete</h2>
            <div className="mt-3 h-2 rounded-full bg-slate-800">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all"
                style={{ width: `${progress.percentage}%` }}
                aria-hidden="true"
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              {progress.completed} of {progress.total} required fields ready.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="inline-flex items-center gap-2 text-sm text-blue-300">
              <BookmarkPlus className="size-4" /> Saved Configurations
            </p>
            <Button type="button" onClick={saveCurrentDraft} className="mt-3 w-full bg-blue-500 text-white hover:bg-blue-400">
              Save Current Draft
            </Button>
            <div className="mt-3 space-y-2">
              {savedConfigs.length === 0 ? (
                <p className="text-xs text-slate-500">No saved configs yet.</p>
              ) : (
                savedConfigs.map((config) => (
                  <button
                    key={config.id}
                    type="button"
                    onClick={() => loadConfig(config.id)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-left text-sm hover:border-blue-500/50"
                  >
                    <p className="font-medium text-slate-200">{config.name}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                      <Clock3 className="size-3" /> {new Date(config.createdAt).toLocaleDateString()}
                    </p>
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="inline-flex items-center gap-2 text-sm text-blue-300">
              <Sparkles className="size-4" /> Workflow
            </p>
            <ol className="mt-3 space-y-2 text-sm text-slate-300">
              <li>1. Fill hardware profile</li>
              <li>2. Set optimization goals</li>
              <li>3. Review ranked recommendations</li>
            </ol>
          </section>
        </aside>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <p className="text-sm font-medium text-blue-300">SaaS Optimizer</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Optimization Dashboard</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-400">
            Enter your hardware and preferences to get ranked model recommendations.
          </p>

          <div className="mt-8">
            <OptimizationForm
              initialValues={initialValues}
              onDraftChange={onDraftChange}
              onProgressChange={setProgress}
            />
          </div>
        </section>
      </div>

      <Toaster richColors theme="dark" position="top-right" />
    </main>
  )
}
