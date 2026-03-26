"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Cpu, HardDrive, Zap } from "lucide-react"

import { Particles } from "@/components/ui/particles"
import { SplitText } from "@/components/ui/split-text"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-slate-950 px-6 py-24 sm:px-8 sm:py-32"
      aria-labelledby="hero-title"
    >
      {/* Particles background */}
      <div className="pointer-events-auto absolute inset-0">
        <Particles quantity={90} color="59, 130, 246" maxConnectDistance={130} speed={0.35} />
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.15),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />

      {/* Grid pattern */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: Text */}
        <motion.div {...fadeUp}>
          {/* Eyebrow badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-300">
            <span className="inline-flex size-1.5 rounded-full bg-blue-400 animate-pulse" />
            ModelOpt for Local AI Builders
          </div>

          {/* Heading with SplitText animation */}
          <h1
            id="hero-title"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <SplitText
              text="Find Your Perfect"
              className="block text-slate-100"
              stagger={0.05}
              duration={0.5}
            />
            <SplitText
              text="AI Model"
              className="mt-1 block gradient-text"
              delay={0.3}
              stagger={0.08}
              duration={0.6}
            />
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Hardware-optimized model recommendations powered by Gemini AI. Free, fast, and
            accurate — with install commands ready to copy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <Link
              href="/app"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group relative h-12 overflow-hidden rounded-xl border border-blue-400/40 bg-blue-500 px-6 text-base font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.4)] transition-all hover:bg-blue-400 hover:shadow-[0_0_50px_rgba(59,130,246,0.55)] focus-visible:ring-blue-300"
              )}
              aria-label="Open the optimizer to get started"
            >
              Get Started Free
              <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <a
              href="#demo"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-12 rounded-xl border-slate-700 px-6 text-base text-slate-200 hover:border-slate-600 hover:bg-slate-800/60"
              )}
            >
              View Demo
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <span className="flex items-center gap-1.5">
              <Cpu className="size-3.5 text-blue-400" />
              <span>50+ GPUs tracked</span>
            </span>
            <span className="flex items-center gap-1.5">
              <HardDrive className="size-3.5 text-blue-400" />
              <span>20+ AI models</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="size-3.5 text-blue-400" />
              <span>100% free</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Right: Preview card */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="relative"
          id="demo"
        >
          {/* Glow ring behind card */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-500/40 via-blue-400/10 to-transparent blur-sm" />

          <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            {/* Card header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-100">Quick Preview</h2>
                <p className="mt-0.5 text-xs text-slate-500">Visual preview only — not live</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Demo
              </span>
            </div>

            <div className="space-y-5">
              {/* GPU */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">GPU</label>
                <Select defaultValue="rtx_4090">
                  <SelectTrigger
                    className="h-11 w-full rounded-xl border-slate-700 bg-slate-950/70 text-slate-100"
                    aria-label="GPU model preview"
                  >
                    <SelectValue placeholder="RTX 4090" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rtx_4090">NVIDIA RTX 4090 (24GB)</SelectItem>
                    <SelectItem value="rtx_4070">NVIDIA RTX 4070 (12GB)</SelectItem>
                    <SelectItem value="rtx_3060">NVIDIA RTX 3060 (12GB)</SelectItem>
                    <SelectItem value="apple_m2">Apple M2 Pro (16GB)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* RAM */}
              <div>
                <p className="mb-2 text-sm font-medium text-slate-300">System RAM</p>
                <div
                  className="grid grid-cols-4 gap-2"
                  role="group"
                  aria-label="RAM selector preview"
                >
                  {["8GB", "16GB", "32GB", "64GB"].map((ram) => (
                    <button
                      key={ram}
                      type="button"
                      className={cn(
                        "rounded-xl border px-2 py-2.5 text-xs font-medium transition-all",
                        ram === "16GB"
                          ? "border-blue-500/50 bg-blue-500/15 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                          : "border-slate-700/70 bg-slate-900/50 text-slate-400 hover:border-slate-600"
                      )}
                      aria-pressed={ram === "16GB"}
                      tabIndex={-1}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>

              {/* Use cases */}
              <div>
                <p className="mb-2 text-sm font-medium text-slate-300">Use Cases</p>
                <div className="flex flex-wrap gap-2" role="list">
                  {["Coding", "Chat", "Creative", "Research"].map((uc) => (
                    <Badge
                      key={uc}
                      variant="outline"
                      className={cn(
                        "rounded-full px-3 py-1 text-xs",
                        ["Coding", "Chat"].includes(uc)
                          ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                          : "border-slate-700 bg-slate-800/60 text-slate-400"
                      )}
                      role="listitem"
                    >
                      {uc}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recommendation preview */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                <p className="text-xs font-semibold text-emerald-400">Top Match</p>
                <p className="mt-1 text-sm font-semibold text-slate-100">Qwen2.5-Coder 7B</p>
                <p className="mt-0.5 text-xs text-slate-500">7B · 5GB VRAM · ~42 tok/s</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
