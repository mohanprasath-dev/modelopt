"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface RamSelectorProps {
  value: number
  onChange: (ram: number) => void
  error?: string
}

const RAM_OPTIONS = [8, 16, 32, 64, 128]

export function RamSelector({ value, onChange, error }: RamSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-200">System RAM</p>
      <RadioGroup
        value={String(value)}
        onValueChange={(next) => onChange(Number(next))}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        aria-label="Select system RAM"
      >
        {RAM_OPTIONS.map((ram) => {
          const checked = value === ram
          return (
            <label
              key={ram}
              className={cn(
                "group flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 transition-all hover:border-slate-500",
                checked && "border-blue-500/70 bg-blue-500/15 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
              )}
            >
              <RadioGroupItem value={String(ram)} className="border-slate-500" />
              <span className="font-medium text-slate-100">{ram}GB</span>
            </label>
          )
        })}
      </RadioGroup>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  )
}
