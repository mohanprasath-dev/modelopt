"use client"

import { motion } from "framer-motion"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "⚡ Hardware Analysis",
    description: "Analyzes your GPU, RAM, and VRAM constraints",
  },
  {
    title: "🎯 Smart Recommendations",
    description: "AI-powered model selection using Gemini",
  },
  {
    title: "📦 Ready to Install",
    description: "Get Ollama commands instantly",
  },
]

export function Features() {
  return (
    <section
      className="px-8 py-24"
      aria-labelledby="features-title"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="features-title" className="text-3xl font-bold text-slate-100 sm:text-4xl">
            Why Teams Choose ModelOpt
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
            Built for fast decisions, better local model performance, and zero guesswork.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="h-full"
            >
              <Card className="h-full rounded-2xl border-slate-800 bg-slate-900/50 shadow-[0_0_0_1px_rgba(30,41,59,0.7)] backdrop-blur-lg transition-shadow hover:shadow-[0_0_30px_rgba(59,130,246,0.22)]">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-100">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
