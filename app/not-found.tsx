import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100/70 px-6 py-16 text-slate-900">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white/95 p-8 text-center shadow-[0_16px_48px_rgba(15,23,42,0.08)]">
        <p className="text-sm text-slate-500">404</p>
        <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-slate-600">
          The page you requested does not exist or may have been moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button className="bg-blue-500 text-white hover:bg-blue-400">Go Home</Button>
          </Link>
          <Link href="/app">
            <Button variant="outline">Open Optimizer</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
