"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const labelMap: Record<string, string> = {
  app: "Optimizer",
  results: "Results",
  docs: "Docs",
  pricing: "Pricing",
  about: "About",
  blog: "Blog",
  privacy: "Privacy",
  terms: "Terms",
  cookies: "Cookies",
  contact: "Contact",
  changelog: "Changelog",
}

export function Breadcrumb() {
  const pathname = usePathname()
  const parts = pathname.split("/").filter(Boolean)

  const shouldShow = pathname.startsWith("/app") || pathname.startsWith("/results") || pathname.startsWith("/docs")

  if (!shouldShow) {
    return null
  }

  const crumbs = [
    { href: "/", label: "Home" },
    ...parts.map((part, index) => ({
      href: `/${parts.slice(0, index + 1).join("/")}`,
      label: labelMap[part] ?? part,
    })),
  ]

  return (
    <nav className="mx-auto w-full max-w-7xl px-4 py-3 text-sm text-slate-400 sm:px-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, index) => {
          const isCurrent = index === crumbs.length - 1
          return (
            <li key={crumb.href} className="inline-flex items-center gap-2">
              {isCurrent ? (
                <span className="text-slate-200">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-slate-100">
                  {crumb.label}
                </Link>
              )}
              {!isCurrent ? <span aria-hidden="true">&gt;</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
