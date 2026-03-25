import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "VRAM vs RAM: What Actually Matters",
  description: "Understand when VRAM limits fail workloads first and how RAM influences broader system stability.",
  alternates: {
    canonical: "/blog/vram-vs-ram",
  },
  openGraph: {
    title: "VRAM vs RAM: What Actually Matters",
    description: "Understand when VRAM limits fail workloads first and how RAM influences broader system stability.",
    url: "/blog/vram-vs-ram",
    type: "article",
  },
}

export default function BlogVramVsRamPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <article className="prose prose-invert mx-auto max-w-3xl">
        <h1>VRAM vs RAM: What Actually Matters</h1>
        <p>VRAM constrains model loading and runtime on local GPUs, while RAM impacts broader system stability and offload paths.</p>
        <p>Local deployments typically fail first on VRAM limits, which is why ModelOpt prioritizes VRAM compatibility checks.</p>
        <p>
          Use the <Link href="/docs/getting-started">getting started guide</Link> and then validate fit in the <Link href="/compare">compare workspace</Link>.
        </p>
      </article>
    </main>
  )
}
