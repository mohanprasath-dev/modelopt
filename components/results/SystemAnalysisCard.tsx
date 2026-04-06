import { Badge } from "@/components/ui/badge"

interface SystemAnalysisCardProps {
  systemAnalysis: string
  gpuName: string
  vramGb: number
  ramGb: number
  score: "green" | "yellow" | "red"
}

function scoreLabel(score: "green" | "yellow" | "red") {
  if (score === "green") return "Excellent for AI workloads"
  if (score === "yellow") return "Good with limitations"
  return "Upgrade recommended"
}

function scoreStyles(score: "green" | "yellow" | "red") {
  if (score === "green") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700"
  }

  if (score === "yellow") {
    return "border-amber-200 bg-amber-50 text-amber-700"
  }

  return "border-red-200 bg-red-50 text-red-700"
}

export function SystemAnalysisCard({
  systemAnalysis,
  gpuName,
  vramGb,
  ramGb,
  score,
}: SystemAnalysisCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-900">System Analysis</h2>
        <Badge className={scoreStyles(score)}>{scoreLabel(score)}</Badge>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-700">{systemAnalysis}</p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <dt className="text-xs uppercase tracking-wide text-slate-500">GPU</dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">{gpuName}</dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <dt className="text-xs uppercase tracking-wide text-slate-500">VRAM</dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">{vramGb}GB</dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <dt className="text-xs uppercase tracking-wide text-slate-500">RAM</dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">{ramGb}GB</dd>
        </div>
      </dl>
    </section>
  )
}
