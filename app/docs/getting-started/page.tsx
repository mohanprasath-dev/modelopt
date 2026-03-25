import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Docs - Getting Started",
  description: "Get started with ModelOpt optimization workflow.",
  alternates: {
    canonical: "/docs/getting-started",
  },
  openGraph: {
    title: "ModelOpt Getting Started",
    description: "Set up your first optimization flow and understand hardware fit quickly.",
    url: "/docs/getting-started",
    type: "article",
  },
}

export default function GettingStartedPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <article className="mx-auto w-full max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold">Getting Started</h1>
        <p className="text-slate-300">Follow these steps to run your first optimization report.</p>
        <ol className="space-y-3 text-slate-300">
          <li>1. Open the Optimizer page and select your GPU.</li>
          <li>2. Set system RAM and confirm VRAM override.</li>
          <li>3. Pick at least one use case and speed preference.</li>
          <li>4. Submit and review top model recommendations.</li>
        </ol>

        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-xl font-semibold">Hardware requirements explained</h2>
          <p className="mt-2 text-sm text-slate-300">
            Local deployment mode enforces VRAM and RAM thresholds. Cloud mode prioritizes RAM constraints and use-case fit.
          </p>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-xl font-semibold">Troubleshooting quick tips</h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-300">
            <li>- Ensure GEMINI_API_KEY is configured.</li>
            <li>- Retry after one minute if rate limited.</li>
            <li>- Use cloud mode if local VRAM is below model minimum.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-xl font-semibold">Next steps</h2>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-300">
            <Link href="/docs/model-comparison" className="rounded-md border border-slate-700 bg-slate-950/60 px-3 py-1.5 hover:border-blue-500/40">Open model comparison</Link>
            <Link href="/blog/vram-vs-ram" className="rounded-md border border-slate-700 bg-slate-950/60 px-3 py-1.5 hover:border-blue-500/40">Read VRAM vs RAM guide</Link>
            <Link href="/app" className="rounded-md border border-slate-700 bg-slate-950/60 px-3 py-1.5 hover:border-blue-500/40">Go to optimizer</Link>
          </div>
        </section>
      </article>
    </main>
  )
}
