import type { Metadata } from "next"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Blog",
  description: "ModelOpt technical articles and guides.",
}

const posts = [
  { href: "/blog/how-to-choose-right-model", title: "How to Choose the Right AI Model for Your GPU" },
  { href: "/blog/vram-vs-ram", title: "VRAM vs RAM: What Actually Matters" },
  { href: "/blog/quantization-explained", title: "Quantization Explained: Q4 vs Q8 vs FP16" },
]

export default function BlogPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.href} href={post.href}>
              <Card className="h-full border-slate-800 bg-slate-900/60 hover:border-blue-500/40">
                <CardHeader><CardTitle>{post.title}</CardTitle></CardHeader>
                <CardContent className="text-slate-400">Read article</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
