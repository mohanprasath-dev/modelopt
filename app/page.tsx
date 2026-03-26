import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { ArrowRight } from "lucide-react"

import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { HowItWorks } from "@/components/HowItWorks"
import { FAQ } from "@/components/FAQ"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "AI Model Optimization Engine for Local LLMs",
  description:
    "Find the best local LLM for your GPU and RAM in seconds. Compare models, optimize performance, and get deployment commands for Ollama, llama.cpp, and HuggingFace.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ModelOpt - AI Model Optimization Engine",
    description:
      "Hardware-optimized AI model recommendations with instant deployment commands.",
    url: "/",
    type: "website",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is ModelOpt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ModelOpt is a free AI model recommendation engine that matches models to your GPU, RAM, and use cases.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate are recommendations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Recommendations are hardware-aware and filtered by VRAM and RAM constraints, then ranked by use-case and speed preference.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use ModelOpt without a high-end GPU?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. ModelOpt supports multiple hardware tiers and recommends models that fit lower-memory systems as well.",
      },
    },
  ],
}

const testimonials = [
  {
    quote:
      "Helped me pick a coding model that actually runs on my 12GB GPU. Would have wasted hours trial-and-error without this.",
    author: "Developer, RTX 3060",
  },
  {
    quote:
      "The speed-vs-quality slider is exactly what our research team needed. We run Qwen now with 2x the throughput.",
    author: "ML Researcher",
  },
  {
    quote:
      "Install tabs save so much time. No more searching model IDs manually on HuggingFace. Just copy and go.",
    author: "AI Hobbyist",
  },
]

const stats = [
  { value: "10,000+", label: "Optimizations Run" },
  { value: "20+", label: "AI Models Tracked" },
  { value: "50+", label: "GPUs Supported" },
  { value: "100%", label: "Free Forever" },
]

export default function Home() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <Script
        id="schema-faq-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <Hero />

      {/* Stats bar */}
      <section className="border-y border-slate-800/60 bg-slate-900/40 px-4 py-6 sm:px-6" aria-label="Key statistics">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold text-blue-300">{stat.value}</p>
              <p className="mt-0.5 text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      </div>

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <section className="px-4 py-20 sm:px-6" aria-labelledby="testimonials-title">
        <div className="mx-auto w-full max-w-7xl">
          <h2
            id="testimonials-title"
            className="mb-10 text-center text-2xl font-bold text-slate-100 sm:text-3xl"
          >
            What builders are saying
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm"
              >
                <p className="text-sm leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-xs text-slate-500">— {t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      </div>

      {/* FAQ */}
      <FAQ />

      {/* Internal links cluster */}
      <section className="px-4 pb-8 sm:px-6" aria-label="Explore model optimization guides">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap justify-center gap-2 text-sm text-slate-400">
          <Link href="/docs/getting-started" className="rounded-full border border-slate-700 px-3 py-1.5 hover:border-blue-500/40 hover:text-slate-200">Getting started with ModelOpt</Link>
          <Link href="/docs/model-comparison" className="rounded-full border border-slate-700 px-3 py-1.5 hover:border-blue-500/40 hover:text-slate-200">Model comparison chart</Link>
          <Link href="/blog/vram-vs-ram" className="rounded-full border border-slate-700 px-3 py-1.5 hover:border-blue-500/40 hover:text-slate-200">VRAM vs RAM guide</Link>
          <Link href="/blog/quantization-explained" className="rounded-full border border-slate-700 px-3 py-1.5 hover:border-blue-500/40 hover:text-slate-200">Quantization guide</Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 py-20 sm:px-6">
        <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-blue-500/25 bg-gradient-to-br from-blue-500/10 via-slate-900/80 to-slate-900 p-10 text-center sm:p-14">
          {/* Glow */}
          <div className="pointer-events-none absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-60 blur-xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
              Ready to find your perfect model?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              No sign-up required. Enter your hardware, pick your use cases, and get Gemini-powered
              recommendations in seconds.
            </p>
            <div className="mt-8">
              <Link href="/app">
                <Button
                  size="lg"
                  className="h-12 rounded-xl border border-blue-400/40 bg-blue-500 px-8 text-base font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.4)] hover:bg-blue-400 hover:shadow-[0_0_50px_rgba(59,130,246,0.55)]"
                >
                  Optimize My Setup
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <p className="mt-4 text-xs text-slate-500">
                Free forever · No account · Instant results
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
