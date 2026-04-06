import Link from "next/link"

import { Button } from "@/components/ui/button"

interface UpgradeSuggestionProps {
  suggestion: string
}

export function UpgradeSuggestion({ suggestion }: UpgradeSuggestionProps) {
  return (
    <section className="rounded-2xl border border-blue-200 bg-blue-50/70 p-6 shadow-[0_10px_26px_rgba(37,99,235,0.12)]">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">
          🚀
        </span>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Recommended Upgrade</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{suggestion}</p>
          <div className="mt-4">
            <Link
              href="https://www.techpowerup.com/gpu-specs/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View external GPU options"
            >
              <Button className="bg-blue-600 text-white hover:bg-blue-500">View GPU Options</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
