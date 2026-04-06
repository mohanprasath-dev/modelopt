"use client"

import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { InstallCommandsTabs } from "@/components/results/InstallCommandsTabs"

export interface RecommendationCardData {
  slot: "PRIMARY" | "SECONDARY" | "LIGHTWEIGHT"
  name: string
  display_name: string
  size: string
  reasoning: string
  tokens_per_sec_estimate: number
  context_window: number
  recommended_quantization: string
  ollama_install: string
  llama_cpp: string
  huggingface: string
  strengths: string
  weaknesses: string
}

interface ModelRecommendationCardProps {
  data: RecommendationCardData
  index: number
}

const badgeStyle: Record<RecommendationCardData["slot"], string> = {
  PRIMARY: "border-blue-200 bg-blue-50 text-blue-700",
  SECONDARY: "border-emerald-200 bg-emerald-50 text-emerald-700",
  LIGHTWEIGHT: "border-violet-200 bg-violet-50 text-violet-700",
}

export function ModelRecommendationCard({ data, index }: ModelRecommendationCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={{ y: -4 }}
      className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-md transition-shadow hover:shadow-[0_16px_36px_rgba(59,130,246,0.16)] sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <Badge className={badgeStyle[data.slot]}>{data.slot}</Badge>
        <p className="text-xs uppercase tracking-wide text-slate-500">{data.size}</p>
      </div>

      <h3 className="break-words text-xl font-semibold text-slate-900">{data.display_name}</h3>
      <p className="mt-2 break-words text-sm leading-relaxed text-slate-700">{data.reasoning}</p>

      <div className="mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
          <p className="text-slate-500">Tokens/sec</p>
          <p className="mt-1 text-slate-900">{Math.round(data.tokens_per_sec_estimate)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
          <p className="text-slate-500">Context</p>
          <p className="mt-1 text-slate-900">{data.context_window.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
          <p className="text-slate-500">Quantization</p>
          <p className="mt-1 break-all text-slate-900">{data.recommended_quantization}</p>
        </div>
      </div>

      <div className="mt-4 flex-1">
        <InstallCommandsTabs
          ollamaCommand={data.ollama_install}
          llamaCppCommand={data.llama_cpp}
          huggingFaceModelId={data.huggingface}
          cardLabel={data.display_name}
        />
      </div>

      <div className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-emerald-50/55 p-2">
          <p className="mb-1 font-medium text-emerald-700">Strengths</p>
          <p className="break-words text-slate-700">{data.strengths}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-amber-50/55 p-2">
          <p className="mb-1 font-medium text-amber-700">Weaknesses</p>
          <p className="break-words text-slate-700">{data.weaknesses}</p>
        </div>
      </div>
    </motion.article>
  )
}
