import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Clock3, Cpu, TerminalSquare } from "lucide-react"

const tutorials = [
  {
    title: "Model Selection for Your Hardware",
    summary: "Match model families by VRAM, RAM, and latency target before deploying.",
    href: "/blog/how-to-choose-right-model",
    duration: "5 min",
    icon: Cpu,
  },
  {
    title: "Memory Planning: VRAM vs RAM",
    summary: "Avoid swap-heavy runtimes and choose realistic model sizes for your machine.",
    href: "/blog/vram-vs-ram",
    duration: "7 min",
    icon: BookOpen,
  },
  {
    title: "Quantization for Throughput",
    summary: "Choose Q4/Q5/Q8/FP16 based on speed and quality needs.",
    href: "/blog/quantization-explained",
    duration: "8 min",
    icon: TerminalSquare,
  },
]

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Step-by-step tutorials for selecting and deploying local AI models with ModelOpt.",
  alternates: {
    canonical: "/tutorials",
  },
  openGraph: {
    title: "ModelOpt Tutorials",
    description: "Learn model selection, memory planning, and deployment best practices.",
    url: "/tutorials",
    type: "website",
  },
}

export default function TutorialsPage() {
  return (
    <main className="px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            Tutorials
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Learn model optimization faster</h1>
          <p className="max-w-3xl text-slate-600">
            Practical walkthroughs to help you choose, benchmark, and deploy the right model for your hardware profile.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {tutorials.map((tutorial) => {
            const Icon = tutorial.icon
            return (
              <article key={tutorial.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.07)]">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">{tutorial.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{tutorial.summary}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 className="size-3.5" />
                  {tutorial.duration}
                </div>
                <Link href={tutorial.href} className="mt-5 inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800">
                  Open tutorial
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </article>
            )
          })}
        </section>
      </div>
    </main>
  )
}
