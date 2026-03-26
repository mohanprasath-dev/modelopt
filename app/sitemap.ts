import type { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://modelopt.mohanprasath.dev"

type RouteDef = {
  path: string
  changeFrequency: "daily" | "weekly" | "monthly"
  priority: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes: RouteDef[] = [
    { path: "", changeFrequency: "daily", priority: 1 },
    { path: "/app", changeFrequency: "weekly", priority: 0.95 },
    { path: "/about", changeFrequency: "monthly", priority: 0.65 },
    { path: "/docs", changeFrequency: "weekly", priority: 0.85 },
    { path: "/docs/getting-started", changeFrequency: "weekly", priority: 0.8 },
    { path: "/docs/model-comparison", changeFrequency: "weekly", priority: 0.8 },
    { path: "/pricing", changeFrequency: "weekly", priority: 0.75 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/blog/how-to-choose-right-model", changeFrequency: "monthly", priority: 0.72 },
    { path: "/blog/vram-vs-ram", changeFrequency: "monthly", priority: 0.72 },
    { path: "/blog/quantization-explained", changeFrequency: "monthly", priority: 0.72 },
    { path: "/privacy", changeFrequency: "monthly", priority: 0.4 },
    { path: "/terms", changeFrequency: "monthly", priority: 0.4 },
    { path: "/cookies", changeFrequency: "monthly", priority: 0.4 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "/changelog", changeFrequency: "weekly", priority: 0.55 },
    { path: "/compare", changeFrequency: "weekly", priority: 0.78 },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
