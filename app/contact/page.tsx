import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <main className="px-4 py-12 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="mt-2 text-slate-300">Questions, feedback, or feature requests? Reach out below.</p>
        <form className="mt-6 space-y-4">
          <Input placeholder="Your name" className="h-11 border-slate-700 bg-slate-950 text-slate-100" />
          <Input type="email" placeholder="Your email" className="h-11 border-slate-700 bg-slate-950 text-slate-100" />
          <Textarea placeholder="Your message" className="min-h-28 border-slate-700 bg-slate-950 text-slate-100" />
          <Button type="button" className="bg-blue-500 text-white hover:bg-blue-400">Send Message</Button>
        </form>
        <p className="mt-4 text-sm text-slate-400">
          Prefer GitHub issues? <Link href="https://github.com/mohanprasath-dev/modelopt/issues" target="_blank" rel="noopener noreferrer" className="text-blue-300">Open an issue</Link>
        </p>
      </div>
    </main>
  )
}
