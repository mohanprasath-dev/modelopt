"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-8 py-24 sm:py-28"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.18),transparent_38%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.14),transparent_35%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div {...fadeUp}>
          <p className="mb-4 inline-flex rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium tracking-wide text-slate-300">
            ModelOpt for Local AI Builders
          </p>
          <h1
            id="hero-title"
            className="max-w-2xl text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl"
          >
            Find Your Perfect AI Model
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            Hardware-optimized model recommendations in seconds.
          </p>

          <motion.div
            className="mt-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 330, damping: 22 }}
          >
            <Link
              href="/app"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-xl border border-blue-400/30 bg-blue-500 px-5 text-base font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.35)] transition-shadow hover:shadow-[0_0_48px_rgba(59,130,246,0.5)] focus-visible:ring-blue-300"
              )}
              aria-label="Optimize my setup by opening the app"
            >
              Optimize My Setup
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.12 }}
          className="relative"
        >
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-500/40 via-blue-400/5 to-slate-800/0 blur-sm" />
          <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <h2 className="text-lg font-semibold text-slate-100">Quick Preview</h2>
            <p className="mt-2 text-sm text-slate-400">
              Instant recommendation profile based on your setup.
            </p>

            <div className="mt-6 space-y-6">
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
                    <SelectItem value="rtx_4090">RTX 4090</SelectItem>
                    <SelectItem value="rtx_4070">RTX 4070</SelectItem>
                    <SelectItem value="rtx_3060">RTX 3060</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-300">RAM</p>
                <div
                  className="grid grid-cols-3 gap-2"
                  role="group"
                  aria-label="RAM selector preview"
                >
                  <button
                    type="button"
                    className="rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-300"
                    aria-pressed="false"
                  >
                    8GB
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-blue-500/40 bg-blue-500/15 px-3 py-2 text-sm font-semibold text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                    aria-pressed="true"
                  >
                    16GB
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-300"
                    aria-pressed="false"
                  >
                    32GB
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-300">Use Case</p>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Use case chips">
                  <Badge
                    variant="outline"
                    className="rounded-full border-blue-500/35 bg-blue-500/10 px-3 py-1 text-blue-300"
                    role="listitem"
                  >
                    Coding
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full border-slate-700 bg-slate-800/70 px-3 py-1 text-slate-300"
                    role="listitem"
                  >
                    Chat
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
