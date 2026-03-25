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
    return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
  }

  if (score === "yellow") {
    return "border-amber-500/40 bg-amber-500/10 text-amber-300"
  }

  return "border-red-500/40 bg-red-500/10 text-red-300"
}

export function SystemAnalysisCard({
  systemAnalysis,
  gpuName,
  vramGb,
  ramGb,
  score,
}: SystemAnalysisCardProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-100">System Analysis</h2>
        <Badge className={scoreStyles(score)}>{scoreLabel(score)}</Badge>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-300">{systemAnalysis}</p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <dt className="text-xs uppercase tracking-wide text-slate-500">GPU</dt>
          <dd className="mt-1 text-sm font-medium text-slate-100">{gpuName}</dd>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <dt className="text-xs uppercase tracking-wide text-slate-500">VRAM</dt>
          <dd className="mt-1 text-sm font-medium text-slate-100">{vramGb}GB</dd>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <dt className="text-xs uppercase tracking-wide text-slate-500">RAM</dt>
          <dd className="mt-1 text-sm font-medium text-slate-100">{ramGb}GB</dd>
        </div>
      </dl>
    </section>
  )
}
