import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://modelopt.mohanprasath.dev"

export const metadata: Metadata = {
  title: "Quantization Explained: Q4 vs Q8 vs FP16",
  description: "Understand quantization tradeoffs and how to choose between memory fit and output quality.",
  alternates: {
    canonical: "/blog/quantization-explained",
  },
  openGraph: {
    title: "Quantization Explained: Q4 vs Q8 vs FP16",
    description: "Understand quantization tradeoffs and how to choose between memory fit and output quality.",
    url: "/blog/quantization-explained",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantization Explained: Q4 vs Q8 vs FP16",
    description: "Understand quantization tradeoffs and choose the right format for your hardware.",
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Quantization Explained: Q4 vs Q8 vs FP16",
  description: "Understand quantization tradeoffs and how to choose between memory fit and output quality.",
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
  mainEntityOfPage: `${siteUrl}/blog/quantization-explained`,
}

export default function BlogQuantizationPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <Script
        id="schema-article-quantization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="prose prose-invert mx-auto max-w-3xl">
        <h1>Quantization Explained: Q4 vs Q8 vs FP16</h1>
        <p>Lower-bit quantization improves memory fit and speed but may reduce quality on complex reasoning tasks.</p>
        <p>For most local setups, Q4 or Q5 are practical defaults, while Q8/FP16 are better when memory headroom allows.</p>
        <p>
          Try recommendations in the <Link href="/app">optimizer</Link> and cross-check candidates in the <Link href="/docs/model-comparison">model comparison chart</Link>.
        </p>
      </article>
    </main>
  )
}
