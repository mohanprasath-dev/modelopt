import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how ModelOpt handles optimization inputs, telemetry, and user privacy.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "ModelOpt Privacy Policy",
    description: "Privacy and data handling practices for ModelOpt users.",
    url: "/privacy",
    type: "website",
  },
}

export default function PrivacyPage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100/70 px-4 py-12 text-slate-900 sm:px-6">
      <article className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: March 2026</p>
        <p className="text-slate-600">ModelOpt processes optimization inputs to produce recommendations. We do not sell personal data.</p>
        <p className="text-slate-600">Operational logs may include anonymized request metadata for reliability and abuse prevention.</p>
        <p className="text-slate-600">Contact us through the <Link href="/contact" className="text-blue-700 hover:text-blue-800">contact page</Link> for privacy-related requests.</p>
      </article>
    </main>
  )
}
