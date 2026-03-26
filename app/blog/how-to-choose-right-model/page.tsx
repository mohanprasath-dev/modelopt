import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://modelopt.mohanprasath.dev"

export const metadata: Metadata = {
  title: "How to Choose the Right AI Model for Your GPU",
  description: "A practical framework for selecting AI models based on VRAM, RAM, and workload goals.",
  alternates: {
    canonical: "/blog/how-to-choose-right-model",
  },
  openGraph: {
    title: "How to Choose the Right AI Model for Your GPU",
    description: "A practical framework for selecting AI models based on VRAM, RAM, and workload goals.",
    url: "/blog/how-to-choose-right-model",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Choose the Right AI Model for Your GPU",
    description: "A practical framework for selecting AI models based on VRAM, RAM, and workload goals.",
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Choose the Right AI Model for Your GPU",
  description: "A practical framework for selecting AI models based on VRAM, RAM, and workload goals.",
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
  mainEntityOfPage: `${siteUrl}/blog/how-to-choose-right-model`,
}

export default function BlogHowToChoosePage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <Script
        id="schema-article-choose-model"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="prose prose-invert mx-auto max-w-3xl">
        <h1>How to Choose the Right AI Model for Your GPU</h1>
        <p>Start with VRAM and RAM limits, then optimize for your use-case and latency tolerance.</p>
        <p>ModelOpt automates this by filtering compatibility first and adding recommendation reasoning second.</p>
        <p>
          Continue with the <Link href="/docs/model-comparison">model comparison chart</Link> or launch the <Link href="/app">optimizer dashboard</Link>.
        </p>
      </article>
    </main>
  )
}
