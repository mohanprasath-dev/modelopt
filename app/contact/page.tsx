import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="mt-2 text-slate-300">Questions, feedback, or feature requests? Reach out below.</p>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="contact-name" className="mb-2 block text-sm text-slate-300">Name</label>
            <Input id="contact-name" placeholder="Your name" className="h-11 border-slate-700 bg-slate-950 text-slate-100" />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm text-slate-300">Email</label>
            <Input id="contact-email" type="email" placeholder="Your email" className="h-11 border-slate-700 bg-slate-950 text-slate-100" />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm text-slate-300">Message</label>
            <Textarea id="contact-message" placeholder="Your message" className="min-h-28 border-slate-700 bg-slate-950 text-slate-100" />
          </div>
          <Button type="button" className="bg-blue-500 text-white hover:bg-blue-400">Send Message</Button>
        </form>
        <p className="mt-4 text-sm text-slate-400">
          Prefer GitHub issues? <Link href="https://github.com/mohanprasath-dev/modelopt/issues" target="_blank" rel="noopener noreferrer" className="text-blue-300">Open an issue</Link>
        </p>
        <p className="mt-3 text-sm text-slate-400">
          Read the <Link href="/docs/getting-started" className="text-blue-300">getting started guide</Link> or try the <Link href="/app" className="text-blue-300">optimizer dashboard</Link> before opening support requests.
        </p>
      </div>
    </main>
  )
}
