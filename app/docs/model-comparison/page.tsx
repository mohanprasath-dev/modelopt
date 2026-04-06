"use client"

import * as React from "react"
import modelsData from "@/lib/data/models.json"

type SortKey = "name" | "size" | "vram" | "context"

interface ModelRow {
  name: string
  display_name: string
  size: string
  vram_min_gb: number
  context_window: number
  use_cases: string[]
}

const rows = modelsData.models as ModelRow[]

function parseSize(size: string): number {
  const match = size.match(/([\d.]+)\s*b/i)
  return match ? Number(match[1]) : 0
}

export default function ModelComparisonPage() {
  const [sortKey, setSortKey] = React.useState<SortKey>("vram")
  const [desc, setDesc] = React.useState(false)

  const sorted = React.useMemo(() => {
    const next = [...rows]
    next.sort((a, b) => {
      const direction = desc ? -1 : 1
      if (sortKey === "name") return a.display_name.localeCompare(b.display_name) * direction
      if (sortKey === "size") return (parseSize(a.size) - parseSize(b.size)) * direction
      if (sortKey === "context") return (a.context_window - b.context_window) * direction
      return (a.vram_min_gb - b.vram_min_gb) * direction
    })
    return next
  }, [sortKey, desc])

  const setSort = (key: SortKey) => {
    if (sortKey === key) {
      setDesc((prev) => !prev)
      return
    }

    setSortKey(key)
    setDesc(false)
  }

  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100/70 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto w-full max-w-7xl space-y-5">
        <h1 className="text-3xl font-bold">Model Comparison Chart</h1>
        <p className="text-slate-600">Sort by model size, VRAM minimum, or context window.</p>

        <div className="space-y-3 md:hidden">
          {sorted.map((row) => (
            <article key={row.name} className="rounded-xl border border-slate-200 bg-white/95 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <h2 className="text-base font-semibold text-slate-900">{row.display_name}</h2>
              <p className="mt-1 text-sm text-slate-600">
                {row.size} · {row.vram_min_gb}GB VRAM · {row.context_window.toLocaleString()} ctx
              </p>
              <p className="mt-2 text-xs text-slate-500">{row.use_cases.join(", ")}</p>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white/95 shadow-[0_12px_34px_rgba(15,23,42,0.06)] md:block">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-slate-100 text-left text-slate-700">
              <tr>
                <th className="px-3 py-3"><button type="button" className="transition-colors hover:text-slate-900" onClick={() => setSort("name")}>Name</button></th>
                <th className="px-3 py-3"><button type="button" className="transition-colors hover:text-slate-900" onClick={() => setSort("size")}>Size</button></th>
                <th className="px-3 py-3"><button type="button" className="transition-colors hover:text-slate-900" onClick={() => setSort("vram")}>Min VRAM</button></th>
                <th className="px-3 py-3"><button type="button" className="transition-colors hover:text-slate-900" onClick={() => setSort("context")}>Context Window</button></th>
                <th className="px-3 py-3">Use Cases</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.name} className="border-t border-slate-200 text-slate-700">
                  <td className="px-3 py-3">{row.display_name}</td>
                  <td className="px-3 py-3">{row.size}</td>
                  <td className="px-3 py-3">{row.vram_min_gb}GB</td>
                  <td className="px-3 py-3">{row.context_window.toLocaleString()}</td>
                  <td className="px-3 py-3 text-slate-500">{row.use_cases.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
