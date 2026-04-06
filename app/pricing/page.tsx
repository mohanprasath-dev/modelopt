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
      "28+ AI models in database",
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
    ctaClass: "border-blue-200 text-blue-700 hover:bg-blue-50",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    status: "Coming Soon",
    statusColor: "border-slate-200 bg-slate-100 text-slate-600",
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
    ctaClass: "border-slate-200 text-slate-700 hover:bg-slate-100",
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/80 px-4 py-14 text-slate-900 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-16">
        {/* Header */}
        <header className="text-center">
          <Badge className="border-slate-200 bg-white text-slate-600">Pricing</Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Simple pricing,{" "}
            <span className="gradient-text">clear roadmap</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
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
                  ? "ring-1 ring-blue-200 shadow-[0_0_40px_rgba(59,130,246,0.12)]"
                  : ""
              }
            >
              <div className="p-7">
                {/* Tier header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">{tier.name}</h2>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-slate-900">{tier.price}</span>
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

                <p className="mt-4 text-sm text-slate-600">{tier.description}</p>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <Check className="size-4 shrink-0 text-blue-600" aria-hidden="true" />
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
