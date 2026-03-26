import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "ModelOpt Changelog",
  description: "Product updates, releases, and SEO/performance improvements shipped in ModelOpt.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "ModelOpt Changelog",
    description: "Track all major ModelOpt updates and release highlights.",
    url: "/changelog",
    type: "article",
  },
}

export default function ChangelogPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Changelog</h1>
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold">v1.0.0 - March 2026</h2>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            <p><strong>Added:</strong> Multi-page architecture, enhanced results dashboard, documentation hub.</p>
            <p><strong>Improved:</strong> Mobile responsiveness, error handling, API fallback reliability.</p>
          </div>
        </section>
        <p className="text-sm text-slate-400">
          Start with <Link href="/docs/getting-started" className="text-blue-300">documentation</Link> or run your first <Link href="/app" className="text-blue-300">model optimization</Link>.
        </p>
      </div>
    </main>
  )
}
