import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  title: "Docs - Model Comparison",
  description: "Compare supported models by VRAM, size, context window, and use-case fit.",
  alternates: {
    canonical: `${siteUrl}/docs/model-comparison`,
  },
  openGraph: {
    title: "ModelOpt Model Comparison",
    description: "Compare supported models by VRAM, size, context window, and use-case fit.",
    url: `${siteUrl}/docs/model-comparison`,
    type: "article",
  },
}

export default function ModelComparisonLayout({ children }: { children: React.ReactNode }) {
  return children
}
