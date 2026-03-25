"use client"

import { Switch } from "@/components/ui/switch"

interface DeploymentToggleProps {
  value: "local" | "cloud"
  onChange: (next: "local" | "cloud") => void
}

export function DeploymentToggle({ value, onChange }: DeploymentToggleProps) {
  const isCloud = value === "cloud"

  return (
    <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-200">Deployment Preference</p>
          <p className="text-xs text-slate-500">
            Local = runs on your machine, Cloud = API-based models.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">Local</span>
          <Switch
            checked={isCloud}
            onCheckedChange={(checked) => onChange(checked ? "cloud" : "local")}
            aria-label="Toggle deployment preference"
          />
          <span className="text-sm text-slate-400">Cloud</span>
        </div>
      </div>
    </div>
  )
}
