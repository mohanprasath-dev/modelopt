"use client"

import { cn } from "@/lib/utils"

interface UseCaseChipsProps {
  value: string[]
  onChange: (next: string[]) => void
  error?: string
}

const USE_CASES = [
  "chat",
  "coding",
  "creative writing",
  "data analysis",
  "research",
  "translation",
  "summarization",
] as const

export function UseCaseChips({ value, onChange, error }: UseCaseChipsProps) {
  const toggle = (useCase: string) => {
    if (value.includes(useCase)) {
      onChange(value.filter((item) => item !== useCase))
      return
    }

    onChange([...value, useCase])
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-200">Use Cases</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Select one or more use cases">
        {USE_CASES.map((useCase) => {
          const active = value.includes(useCase)

          return (
            <button
              key={useCase}
              type="button"
              onClick={() => toggle(useCase)}
              className={cn(
                "min-h-11 min-w-[140px] rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm capitalize text-slate-200 transition-all hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                active && "border-blue-500/70 bg-blue-500/15 text-blue-200 shadow-[0_0_22px_rgba(59,130,246,0.3)]"
              )}
              aria-pressed={active}
            >
              {useCase}
            </button>
          )
        })}
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  )
}
