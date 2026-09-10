import type { MetadataRoute } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

const routes = [
  "",
  "/services",
  "/medical-courier",
  "/commercial-logistics",
  "/dedicated-routes",
  "/about",
  "/service-area",
  "/compliance-safety",
  "/become-a-driver",
  "/request-a-quote",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
