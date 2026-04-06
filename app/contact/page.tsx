import type { Metadata } from "next"
import Link from "next/link"

import { ContactForm } from "@/components/ContactForm"

export const metadata: Metadata = {
  title: "Contact ModelOpt",
  description:
    "Contact ModelOpt for feature requests, partnerships, bug reports, and support related to AI model optimization.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact ModelOpt",
    description: "Get in touch with the ModelOpt team for support and feedback.",
    url: "/contact",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100/70 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.07)]">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="mt-2 text-slate-600">Questions, feedback, or feature requests? Reach out below.</p>
        <ContactForm />
        <p className="mt-4 text-sm text-slate-500">
          Prefer GitHub issues? <Link href="https://github.com/mohanprasath-dev/modelopt/issues" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">Open an issue</Link>
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Read the <Link href="/docs/getting-started" className="text-blue-700 hover:text-blue-800">getting started guide</Link> or try the <Link href="/app" className="text-blue-700 hover:text-blue-800">optimizer dashboard</Link> before opening support requests.
        </p>
      </div>
    </main>
  )
}
