import type { Metadata } from "next"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Docs",
  description: "ModelOpt documentation and guides.",
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
      </div>
    </main>
  )
}
