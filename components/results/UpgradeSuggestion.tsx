import Link from "next/link"

import { Button } from "@/components/ui/button"

interface UpgradeSuggestionProps {
  suggestion: string
}

export function UpgradeSuggestion({ suggestion }: UpgradeSuggestionProps) {
  return (
    <section className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">
          🚀
        </span>
        <div>
          <h2 className="text-xl font-semibold text-slate-100">Recommended Upgrade</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{suggestion}</p>
          <div className="mt-4">
            <Link
              href="https://www.techpowerup.com/gpu-specs/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View external GPU options"
            >
              <Button className="bg-blue-500 text-white hover:bg-blue-400">View GPU Options</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
