"use client"

import { Switch } from "@/components/ui/switch"

interface DeploymentToggleProps {
  value: "local" | "cloud"
  onChange: (next: "local" | "cloud") => void
}

export function DeploymentToggle({ value, onChange }: DeploymentToggleProps) {
  const isCloud = value === "cloud"

  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-800">Deployment Preference</p>
          <p className="text-xs text-slate-500">
            Local = runs on your machine, Cloud = API-based models.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600">Local</span>
          <Switch
            checked={isCloud}
            onCheckedChange={(checked) => onChange(checked ? "cloud" : "local")}
            aria-label="Toggle deployment preference"
          />
          <span className="text-sm text-slate-600">Cloud</span>
        </div>
      </div>
    </div>
  )
}
