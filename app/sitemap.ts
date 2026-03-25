import type { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/app",
    "/results",
    "/about",
    "/docs",
    "/docs/getting-started",
    "/docs/model-comparison",
    "/pricing",
    "/blog",
    "/blog/how-to-choose-right-model",
    "/blog/vram-vs-ram",
    "/blog/quantization-explained",
    "/privacy",
    "/terms",
    "/cookies",
    "/contact",
    "/changelog",
    "/compare",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }))
}
