import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import LenisProvider from "@/providers/lenis";
import ScrollRestoration from "@/components/scroll-restoration";
import MobileCtaBar from "@/components/mobile-cta-bar";

const sans = Inter({
  variable: "--font-ib-sans",
  subsets: ["latin"],
});

const serif = Playfair_Display({
  variable: "--font-ib-serif",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
const title = "Iron Bridge Mobility Solutions | Dependability Delivered Daily."
const description =
  "Professional medical courier and commercial logistics solutions throughout Maryland, Washington DC, Northern Virginia and surrounding areas."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Iron Bridge Mobility Solutions",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Iron Bridge Mobility Solutions: Medical Courier & Commercial Logistics" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: "Iron Bridge Mobility Solutions",
  description,
  url: siteUrl,
  logo: `${siteUrl}/brand/shield-mark.png`,
  image: `${siteUrl}/og-image.png`,
  telephone: "+13018181929",
  email: "lbrent@ironbridgems.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "12530 Fairwood Parkway, Ste 102 #568",
    addressLocality: "Bowie",
    addressRegion: "MD",
    postalCode: "20720",
    addressCountry: "US",
  },
  areaServed: ["Maryland", "Washington, DC", "Northern Virginia"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: [
    "https://www.facebook.com/share/19ZmJDHUMG/",
    "https://www.instagram.com/iron_bridge_mobility",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${serif.variable} ${sans.className} antialiased w-full min-h-screen overflow-x-hidden`}
      >
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <ScrollRestoration />
        <LenisProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="pt-[72px] pb-14 md:pb-0 outline-none">{children}</main>
        </LenisProvider>
        <MobileCtaBar />
      </body>
    </html>
  );
}
