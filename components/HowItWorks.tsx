"use client"

import { motion } from "framer-motion"
import { ClipboardList, Sparkles, Terminal } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Enter Your Hardware",
    description:
      "Select your GPU, system RAM, use cases (coding, chat, research), and speed preference. Takes under 60 seconds.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/25",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Gemini AI Analyzes & Ranks",
    description:
      "Our pipeline filters compatible models by hardware constraints, then Gemini ranks and explains the top candidates.",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/25",
  },
  {
    number: "03",
    icon: Terminal,
    title: "Get Install Commands",
    description:
      "Copy-ready commands for Ollama, llama.cpp, and HuggingFace. Share your results or export to PDF.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/25",
  },
]

export function HowItWorks() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28" aria-labelledby="how-it-works-title">
      <div className="mx-auto w-full max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-400">
            How It Works
          </span>
          <h2
            id="how-it-works-title"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl"
          >
            From specs to running model{" "}
            <span className="gradient-text">in three steps</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-7 top-16 hidden h-[calc(100%-8rem)] w-px bg-gradient-to-b from-blue-500/40 via-violet-500/30 to-emerald-500/30 sm:block" />

          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-5 sm:gap-7"
                >
                  {/* Step icon circle */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl border ${step.borderColor} ${step.bgColor} shadow-lg`}
                    >
                      <Icon className={`size-6 ${step.color}`} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="min-w-0 flex-1 rounded-2xl border border-slate-800/70 bg-slate-900/50 p-5 backdrop-blur-sm">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-slate-600">
                        {step.number}
                      </span>
                      <h3 className="font-semibold text-slate-100">{step.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
