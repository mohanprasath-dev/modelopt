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
  const match = size.match(/([\d.]+)/)
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
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-7xl space-y-5">
        <h1 className="text-3xl font-bold">Model Comparison Chart</h1>
        <p className="text-slate-300">Sort by model size, VRAM minimum, or context window.</p>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-slate-900/80 text-left text-slate-300">
              <tr>
                <th className="px-3 py-3"><button onClick={() => setSort("name")}>Name</button></th>
                <th className="px-3 py-3"><button onClick={() => setSort("size")}>Size</button></th>
                <th className="px-3 py-3"><button onClick={() => setSort("vram")}>Min VRAM</button></th>
                <th className="px-3 py-3"><button onClick={() => setSort("context")}>Context Window</button></th>
                <th className="px-3 py-3">Use Cases</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.name} className="border-t border-slate-800 text-slate-200">
                  <td className="px-3 py-3">{row.display_name}</td>
                  <td className="px-3 py-3">{row.size}</td>
                  <td className="px-3 py-3">{row.vram_min_gb}GB</td>
                  <td className="px-3 py-3">{row.context_window.toLocaleString()}</td>
                  <td className="px-3 py-3 text-slate-400">{row.use_cases.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
