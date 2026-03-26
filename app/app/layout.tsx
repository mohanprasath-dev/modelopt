import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://modelopt.mohanprasath.dev"

export const metadata: Metadata = {
  title: "Optimizer Dashboard",
  description: "Configure hardware, save drafts, and generate ModelOpt recommendations.",
  alternates: {
    canonical: `${siteUrl}/app`,
  },
  openGraph: {
    title: "ModelOpt Optimizer Dashboard",
    description: "Configure hardware, save drafts, and generate ModelOpt recommendations.",
    url: `${siteUrl}/app`,
    type: "website",
  },
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return children
}
