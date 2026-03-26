"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sparkles } from "lucide-react"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"

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

function isItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  React.useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-slate-800/80 bg-slate-950/90 shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl"
          : "border-transparent bg-slate-950/60 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          title="Created by Mohan Prasath"
          aria-label="ModelOpt home"
        >
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/30">
            <Sparkles className="size-4" />
          </span>
          <span className="font-bold tracking-tight text-slate-100">ModelOpt</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = isItemActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                  isActive
                    ? "bg-blue-500/10 text-slate-100"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {item.badge ? (
                  <Badge className="border-blue-500/40 bg-blue-500/15 px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wide text-blue-300">
                    {item.badge}
                  </Badge>
                ) : null}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-px h-px rounded-full bg-blue-400/60"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/app" aria-label="Get started with optimizer">
            <Button className="rounded-lg bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.45)]">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-700/70 text-slate-300 transition-colors hover:bg-slate-800/60 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <>
                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="fixed inset-0 z-[60] bg-slate-950/75 backdrop-blur-[1px] md:hidden"
                    onClick={() => setOpen(false)}
                    aria-label="Close navigation menu"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed inset-x-0 bottom-0 top-16 z-[70] overflow-y-auto border-t border-slate-800/70 bg-slate-950/98 px-4 py-5 backdrop-blur-2xl md:hidden"
                  >
                    <nav className="flex flex-col gap-1" aria-label="Mobile">
                      {navItems.map((item) => {
                        const isActive = isItemActive(pathname, item.href)
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-colors",
                              isActive
                                ? "bg-blue-500/10 text-slate-100"
                                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                            )}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span className="flex items-center gap-2">
                              {item.label}
                              {item.badge ? (
                                <Badge className="border-blue-500/40 bg-blue-500/15 px-1.5 py-0 text-[9px] uppercase tracking-wide text-blue-300">
                                  {item.badge}
                                </Badge>
                              ) : null}
                            </span>
                          </Link>
                        )
                      })}
                      <div className="mt-4 border-t border-slate-800 pt-4">
                        <Link href="/app" className="block" onClick={() => setOpen(false)}>
                          <Button className="w-full bg-blue-500 text-white hover:bg-blue-400">
                            Get Started Free
                          </Button>
                        </Link>
                      </div>
                    </nav>
                  </motion.div>
                </>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </header>
  )
}
