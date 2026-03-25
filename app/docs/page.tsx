import type { Metadata } from "next"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Docs",
  description: "ModelOpt documentation and guides.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "ModelOpt Documentation",
    description: "Guides for setup, model comparison, and troubleshooting.",
    url: "/docs",
    type: "website",
  },
}

export default function DocsPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header>
          <h1 className="text-3xl font-bold sm:text-4xl">Documentation</h1>
          <p className="mt-3 text-slate-300">Guides for getting started, model comparisons, and troubleshooting.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Link href="/docs/getting-started">
            <Card className="h-full border-slate-800 bg-slate-900/60 hover:border-blue-500/40">
              <CardHeader><CardTitle>Getting Started</CardTitle></CardHeader>
              <CardContent className="text-slate-300">Set up your environment and run your first optimization.</CardContent>
            </Card>
          </Link>
          <Link href="/docs/model-comparison">
            <Card className="h-full border-slate-800 bg-slate-900/60 hover:border-blue-500/40">
              <CardHeader><CardTitle>Model Comparison</CardTitle></CardHeader>
              <CardContent className="text-slate-300">Sortable comparison chart for all supported AI models.</CardContent>
            </Card>
          </Link>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold">Related Reading</h2>
          <div className="mt-3 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            <Link href="/blog/how-to-choose-right-model" className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 hover:border-blue-500/40">
              How to Choose the Right AI Model for Your GPU
            </Link>
            <Link href="/blog/vram-vs-ram" className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 hover:border-blue-500/40">
              VRAM vs RAM: What Actually Matters
            </Link>
            <Link href="/compare" className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 hover:border-blue-500/40">
              Open Compare Workspace
            </Link>
            <Link href="/app" className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 hover:border-blue-500/40">
              Launch Optimizer Dashboard
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
