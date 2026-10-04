const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export default function ServiceJsonLd({
  name,
  serviceType,
  description,
  path,
}: {
  name: string
  serviceType: string
  description: string
  path: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${siteUrl}${path}`,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: [
      { "@type": "State", name: "Maryland" },
      { "@type": "City", name: "Washington, DC" },
      { "@type": "AdministrativeArea", name: "Northern Virginia" },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
