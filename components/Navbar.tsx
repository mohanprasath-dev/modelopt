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
  { href: "/tutorials", label: "Tutorials" },
  { href: "/discord", label: "Discord" },
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
          ? "border-slate-200/80 bg-white/88 shadow-[0_10px_32px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
          : "border-transparent bg-white/72 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-xl px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          title="Created by Mohan Prasath"
          aria-label="ModelOpt home"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-200">
            <Sparkles className="size-4" />
          </span>
          <span className="font-semibold tracking-[-0.02em] text-slate-900">ModelOpt</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = isItemActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[0.92rem] font-medium tracking-[-0.01em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  isActive
                    ? "bg-blue-50 text-slate-900 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]"
                    : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-[0_6px_18px_rgba(15,23,42,0.08)]"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {item.badge ? (
                  <Badge className="border-blue-200 bg-blue-50 px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wide text-blue-700">
                    {item.badge}
                  </Badge>
                ) : null}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-blue-500/80"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/app" aria-label="Get started with optimizer">
            <Button className="h-10 rounded-xl bg-blue-600 px-5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_14px_30px_rgba(37,99,235,0.34)]">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
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
                    className="fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-[2px] lg:hidden"
                    onClick={() => setOpen(false)}
                    aria-label="Close navigation menu"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed inset-x-0 bottom-0 top-[4.5rem] z-[70] overflow-y-auto border-t border-slate-200 bg-[#f8fbff]/95 px-4 py-5 backdrop-blur-2xl lg:hidden"
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
                              "flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200",
                              isActive
                                ? "bg-blue-50 text-slate-900 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]"
                                : "text-slate-600 hover:bg-white hover:text-slate-900"
                            )}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span className="flex items-center gap-2">
                              {item.label}
                              {item.badge ? (
                                <Badge className="border-blue-200 bg-blue-50 px-1.5 py-0 text-[9px] uppercase tracking-wide text-blue-700">
                                  {item.badge}
                                </Badge>
                              ) : null}
                            </span>
                          </Link>
                        )
                      })}
                      <div className="mt-4 border-t border-slate-200 pt-4">
                        <Link href="/app" className="block" onClick={() => setOpen(false)}>
                          <Button className="h-10 w-full rounded-xl bg-blue-600 text-white hover:bg-blue-500">
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
