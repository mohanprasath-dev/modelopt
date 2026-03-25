"use client"

import { useEffect } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16 text-slate-100">
      <section className="w-full max-w-xl rounded-2xl border border-red-500/30 bg-slate-900/80 p-8 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-slate-300">
          We hit an unexpected error. You can retry, return home, or open the optimizer.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} className="bg-blue-500 text-white hover:bg-blue-400">
            Retry
          </Button>
          <Link href="/">
            <Button variant="outline">Home</Button>
          </Link>
          <Link href="/app">
            <Button variant="outline">Optimizer</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
