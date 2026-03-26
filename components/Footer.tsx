"use client"

import * as React from "react"
import Link from "next/link"
import { Globe, Sparkles } from "lucide-react"

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const productLinks = [
  { href: "/app", label: "Optimizer" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
]

const resourceLinks = [
  { href: "/changelog", label: "Changelog" },
  { href: "/contact", label: "Contact" },
  { href: "https://github.com/mohanprasath-dev/modelopt", label: "GitHub", external: true },
]

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
]

export function Footer() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const subscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) return
    const existing = localStorage.getItem("modelopt_newsletter")
    const list = existing ? (JSON.parse(existing) as string[]) : []
    const nextList = Array.from(new Set([...list, email.trim().toLowerCase()]))
    localStorage.setItem("modelopt_newsletter", JSON.stringify(nextList))
    setSubscribed(true)
    setEmail("")
  }

  return (
    <footer
      className="mt-16 border-t border-slate-800/70 bg-slate-950 px-4 py-14 sm:px-6"
      aria-label="Site footer"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand + Newsletter */}
          <section>
            <Link href="/" className="inline-flex items-center gap-2 text-slate-100">
              <span className="inline-flex size-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/30">
                <Sparkles className="size-4" />
              </span>
              <span className="font-bold tracking-tight">ModelOpt</span>
            </Link>
            <p className="mt-3 text-sm text-slate-400">
              AI Model Optimization Made Simple.<br />Free, fast, hardware-aware.
            </p>
            <form className="mt-5 space-y-2" onSubmit={subscribe} aria-label="Newsletter signup">
              <label htmlFor="newsletter-email" className="text-xs text-slate-500">
                Get updates on new models
              </label>
              {subscribed ? (
                <p className="text-xs font-medium text-emerald-400">
                  ✓ Thanks! We&apos;ll notify you of updates.
                </p>
              ) : (
                <div className="flex gap-2">
                  <Input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-9 flex-1 border-slate-700 bg-slate-900 text-sm text-slate-100 placeholder:text-slate-600"
                    required
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="rounded-lg shrink-0 bg-blue-500 text-white hover:bg-blue-400"
                  >
                    Join
                  </Button>
                </div>
              )}
            </form>
          </section>

          {/* Column 2: Product */}
          <section>
            <h4 className="text-sm font-semibold text-slate-200">Product</h4>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 3: Resources */}
          <section>
            <h4 className="text-sm font-semibold text-slate-200">Resources</h4>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 4: Legal */}
          <section>
            <h4 className="text-sm font-semibold text-slate-200">Legal</h4>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-slate-800/70 pt-7 sm:flex-row sm:items-center">
          <div className="text-xs text-slate-500">
            <p>© 2026 ModelOpt. All rights reserved.</p>
            <p className="mt-0.5">
              Built by{" "}
              <Link
                href="https://mohanprasath.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-100"
              >
                Mohan Prasath
              </Link>
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <Link
              href="https://linkedin.com/in/mohanprasath21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex size-8 items-center justify-center rounded-lg border border-slate-800 text-slate-500 transition-colors hover:border-slate-700 hover:text-slate-300"
            >
              <LinkedinIcon className="size-4" />
            </Link>
            <Link
              href="https://github.com/mohanprasath-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex size-8 items-center justify-center rounded-lg border border-slate-800 text-slate-500 transition-colors hover:border-slate-700 hover:text-slate-300"
            >
              <GithubIcon className="size-4" />
            </Link>
            <Link
              href="https://mohanprasath.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Personal website"
              className="flex size-8 items-center justify-center rounded-lg border border-slate-800 text-slate-500 transition-colors hover:border-slate-700 hover:text-slate-300"
            >
              <Globe className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
