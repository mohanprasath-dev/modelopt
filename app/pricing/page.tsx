import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"

import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FAQ } from "@/components/FAQ"

export const metadata: Metadata = {
  title: "Pricing — ModelOpt",
  description: "ModelOpt pricing: free optimization for everyone, Pro and Enterprise coming soon.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "ModelOpt Pricing",
    description: "Explore ModelOpt plans for AI model optimization workflows.",
    url: "/pricing",
    type: "website",
  },
}

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    status: "Available Now",
    statusColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    description: "All the core AI model optimization features, zero cost.",
    features: [
      "Unlimited optimizations",
      "20+ AI models in database",
      "50+ GPUs supported",
      "Gemini-powered reasoning",
      "Ollama, llama.cpp & HuggingFace commands",
      "Share & export results",
    ],
    cta: "Get Started Free",
    ctaHref: "/app",
    highlight: false,
    ctaClass: "bg-blue-500 text-white hover:bg-blue-400",
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    status: "Coming Soon",
    statusColor: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    description: "Advanced features for power users and small teams.",
    features: [
      "Everything in Free",
      "Batch optimization (up to 10 profiles)",
      "Saved configurations",
      "API access",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Notify Me",
    ctaHref: "#",
    highlight: true,
    ctaClass: "border-blue-500/50 text-blue-300 hover:bg-blue-500/10",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    status: "Coming Soon",
    statusColor: "border-slate-600 bg-slate-800/60 text-slate-400",
    description: "White-label, custom catalogs, and SLA for organizations.",
    features: [
      "Everything in Pro",
      "Custom model catalogs",
      "White-label deployment",
      "SLA & dedicated support",
      "Advanced governance",
      "On-premise option",
    ],
    cta: "Contact Sales",
    ctaHref: "/contact",
    highlight: false,
    ctaClass: "border-slate-700 text-slate-300 hover:bg-slate-800/60",
  },
]

const pricingFaqs = [
  {
    question: "Will the free tier remain?",
    answer:
      "Yes. A generous free tier will always be available. The core optimizer will never be paywalled.",
  },
  {
    question: "When is Pro launching?",
    answer:
      "We're validating demand and defining the exact feature set. Sign up for updates to be notified first.",
  },
  {
    question: "Do you support enterprise procurement?",
    answer:
      "Planned in the Enterprise rollout. Contact us to discuss custom arrangements or early access.",
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-14 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-16">
        {/* Header */}
        <header className="text-center">
          <Badge className="border-slate-700 bg-slate-800/60 text-slate-400">Pricing</Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Simple pricing,{" "}
            <span className="gradient-text">clear roadmap</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Start free today. Pro and Enterprise tiers are being built for teams and scale.
          </p>
        </header>

        {/* Pricing cards */}
        <section className="grid gap-6 md:grid-cols-3" aria-label="Pricing tiers">
          {tiers.map((tier) => (
            <SpotlightCard
              key={tier.name}
              className={
                tier.highlight
                  ? "ring-1 ring-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                  : ""
              }
            >
              <div className="p-7">
                {/* Tier header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-bold text-slate-100">{tier.name}</h2>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-slate-100">{tier.price}</span>
                      {tier.period && (
                        <span className="text-sm text-slate-500">/{tier.period}</span>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={tier.statusColor}
                  >
                    {tier.status}
                  </Badge>
                </div>

                <p className="mt-4 text-sm text-slate-400">{tier.description}</p>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <Check className="size-4 shrink-0 text-blue-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <Link href={tier.ctaHref}>
                    <Button
                      variant="outline"
                      className={`w-full ${tier.ctaClass}`}
                      disabled={tier.status === "Coming Soon" && tier.ctaHref === "#"}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </section>

        {/* FAQ */}
        <section>
          <FAQ />
        </section>
      </div>
    </main>
  )
}
