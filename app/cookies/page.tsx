import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Understand how ModelOpt uses browser storage and cookies for core functionality.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "ModelOpt Cookie Policy",
    description: "Cookie and browser storage usage policy for ModelOpt.",
    url: "/cookies",
    type: "website",
  },
}

export default function CookiesPage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100/70 px-4 py-12 text-slate-900 sm:px-6">
      <article className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold">Cookie Policy</h1>
        <p className="text-sm text-slate-500">Last updated: March 2026</p>
        <p className="text-slate-600">ModelOpt uses essential browser storage for session flows (for example, optimization result persistence).</p>
        <p className="text-slate-600">Future analytics integrations will remain privacy-focused and aggregate-only.</p>
        <p className="text-slate-600">Read more in our <Link href="/privacy" className="text-blue-700 hover:text-blue-800">privacy policy</Link>.</p>
      </article>
    </main>
  )
}
