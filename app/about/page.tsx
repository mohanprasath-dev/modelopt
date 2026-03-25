import type { Metadata } from "next"
import Link from "next/link"
import { Globe } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About",
  description: "Mission, architecture, and creator profile for ModelOpt.",
}

export default function AboutPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <p className="text-sm text-blue-300">About ModelOpt</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">AI model recommendations with transparent logic</h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            ModelOpt helps developers and teams pick the right model for local and cloud inference. We combine
            deterministic hardware filtering with Gemini-assisted recommendation reasoning.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader>
              <CardTitle>Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Remove guesswork from AI model selection and make local AI accessible for every hardware tier.
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader>
              <CardTitle>How ModelOpt Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-slate-300">
              <p>1. Validate GPU, RAM, VRAM, use-case, and preference inputs.</p>
              <p>2. Filter models based on compatibility rules.</p>
              <p>3. Rank candidates with speed/quality bias.</p>
              <p>4. Generate final recommendation narrative with Gemini.</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader><CardTitle>Data Transparency</CardTitle></CardHeader>
            <CardContent className="text-slate-300">
              Model metadata includes cited sources, context windows, quantization support, and conservative throughput estimates.
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader><CardTitle>Update Cadence</CardTitle></CardHeader>
            <CardContent className="text-slate-300">
              Data is refreshed continuously as new open models, benchmarks, and hardware profiles are released.
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader><CardTitle>Tech Stack</CardTitle></CardHeader>
            <CardContent className="text-slate-300">
              Next.js 14, TypeScript, Tailwind, ShadCN UI, Zod, React Hook Form, and Vercel serverless APIs.
            </CardContent>
          </Card>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Created by Mohan Prasath</h2>
          <p className="mt-3 text-slate-300">
            Hi, I am Mohan Prasath, a full-stack AI engineer focused on practical developer tools and production-grade AI systems.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link href="https://linkedin.com/in/mohanprasath21" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-700 bg-slate-950/70 p-4 hover:border-blue-500/50">
              <p className="inline-flex items-center gap-2 text-slate-100">LinkedIn</p>
              <p className="mt-2 text-sm text-slate-400">Professional updates and community posts.</p>
            </Link>
            <Link href="https://github.com/mohanprasath-dev" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-700 bg-slate-950/70 p-4 hover:border-blue-500/50">
              <p className="inline-flex items-center gap-2 text-slate-100">GitHub</p>
              <p className="mt-2 text-sm text-slate-400">Open-source projects, experiments, and releases.</p>
            </Link>
            <Link href="https://mohanprasath.dev" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-700 bg-slate-950/70 p-4 hover:border-blue-500/50">
              <p className="inline-flex items-center gap-2 text-slate-100"><Globe className="size-4" /> Website</p>
              <p className="mt-2 text-sm text-slate-400">Portfolio, writing, and technical work.</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
