import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ModelOpt terms of service",
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
      </article>
    </main>
  )
}
