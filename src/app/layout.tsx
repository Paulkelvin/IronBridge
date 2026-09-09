import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/lenis";

const sans = Inter({
  variable: "--font-ib-sans",
  subsets: ["latin"],
});

const serif = Playfair_Display({
  variable: "--font-ib-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iron Bridge Mobility Solutions | Dependability Delivered Daily.",
  description:
    "Professional medical courier and commercial logistics solutions throughout Maryland, Washington DC, Northern Virginia and surrounding areas.",
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
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
