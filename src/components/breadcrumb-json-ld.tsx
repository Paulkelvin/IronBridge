'use client'

import { usePathname } from "next/navigation"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

const pageNames: Record<string, string> = {
  "/services": "Services",
  "/medical-courier": "Medical Courier",
  "/commercial-logistics": "Commercial Logistics",
  "/dedicated-routes": "Dedicated Routes",
  "/bulk-item-removal": "Bulk-Item Removal",
  "/capability-statement": "Capability Statement",
  "/about": "About",
  "/service-area": "Service Area",
  "/compliance-safety": "Compliance & Safety",
  "/become-a-driver": "Become a Driver",
  "/request-a-quote": "Request a Quote",
  "/privacy-policy": "Privacy Policy",
  "/accessibility": "Accessibility",
}

const servicePages = new Set(["/medical-courier", "/commercial-logistics", "/dedicated-routes", "/bulk-item-removal"])

export default function BreadcrumbJsonLd() {
  const pathname = usePathname()
  const name = pageNames[pathname]
  if (!name) return null

  const trail = [
    { name: "Home", path: "" },
    ...(servicePages.has(pathname) ? [{ name: "Services", path: "/services" }] : []),
    { name, path: pathname },
  ]

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
