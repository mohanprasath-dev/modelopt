import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://modelopt.mohanprasath.dev"

export const metadata: Metadata = {
  title: "Optimization Results",
  description: "Review recommendations, compare models, and share URL-synced result states.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${siteUrl}/results`,
  },
  openGraph: {
    title: "ModelOpt Results",
    description: "Review recommendations, compare models, and share URL-synced result states.",
    url: `${siteUrl}/results`,
    type: "website",
  },
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children
}
