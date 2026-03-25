import { Toaster } from "sonner"

import { OptimizationForm } from "@/components/OptimizationForm"

export default function AppDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100 sm:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <p className="text-sm font-medium text-blue-300">Step 1 of 1</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Optimization Dashboard</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-400">
          Enter your hardware and preferences to get ranked model recommendations.
        </p>

        <div className="mt-8">
          <OptimizationForm />
        </div>
      </div>

      <Toaster richColors theme="dark" position="top-right" />
    </main>
  )
}
