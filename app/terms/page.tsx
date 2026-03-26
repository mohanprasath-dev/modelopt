import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ModelOpt terms of service and usage requirements for all users.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "ModelOpt Terms of Service",
    description: "Legal terms and acceptable use for ModelOpt.",
    url: "/terms",
    type: "website",
  },
}

export default function TermsPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <article className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-sm text-slate-400">Last updated: March 2026</p>
        <p className="text-slate-300">ModelOpt is provided as-is without warranties. You are responsible for validating AI outputs in your workflows.</p>
        <p className="text-slate-300">Do not use the service for unlawful or abusive behavior. Rate-limits are enforced for service reliability.</p>
        <p className="text-slate-300">By using ModelOpt, you agree to these terms.</p>
        <p className="text-slate-300">Also review our <Link href="/privacy" className="text-blue-300">privacy policy</Link> and <Link href="/cookies" className="text-blue-300">cookie policy</Link>.</p>
      </article>
    </main>
  )
}
