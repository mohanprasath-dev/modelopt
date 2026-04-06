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
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100/70 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header>
          <h1 className="text-3xl font-bold sm:text-4xl">Documentation</h1>
          <p className="mt-3 text-slate-600">Guides for getting started, model comparisons, and troubleshooting.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Link href="/docs/getting-started">
            <Card className="h-full border-slate-200 bg-white/95 shadow-[0_12px_32px_rgba(15,23,42,0.06)] hover:border-blue-300">
              <CardHeader><CardTitle>Getting Started</CardTitle></CardHeader>
              <CardContent className="text-slate-600">Set up your environment and run your first optimization.</CardContent>
            </Card>
          </Link>
          <Link href="/docs/model-comparison">
            <Card className="h-full border-slate-200 bg-white/95 shadow-[0_12px_32px_rgba(15,23,42,0.06)] hover:border-blue-300">
              <CardHeader><CardTitle>Model Comparison</CardTitle></CardHeader>
              <CardContent className="text-slate-600">Sortable comparison chart for all supported AI models.</CardContent>
            </Card>
          </Link>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold">Related Reading</h2>
          <div className="mt-3 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <Link href="/blog/how-to-choose-right-model" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 hover:border-blue-300 hover:text-slate-900">
              How to Choose the Right AI Model for Your GPU
            </Link>
            <Link href="/blog/vram-vs-ram" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 hover:border-blue-300 hover:text-slate-900">
              VRAM vs RAM: What Actually Matters
            </Link>
            <Link href="/compare" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 hover:border-blue-300 hover:text-slate-900">
              Open Compare Workspace
            </Link>
            <Link href="/app" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 hover:border-blue-300 hover:text-slate-900">
              Launch Optimizer Dashboard
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
