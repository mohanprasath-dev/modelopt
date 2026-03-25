import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function ResultsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <section className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-2xl">
        <h1 className="text-3xl font-bold">Results Ready</h1>
        <p className="mt-3 text-slate-400">
          Your optimization request was submitted successfully. Connect this page to your
          model ranking output next.
        </p>
        <div className="mt-6">
          <Link href="/app" aria-label="Go back to optimization dashboard">
            <Button className="bg-blue-500 text-white hover:bg-blue-400">Back to Dashboard</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
