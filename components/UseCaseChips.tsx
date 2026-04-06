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
      <p className="text-sm font-medium text-slate-700">Use Cases</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Select one or more use cases">
        {USE_CASES.map((useCase) => {
          const active = value.includes(useCase)

          return (
            <button
              key={useCase}
              type="button"
              onClick={() => toggle(useCase)}
              className={cn(
                "min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm capitalize text-slate-700 transition-all hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:w-auto sm:min-w-[140px]",
                active && "border-blue-300 bg-blue-50 text-blue-700 shadow-[0_10px_24px_rgba(59,130,246,0.2)]"
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
