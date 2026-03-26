"use client"

import { motion } from "framer-motion"
import { Cpu, Brain, Package, Zap } from "lucide-react"

import { SpotlightCard } from "@/components/ui/spotlight-card"

const features = [
  {
    icon: Cpu,
    title: "Hardware Analysis",
    description:
      "Matches models to your exact GPU, VRAM, and RAM configuration. No more guessing if a model will fit — we calculate it precisely.",
  },
  {
    icon: Brain,
    title: "Gemini Reasoning",
    description:
      "Gemini AI explains WHY each model fits your profile. Transparent, human-readable reasoning for every recommendation.",
  },
  {
    icon: Zap,
    title: "Speed vs Quality",
    description:
      "Tune outputs for latency-sensitive or quality-first workflows with a single slider. Five calibrated preset points.",
  },
  {
    icon: Package,
    title: "Ready to Install",
    description:
      "Get Ollama, llama.cpp, and HuggingFace install commands ready to copy. One click and you're running your model.",
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Features() {
  return (
    <section id="demo" className="px-4 py-20 sm:px-6 lg:py-28" aria-labelledby="features-title">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/8 px-3 py-1 text-xs font-medium text-blue-400">
            Why ModelOpt
          </span>
          <h2
            id="features-title"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl"
          >
            Everything you need to run{" "}
            <span className="gradient-text">local AI confidently</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Stop guessing which model fits your hardware. ModelOpt does the math so you can get
            running in minutes.
          </p>
        </motion.div>

        {/* Feature cards with SpotlightCard */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={cardVariants}>
                <SpotlightCard className="h-full p-6">
                  <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/10 text-blue-400">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-semibold text-slate-100">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{feature.description}</p>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
