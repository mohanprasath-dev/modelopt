"use client"

import { Slider } from "@/components/ui/slider"

interface SpeedQualitySliderProps {
  value: number
  onChange: (next: number) => void
  error?: string
}

function preferenceLabel(value: number): string {
  if (value <= 2) return "Speed Focus"
  if (value >= 4) return "Quality Focus"
  return "Balanced"
}

export function SpeedQualitySlider({ value, onChange, error }: SpeedQualitySliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-200">Speed vs Quality</p>
        <span className="text-sm text-blue-300">{preferenceLabel(value)}</span>
      </div>
      <Slider
        value={[value]}
        min={1}
        max={5}
        step={1}
        onValueChange={(nextValue) => {
          if (Array.isArray(nextValue)) {
            onChange(nextValue[0] ?? 3)
            return
          }

          onChange(Number(nextValue))
        }}
        aria-label="Speed versus quality preference"
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>1 = Max Speed</span>
        <span>3 = Balanced</span>
        <span>5 = Max Quality</span>
      </div>
      <p className="text-xs text-slate-500">
        Lower = faster inference, higher = better outputs.
      </p>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  )
}
