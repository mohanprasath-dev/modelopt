import type { Metadata } from "next"
import Link from "next/link"
import { Globe, Check } from "lucide-react"

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SpotlightCard } from "@/components/ui/spotlight-card"

export const metadata: Metadata = {
  title: "About — ModelOpt",
  description: "Mission, architecture, and creator profile for ModelOpt.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ModelOpt",
    description: "Learn how ModelOpt recommends AI models with transparent reasoning.",
    url: "/about",
    type: "website",
  },
}

const techStack = [
  "Next.js 14", "TypeScript", "Tailwind CSS", "React Bits",
  "Framer Motion", "Gemini AI", "Zod", "React Hook Form",
]

const principles = [
  {
    title: "Data Transparency",
    content:
      "Model metadata includes cited sources, context windows, quantization support, and conservative throughput estimates.",
  },
  {
    title: "Update Cadence",
    content:
      "Data is refreshed continuously as new open models, benchmarks, and hardware profiles are released.",
  },
  {
    title: "Privacy First",
    content:
      "No server-side storage of your inputs. All session data stays in your browser and is cleared when you close the tab.",
  },
]

const socials = [
  {
    href: "https://linkedin.com/in/mohanprasath21",
    icon: LinkedinIcon,
    label: "LinkedIn",
    desc: "Professional updates and community posts.",
  },
  {
    href: "https://github.com/mohanprasath-dev",
    icon: GithubIcon,
    label: "GitHub",
    desc: "Open-source projects, experiments, and releases.",
  },
  {
    href: "https://mohanprasath.dev",
    icon: Globe,
    label: "Website",
    desc: "Portfolio, writing, and technical work.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-14 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-5xl space-y-10">
        {/* Hero section */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-blue-500/8 via-slate-900/80 to-slate-900 p-8 sm:p-12">
          <div className="pointer-events-none absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-50 blur-xl" />
          <div className="relative">
            <Badge className="border-blue-500/30 bg-blue-500/10 text-blue-300">
              About ModelOpt
            </Badge>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              AI model recommendations{" "}
              <span className="gradient-text">with transparent logic</span>
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              ModelOpt helps developers and teams pick the right model for local and cloud
              inference. We combine deterministic hardware filtering with Gemini-assisted
              recommendation reasoning — so you always know why a model was chosen.
            </p>
          </div>
        </section>

        {/* Mission & How It Works */}
        <section className="grid gap-5 md:grid-cols-2">
          <Card className="border-slate-800/80 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-slate-100">Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-400">
              Remove guesswork from AI model selection and make local AI accessible for every
              hardware tier — from a 16GB laptop to a multi-GPU workstation.
            </CardContent>
          </Card>
          <Card className="border-slate-800/80 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-slate-100">How ModelOpt Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-400">
              {[
                "Validate GPU, RAM, VRAM, use-case, and preference inputs.",
                "Filter models based on hardware compatibility rules.",
                "Rank candidates with speed/quality bias weighting.",
                "Generate final recommendation narrative with Gemini.",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-blue-400" />
                  <span>{step}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Principles */}
        <section>
          <h2 className="mb-5 text-xl font-bold text-slate-100">Our Principles</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {principles.map((p) => (
              <SpotlightCard key={p.title} className="p-5">
                <h3 className="mb-2 font-semibold text-slate-100">{p.title}</h3>
                <p className="text-sm text-slate-400">{p.content}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-slate-100">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-slate-700 bg-slate-800/60 text-slate-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Creator */}
        <section className="rounded-3xl border border-slate-800/80 bg-slate-900/50 p-7 sm:p-10">
          <Badge className="border-slate-700 bg-slate-800/60 text-slate-400">Creator</Badge>
          <h2 className="mt-4 text-2xl font-bold text-slate-100">Built by Mohan Prasath</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Hi, I&apos;m Mohan Prasath — a full-stack AI engineer focused on practical developer
            tools and production-grade AI systems. I&apos;m currently studying at{" "}
            <strong className="text-slate-100">B.S.A. Crescent Institute</strong> and building
            projects at the intersection of LLMs, developer tooling, and hardware constraints.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <SpotlightCard key={social.label}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-100">
                      <Icon className="size-4 text-blue-400" />
                      <span className="font-semibold">{social.label}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">{social.desc}</p>
                  </Link>
                </SpotlightCard>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
