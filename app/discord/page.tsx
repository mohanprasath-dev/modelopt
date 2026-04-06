import type { Metadata } from "next"
import Link from "next/link"
import { BellRing, MessageCircle, Rocket, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

const channels = [
  {
    title: "release-updates",
    description: "Track newly added models, benchmark refreshes, and API improvements.",
    icon: BellRing,
  },
  {
    title: "hardware-fit",
    description: "Get help choosing models for specific GPUs, RAM budgets, and use cases.",
    icon: MessageCircle,
  },
  {
    title: "production-guides",
    description: "Discuss deployment workflows and reliability practices for local AI stacks.",
    icon: ShieldCheck,
  },
]

export const metadata: Metadata = {
  title: "Discord Community",
  description: "Join the ModelOpt Discord community for release updates and model optimization discussions.",
  alternates: {
    canonical: "/discord",
  },
  openGraph: {
    title: "ModelOpt Discord Community",
    description: "Get release updates and discuss model optimization with builders.",
    url: "/discord",
    type: "website",
  },
}

export default function DiscordPage() {
  return (
    <main className="px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Discord
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">ModelOpt Community Hub</h1>
          <p className="max-w-3xl text-slate-600">
            Join the community to receive model release updates, ask hardware-fit questions, and share practical deployment learnings.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="https://discord.gg/modelopt" target="_blank" rel="noopener noreferrer">
              <Button className="h-10 rounded-xl bg-indigo-600 px-5 text-white hover:bg-indigo-500">
                <Rocket className="mr-2 size-4" />
                Join Discord
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="h-10 rounded-xl border-slate-300 bg-white px-5 text-slate-700 hover:bg-slate-50">
                Contact Team
              </Button>
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {channels.map((channel) => {
            const Icon = channel.icon
            return (
              <article key={channel.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.07)]">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">#{channel.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{channel.description}</p>
              </article>
            )
          })}
        </section>
      </div>
    </main>
  )
}
