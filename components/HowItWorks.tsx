"use client"

import { motion } from "framer-motion"

const steps = [
  {
    title: "Enter your hardware specs",
    description: "Tell ModelOpt your GPU model, available VRAM, and system RAM.",
  },
  {
    title: "AI analyzes and ranks models",
    description: "Gemini-powered ranking balances compatibility, speed, and quality.",
  },
  {
    title: "Copy install commands",
    description: "Get ready-to-run Ollama commands and practical alternatives instantly.",
  },
]

export function HowItWorks() {
  return (
    <section className="px-8 py-24" aria-labelledby="how-it-works-title">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="how-it-works-title" className="text-3xl font-bold text-slate-100 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
            A three-step flow to pick models that actually run well on your hardware.
          </p>
        </motion.div>

        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute left-[21px] top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-blue-500/90 via-blue-400/50 to-transparent"
            aria-hidden="true"
          />

          <ol className="space-y-8">
            {steps.map((step, index) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="relative pl-16"
              >
                <span className="absolute left-0 top-1 inline-flex size-11 items-center justify-center rounded-full border border-blue-500/35 bg-blue-500/15 text-sm font-bold text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  {index + 1}
                </span>
                <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-slate-100">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-400">{step.description}</p>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
