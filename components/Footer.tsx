import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-slate-800/90 px-8 py-10" aria-label="Site footer">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 text-sm text-slate-400 sm:flex-row sm:items-center">
        <p>Built by Mohan Prasath</p>
        <div className="flex items-center gap-5">
          <Link
            href="https://github.com/mohanprasath-dev/modelopt"
            className="underline-offset-4 transition-colors hover:text-slate-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open ModelOpt GitHub repository"
          >
            GitHub
          </Link>
          <p>Powered by Gemini AI + Ollama</p>
        </div>
      </div>
    </footer>
  )
}
