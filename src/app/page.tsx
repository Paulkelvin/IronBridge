import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import Credentials from "@/sections/credentials";
import CTA from "@/sections/cta";
import FAQ from "@/sections/faq";
import Features1 from "@/sections/features-1";
import Features2 from "@/sections/features-2";
import Features3 from "@/sections/features-3";
import Features4 from "@/sections/features-4";
import Footer from "@/sections/footer";
import Gallery from "@/sections/gallery";
import Hero from "@/sections/hero";
import Testimonials from "@/sections/testimonials";

export const metadata: Metadata = pageMetadata({
  title: "Medical Courier & Same-Day Delivery in MD, DC & VA | Iron Bridge",
  description: "Medical courier, same-day delivery, and dedicated routes across Maryland, Washington DC, and Northern Virginia. Request a quote or call (301) 818-1929.",
  path: "/",
})

export default function HomePage() {
  return (
    <div className="px-4 xl:px-6 max-w-7xl mx-auto space-y-16 sm:space-y-32 md:space-y-40 scroll-smooth">
      <Hero />
      <Features1 />
      <Features4 />
      <Features2 />
      <Credentials />
      <Features3 />
      <Gallery />
      <Testimonials />
      <CTA />
      <FAQ />
      <Footer />
    </div>
  )
}
