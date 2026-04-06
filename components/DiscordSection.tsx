import Link from "next/link"
import { BellRing, MessageCircle, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

const highlights = [
  {
    title: "Release Alerts",
    description: "Get notified when new model families and benchmark updates are added.",
    icon: BellRing,
  },
  {
    title: "Builder Help",
    description: "Discuss GPU fit, quantization trade-offs, and deployment setup with the community.",
    icon: MessageCircle,
  },
  {
    title: "Verified Updates",
    description: "Follow curated rollout notes and compatibility updates from the ModelOpt team.",
    icon: ShieldCheck,
  },
]

export function DiscordSection() {
  return (
    <section className="px-4 py-20 sm:px-6" aria-labelledby="discord-title">
      <div className="mx-auto w-full max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_44px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              Discord Community
            </p>
            <h2 id="discord-title" className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Join live model optimization discussions
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Connect with builders, get release updates, and collaborate on practical local AI deployment strategies.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/discord">
                <Button className="h-10 rounded-xl bg-indigo-600 px-5 text-white hover:bg-indigo-500">
                  Open Community Hub
                </Button>
              </Link>
              <Link href="https://discord.gg/modelopt" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="h-10 rounded-xl border-slate-300 bg-white px-5 text-slate-700 hover:bg-slate-50">
                  Join Discord
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg border border-indigo-200 bg-white text-indigo-700">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
