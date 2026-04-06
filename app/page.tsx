import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { ArrowRight } from "lucide-react"

import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { HowItWorks } from "@/components/HowItWorks"
import { TutorialsSection } from "@/components/TutorialsSection"
import { DiscordSection } from "@/components/DiscordSection"
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
  { value: "28+", label: "AI Models Tracked" },
  { value: "50+", label: "GPUs Supported" },
  { value: "100%", label: "Free Forever" },
]

export default function Home() {
  return (
    <main className="bg-[#f6f8fc] text-slate-900">
      <Script
        id="schema-faq-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <Hero />

      {/* Stats bar */}
      <section className="border-y border-slate-200 bg-white/80 px-4 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-6" aria-label="Key statistics">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold text-blue-700">{stat.value}</p>
              <p className="mt-0.5 text-xs text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </div>

      {/* How It Works */}
      <HowItWorks />

      <TutorialsSection />

      <DiscordSection />

      {/* Testimonials */}
      <section className="px-4 py-20 sm:px-6" aria-labelledby="testimonials-title">
        <div className="mx-auto w-full max-w-7xl">
          <h2
            id="testimonials-title"
            className="mb-10 text-center text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            What builders are saying
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.07)] backdrop-blur-sm"
              >
                <p className="text-sm leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-xs text-slate-500">— {t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </div>

      {/* FAQ */}
      <FAQ />

      {/* Internal links cluster */}
      <section className="px-4 pb-8 sm:px-6" aria-label="Explore model optimization guides">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap justify-center gap-2 text-sm text-slate-600">
          <Link href="/docs/getting-started" className="rounded-full border border-slate-300 bg-white px-3 py-1.5 hover:border-blue-300 hover:text-slate-900">Getting started with ModelOpt</Link>
          <Link href="/docs/model-comparison" className="rounded-full border border-slate-300 bg-white px-3 py-1.5 hover:border-blue-300 hover:text-slate-900">Model comparison chart</Link>
          <Link href="/blog/vram-vs-ram" className="rounded-full border border-slate-300 bg-white px-3 py-1.5 hover:border-blue-300 hover:text-slate-900">VRAM vs RAM guide</Link>
          <Link href="/blog/quantization-explained" className="rounded-full border border-slate-300 bg-white px-3 py-1.5 hover:border-blue-300 hover:text-slate-900">Quantization guide</Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 py-20 sm:px-6">
        <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-white via-blue-50/70 to-slate-50 p-10 text-center shadow-[0_24px_48px_rgba(15,23,42,0.1)] sm:p-14">
          {/* Glow */}
          <div className="pointer-events-none absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-300/30 via-transparent to-transparent opacity-70 blur-xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Ready to find your perfect model?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              No sign-up required. Enter your hardware, pick your use cases, and get Gemini-powered
              recommendations in seconds.
            </p>
            <div className="mt-8">
              <Link href="/app">
                <Button
                  size="lg"
                  className="h-12 rounded-xl border border-blue-300 bg-blue-600 px-8 text-base font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:shadow-[0_16px_35px_rgba(37,99,235,0.34)]"
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
