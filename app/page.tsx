import Link from "next/link"
import { ArrowRight, Brain, Cpu, Gauge, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.2),transparent_40%),linear-gradient(to_bottom,#020617,#0f172a)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
              AI Model Optimization Engine
            </p>
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find Your Perfect AI Model in Seconds
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
              Get hardware-aware, Gemini-assisted recommendations with install commands for Ollama, llama.cpp, and HuggingFace.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/app">
                <Button size="lg" className="h-12 w-full bg-blue-500 px-6 text-white hover:bg-blue-400 sm:w-auto">
                  Get Started Free <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <a href="#demo">
                <Button size="lg" variant="outline" className="h-12 w-full sm:w-auto">
                  View Demo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:grid-cols-3 sm:p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-300">10,000+</p>
            <p className="text-sm text-slate-400">Optimizations Run</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-300">20+</p>
            <p className="text-sm text-slate-400">AI Models Tracked</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-300">100% Free</p>
            <p className="text-sm text-slate-400">Current Access Tier</p>
          </div>
        </div>
      </section>

      <section id="demo" className="px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-2xl font-bold sm:text-4xl">Why ModelOpt</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-slate-800 bg-slate-900/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Cpu className="size-4 text-blue-300" /> Hardware Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400">Matches models to your GPU, RAM, and VRAM constraints.</CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Brain className="size-4 text-blue-300" /> Gemini Reasoning</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400">AI explanations for why each recommendation fits your profile.</CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Gauge className="size-4 text-blue-300" /> Speed vs Quality</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400">Tune outputs for latency-sensitive or quality-first workflows.</CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><ShieldCheck className="size-4 text-blue-300" /> Production Ready</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400">Shareable results, export options, and resilient API fallback behavior.</CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="text-2xl font-bold sm:text-4xl">How It Works</h2>
          <ol className="mt-8 space-y-4">
            <li className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"><strong>1.</strong> Enter your hardware specs and use cases.</li>
            <li className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"><strong>2.</strong> ModelOpt filters compatible models and ranks candidates.</li>
            <li className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"><strong>3.</strong> Receive actionable recommendations with install commands.</li>
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-2xl font-bold sm:text-4xl">Testimonials & Use Cases</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="border-slate-800 bg-slate-900/60">
              <CardContent className="p-6 text-sm text-slate-300">&ldquo;Helped me pick a coding model that actually runs on my 12GB GPU.&rdquo;</CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/60">
              <CardContent className="p-6 text-sm text-slate-300">&ldquo;The speed-vs-quality control is exactly what our research team needed.&rdquo;</CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/60">
              <CardContent className="p-6 text-sm text-slate-300">&ldquo;Install tabs save time. No more searching model IDs manually.&rdquo;</CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-2xl font-bold sm:text-4xl">FAQ</h2>
          <div className="mt-6 space-y-3">
            <details className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <summary className="cursor-pointer font-medium">Is ModelOpt free?</summary>
              <p className="mt-2 text-sm text-slate-400">Yes. The core optimizer is currently free for all users.</p>
            </details>
            <details className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <summary className="cursor-pointer font-medium">How often is model data updated?</summary>
              <p className="mt-2 text-sm text-slate-400">Model and hardware datasets are updated on an ongoing basis as new benchmarks and releases arrive.</p>
            </details>
            <details className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <summary className="cursor-pointer font-medium">Can I export results?</summary>
              <p className="mt-2 text-sm text-slate-400">Yes. You can share links, print to PDF, and use installation command copy helpers.</p>
            </details>
          </div>
        </div>
      </section>
    </main>
  )
}
