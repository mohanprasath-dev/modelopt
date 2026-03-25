import type { Metadata } from "next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Pricing",
  description: "ModelOpt pricing and upcoming tiers.",
}

const tiers = [
  {
    name: "Free",
    price: "$0",
    status: "Available",
    features: ["Single optimization flow", "Results and export actions", "20+ model database", "Community support"],
  },
  {
    name: "Pro",
    price: "Coming soon",
    status: "Planned",
    features: ["Batch optimization", "Saved configurations", "Priority support", "API access"],
  },
  {
    name: "Enterprise",
    price: "Coming soon",
    status: "Planned",
    features: ["Custom model catalogs", "White-label experiences", "SLA and dedicated support", "Advanced governance"],
  },
]

export default function PricingPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Simple pricing, clear roadmap</h1>
          <p className="mt-3 text-slate-300">Start free today. Pro and Enterprise tiers are being built for teams and scale.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className="border-slate-800 bg-slate-900/60">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{tier.name}</CardTitle>
                  <Badge className="border-blue-500/40 bg-blue-500/10 text-blue-300">{tier.status}</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-100">{tier.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  {tier.features.map((feature) => (
                    <li key={feature}>- {feature}</li>
                  ))}
                </ul>
                <Button className="mt-5 w-full bg-blue-500 text-white hover:bg-blue-400" disabled={tier.name !== "Free"}>
                  {tier.name === "Free" ? "Get Started" : "Notify Me"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold">Pricing FAQ</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p><strong>Will free tier remain?</strong> Yes, a generous free tier will remain available.</p>
            <p><strong>When is Pro launching?</strong> We are validating demand and expected feature set now.</p>
            <p><strong>Do you support enterprise procurement?</strong> Planned in the Enterprise rollout.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
