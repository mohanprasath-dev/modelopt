"use client"

import * as React from "react"
import Link from "next/link"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const subscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) {
      return
    }

    const existing = localStorage.getItem("modelopt_newsletter")
    const list = existing ? (JSON.parse(existing) as string[]) : []
    const nextList = Array.from(new Set([...list, email.trim().toLowerCase()]))
    localStorage.setItem("modelopt_newsletter", JSON.stringify(nextList))
    setSubscribed(true)
    setEmail("")
  }

  return (
    <footer className="mt-16 border-t border-slate-800/90 bg-slate-950/80 px-4 py-12" aria-label="Site footer">
      <div className="mx-auto grid w-full max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <section>
          <h3 className="text-lg font-semibold text-slate-100">ModelOpt</h3>
          <p className="mt-2 text-sm text-slate-400">AI Model Optimization Made Simple</p>
          <form className="mt-4 space-y-2" onSubmit={subscribe}>
            <label htmlFor="newsletter-email" className="text-xs text-slate-400">
              Get updates on new models
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-10 border-slate-700 bg-slate-900 text-slate-100"
              />
              <Button type="submit" className="min-h-11 bg-blue-500 text-white hover:bg-blue-400">
                Join
              </Button>
            </div>
            {subscribed ? <p className="text-xs text-emerald-300">Thanks! We will notify you of updates.</p> : null}
          </form>
        </section>

        <section>
          <h4 className="font-medium text-slate-100">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link href="/app" className="hover:text-slate-100">Optimizer</Link></li>
            <li><Link href="/docs" className="hover:text-slate-100">Docs</Link></li>
            <li><Link href="/pricing" className="hover:text-slate-100">Pricing</Link></li>
            <li><Link href="/about" className="hover:text-slate-100">About</Link></li>
          </ul>
        </section>

        <section>
          <h4 className="font-medium text-slate-100">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link href="/blog" className="hover:text-slate-100">Blog</Link></li>
            <li><Link href="/changelog" className="hover:text-slate-100">Changelog</Link></li>
            <li><Link href="/contact" className="hover:text-slate-100">Contact</Link></li>
            <li><Link href="https://github.com/mohanprasath-dev/modelopt" target="_blank" rel="noopener noreferrer" className="hover:text-slate-100">GitHub</Link></li>
          </ul>
        </section>

        <section>
          <h4 className="font-medium text-slate-100">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link href="/privacy" className="hover:text-slate-100">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-slate-100">Terms</Link></li>
            <li><Link href="/cookies" className="hover:text-slate-100">Cookies</Link></li>
          </ul>
        </section>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col items-start justify-between gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center">
        <p>Built by Mohan Prasath</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="https://linkedin.com/in/mohanprasath21" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <span className="text-xs uppercase tracking-wide">LinkedIn</span>
          </Link>
          <Link href="https://github.com/mohanprasath-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <span className="text-xs uppercase tracking-wide">GitHub</span>
          </Link>
          <Link href="https://mohanprasath.dev" target="_blank" rel="noopener noreferrer" aria-label="Website">
            <Globe className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
