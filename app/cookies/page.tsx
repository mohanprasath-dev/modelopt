import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "ModelOpt cookie policy",
}

export default function CookiesPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <article className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold">Cookie Policy</h1>
        <p className="text-sm text-slate-400">Last updated: March 2026</p>
        <p className="text-slate-300">ModelOpt uses essential browser storage for session flows (for example, optimization result persistence).</p>
        <p className="text-slate-300">Future analytics integrations will remain privacy-focused and aggregate-only.</p>
      </article>
    </main>
  )
}
