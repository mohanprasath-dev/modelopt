import type { Metadata } from "next"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Blog",
  description: "ModelOpt technical articles and guides.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "ModelOpt Blog",
    description: "Technical guides on model selection, quantization, and hardware planning.",
    url: "/blog",
    type: "website",
  },
}

const posts = [
  { href: "/blog/how-to-choose-right-model", title: "How to Choose the Right AI Model for Your GPU" },
  { href: "/blog/vram-vs-ram", title: "VRAM vs RAM: What Actually Matters" },
  { href: "/blog/quantization-explained", title: "Quantization Explained: Q4 vs Q8 vs FP16" },
]

export default function BlogPage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100/70 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.href} href={post.href}>
              <Card className="h-full border-slate-200 bg-white/95 shadow-[0_12px_34px_rgba(15,23,42,0.06)] hover:border-blue-300">
                <CardHeader><CardTitle>{post.title}</CardTitle></CardHeader>
                <CardContent className="text-slate-600">Read article</CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold">Continue Learning</h2>
          <div className="mt-3 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <Link href="/docs/getting-started" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 hover:border-blue-300 hover:text-slate-900">
              Docs: Getting Started
            </Link>
            <Link href="/docs/model-comparison" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 hover:border-blue-300 hover:text-slate-900">
              Docs: Model Comparison Chart
            </Link>
            <Link href="/compare" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 hover:border-blue-300 hover:text-slate-900">
              Compare Workspace
            </Link>
            <Link href="/app" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 hover:border-blue-300 hover:text-slate-900">
              Start an Optimization
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
