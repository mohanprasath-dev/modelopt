import modelsData from "@/lib/data/models.json"

interface ComparePageProps {
  searchParams?: {
    models?: string
  }
}

export default function ComparePage({ searchParams }: ComparePageProps) {
  const requested = (searchParams?.models ?? "")
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
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold">Compare Models</h1>
        <p className="text-slate-300">Side-by-side comparison foundation. Select multiple models and evaluate hardware fit.</p>
        {requested.length > 0 ? (
          <p className="text-sm text-blue-300">Loaded from shared URL: {requested.join(", ")}</p>
        ) : null}

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-slate-900/80 text-left text-slate-300">
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
                <tr key={model.name} className="border-t border-slate-800 text-slate-200">
                  <td className="px-3 py-2">{model.display_name}</td>
                  <td className="px-3 py-2">{model.size}</td>
                  <td className="px-3 py-2">{model.vram_min_gb}GB</td>
                  <td className="px-3 py-2">{model.context_window.toLocaleString()}</td>
                  <td className="px-3 py-2 text-slate-400">{model.use_cases.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
