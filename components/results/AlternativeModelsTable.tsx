"use client"

import * as React from "react"
import { ChevronDown, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"

export interface AlternativeModel {
  name: string
  display_name: string
  size: string
  vram_min_gb: number
  use_cases: string[]
  est_speed_tps: number
}

type SortKey = "name" | "size" | "vram" | "use_cases" | "speed"

interface AlternativeModelsTableProps {
  models: AlternativeModel[]
}

function parseSize(size: string): number {
  const match = size.match(/([\d.]+)/)
  return match ? Number(match[1]) : 0
}

export function AlternativeModelsTable({ models }: AlternativeModelsTableProps) {
  const [open, setOpen] = React.useState(false)
  const [sortBy, setSortBy] = React.useState<SortKey>("speed")
  const [descending, setDescending] = React.useState(true)

  const sorted = React.useMemo(() => {
    const next = [...models]

    next.sort((a, b) => {
      let aValue: number | string = ""
      let bValue: number | string = ""

      if (sortBy === "name") {
        aValue = a.display_name
        bValue = b.display_name
      }
      if (sortBy === "size") {
        aValue = parseSize(a.size)
        bValue = parseSize(b.size)
      }
      if (sortBy === "vram") {
        aValue = a.vram_min_gb
        bValue = b.vram_min_gb
      }
      if (sortBy === "use_cases") {
        aValue = a.use_cases.length
        bValue = b.use_cases.length
      }
      if (sortBy === "speed") {
        aValue = a.est_speed_tps
        bValue = b.est_speed_tps
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return descending ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue)
      }

      return descending ? Number(bValue) - Number(aValue) : Number(aValue) - Number(bValue)
    })

    return next
  }, [models, sortBy, descending])

  const applySort = (key: SortKey) => {
    if (sortBy === key) {
      setDescending((prev) => !prev)
      return
    }

    setSortBy(key)
    setDescending(true)
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 text-left"
        aria-expanded={open}
        aria-controls="alternative-models-table"
      >
        <h2 className="text-xl font-semibold text-slate-100">Alternative Models</h2>
        <ChevronDown className={`size-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div id="alternative-models-table" className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-left text-slate-400">
                <th className="py-2">
                  <Button type="button" variant="ghost" className="h-7 px-1 text-slate-300" onClick={() => applySort("name")}>
                    Name <ChevronsUpDown className="ml-1 size-3" />
                  </Button>
                </th>
                <th className="py-2">
                  <Button type="button" variant="ghost" className="h-7 px-1 text-slate-300" onClick={() => applySort("size")}>
                    Size <ChevronsUpDown className="ml-1 size-3" />
                  </Button>
                </th>
                <th className="py-2">
                  <Button type="button" variant="ghost" className="h-7 px-1 text-slate-300" onClick={() => applySort("vram")}>
                    VRAM <ChevronsUpDown className="ml-1 size-3" />
                  </Button>
                </th>
                <th className="py-2">
                  <Button type="button" variant="ghost" className="h-7 px-1 text-slate-300" onClick={() => applySort("use_cases")}>
                    Use Cases <ChevronsUpDown className="ml-1 size-3" />
                  </Button>
                </th>
                <th className="py-2">
                  <Button type="button" variant="ghost" className="h-7 px-1 text-slate-300" onClick={() => applySort("speed")}>
                    Est. Speed <ChevronsUpDown className="ml-1 size-3" />
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((model) => (
                <tr key={model.name} className="border-b border-slate-800 text-slate-200">
                  <td className="py-2 pr-4">{model.display_name}</td>
                  <td className="py-2 pr-4">{model.size}</td>
                  <td className="py-2 pr-4">{model.vram_min_gb}GB</td>
                  <td className="py-2 pr-4 text-slate-300">{model.use_cases.join(", ")}</td>
                  <td className="py-2">{Math.round(model.est_speed_tps)} tok/s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}
