import type { Metadata } from "next"
import modelsData from "@/lib/data/models.json"

export const metadata: Metadata = {
  title: "AI Model Comparison Tool",
  description:
    "Compare AI models side by side by VRAM, context window, size, and use-case fit to choose the best model for your hardware.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "ModelOpt AI Model Comparison Tool",
    description: "Side-by-side model comparison for faster AI stack decisions.",
    url: "/compare",
    type: "website",
  },
}

interface ComparePageProps {
  searchParams?: {
    models?: string | string[]
  }
}

export default function ComparePage({ searchParams }: ComparePageProps) {
  const modelsParam = Array.isArray(searchParams?.models)
    ? searchParams?.models.join(",")
    : searchParams?.models ?? ""

  const requested = modelsParam
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)

  const allModels = modelsData.models
  const selected = requested.length
    ? allModels.filter((model) => requested.includes(model.name))
    : []
  const fallback = allModels.slice(0, Math.max(0, 8 - selected.length))
  const models = [...selected, ...fallback.filter((item) => !selected.some((s) => s.name === item.name))].slice(0, 8)

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100/70 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold">Compare Models</h1>
        <p className="text-slate-600">Side-by-side comparison foundation. Select multiple models and evaluate hardware fit.</p>
        {requested.length > 0 ? (
          <p className="text-sm text-blue-700">Loaded from shared URL: {requested.join(", ")}</p>
        ) : null}

        <div className="space-y-3 md:hidden">
          {models.map((model) => (
            <article key={model.name} className="rounded-xl border border-slate-200 bg-white/95 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <h2 className="text-base font-semibold text-slate-900">{model.display_name}</h2>
              <p className="mt-1 text-sm text-slate-600">
                {model.size} · {model.vram_min_gb}GB VRAM · {model.context_window.toLocaleString()} ctx
              </p>
              <p className="mt-2 text-xs text-slate-500">{model.use_cases.join(", ")}</p>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white/95 shadow-[0_12px_34px_rgba(15,23,42,0.06)] md:block">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-slate-100 text-left text-slate-700">
              <tr>
                <th className="px-3 py-2">Model</th>
                <th className="px-3 py-2">Size</th>
                <th className="px-3 py-2">Min VRAM</th>
                <th className="px-3 py-2">Context</th>
                <th className="px-3 py-2">Use Cases</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.name} className="border-t border-slate-200 text-slate-700">
                  <td className="px-3 py-2">{model.display_name}</td>
                  <td className="px-3 py-2">{model.size}</td>
                  <td className="px-3 py-2">{model.vram_min_gb}GB</td>
                  <td className="px-3 py-2">{model.context_window.toLocaleString()}</td>
                  <td className="px-3 py-2 text-slate-500">{model.use_cases.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
