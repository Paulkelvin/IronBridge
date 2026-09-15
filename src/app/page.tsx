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
