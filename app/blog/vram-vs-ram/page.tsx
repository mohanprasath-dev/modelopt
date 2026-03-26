import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

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
  twitter: {
    card: "summary_large_image",
    title: "VRAM vs RAM: What Actually Matters",
    description: "Understand when VRAM limits fail workloads first and how RAM influences broader system stability.",
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "VRAM vs RAM: What Actually Matters",
  description: "Understand when VRAM limits fail workloads first and how RAM influences broader system stability.",
  author: {
    "@type": "Person",
    name: "Mohan Prasath",
  },
  publisher: {
    "@type": "Organization",
    name: "ModelOpt",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/favicon.ico`,
    },
  },
  datePublished: "2026-03-01",
  dateModified: "2026-03-01",
  mainEntityOfPage: `${siteUrl}/blog/vram-vs-ram`,
}

export default function BlogVramVsRamPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <Script
        id="schema-article-vram-ram"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
