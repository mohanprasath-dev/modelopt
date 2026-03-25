import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ModelOpt privacy policy",
}

export default function PrivacyPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <article className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-slate-400">Last updated: March 2026</p>
        <p className="text-slate-300">ModelOpt processes optimization inputs to produce recommendations. We do not sell personal data.</p>
        <p className="text-slate-300">Operational logs may include anonymized request metadata for reliability and abuse prevention.</p>
        <p className="text-slate-300">Contact us through the contact page for privacy-related requests.</p>
      </article>
    </main>
  )
}
