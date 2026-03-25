"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sparkles } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/app", label: "Optimizer", badge: "Try Now" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          title="Created by Mohan Prasath"
          aria-label="ModelOpt home"
        >
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-blue-500/20 text-blue-300">
            <Sparkles className="size-4" />
          </span>
          <span className="font-semibold tracking-tight">ModelOpt</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                  isActive && "bg-slate-800/70 text-slate-100"
                )}
              >
                {item.label}
                {item.badge ? (
                  <Badge className="border-blue-500/40 bg-blue-500/20 text-[10px] text-blue-200">
                    {item.badge}
                  </Badge>
                ) : null}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/app" aria-label="Get started with optimizer">
            <Button className="bg-blue-500 text-white hover:bg-blue-400">Get Started</Button>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-slate-700 text-slate-200 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-800/70 bg-slate-900/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm text-slate-300",
                    isActive && "bg-slate-800 text-slate-100"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href="/app" className="mt-2">
              <Button className="w-full bg-blue-500 text-white hover:bg-blue-400">Get Started</Button>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
