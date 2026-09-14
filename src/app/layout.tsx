import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import LenisProvider from "@/providers/lenis";
import ScrollRestoration from "@/components/scroll-restoration";

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
  robots: {
    index: true,
    follow: true,
  },
};

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
        <ScrollRestoration />
        <LenisProvider>
          <Header />
          <div className="pt-[72px]">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
