import Link from "next/link"
import { BookOpen, Code2, Cpu, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"

const tutorials = [
  {
    title: "Choose the Right Model in 5 Minutes",
    description: "A quick-start flow to match VRAM, RAM, and use-case fit without trial-and-error.",
    href: "/blog/how-to-choose-right-model",
    level: "Beginner",
    icon: BookOpen,
    duration: "5 min",
  },
  {
    title: "VRAM vs RAM for Local LLMs",
    description: "Understand memory bottlenecks and avoid selecting models that fail at runtime.",
    href: "/blog/vram-vs-ram",
    level: "Intermediate",
    icon: Cpu,
    duration: "7 min",
  },
  {
    title: "Quantization Strategy for Speed",
    description: "Learn when to use Q4, Q5, Q8, and FP16 across different hardware profiles.",
    href: "/blog/quantization-explained",
    level: "Intermediate",
    icon: Code2,
    duration: "8 min",
  },
]

export function TutorialsSection() {
  return (
    <section className="px-4 py-20 sm:px-6" aria-labelledby="tutorials-title">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Tutorials
            </p>
            <h2 id="tutorials-title" className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Guided learning for better model decisions
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Production-focused walkthroughs that help you pick, optimize, and deploy local AI models with confidence.
            </p>
          </div>
          <Link href="/tutorials">
            <Button className="h-10 rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-500">
              <Rocket className="mr-2 size-4" />
              View All Tutorials
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tutorials.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.11)]"
              >
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5">{item.level}</span>
                  <span>{item.duration}</span>
                </div>
                <Link href={item.href} className="mt-5 inline-flex text-sm font-medium text-blue-700 hover:text-blue-800">
                  Start Tutorial
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
