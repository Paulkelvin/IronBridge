import type { Metadata } from "next"

const siteName = "Iron Bridge Mobility Solutions"
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Iron Bridge Mobility Solutions: Medical Courier & Commercial Logistics",
}

// Builds a page's full metadata object, including a self-referencing
// canonical URL and matching Open Graph url, both resolved against the
// root layout's metadataBase — so every page declares its own canonical
// www URL instead of inheriting the homepage's.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: "en_US",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  }
}
