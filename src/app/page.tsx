import CTA from "@/sections/cta";
import FAQ from "@/sections/faq";
import Features1 from "@/sections/features-1";
import Features2 from "@/sections/features-2";
import Features3 from "@/sections/features-3";
import Features4 from "@/sections/features-4";
import Footer from "@/sections/footer";
import Hero from "@/sections/hero";
import PageThreadLine from "@/components/graphics/page-thread-line";

export default function HomePage() {
  return (
    <div className="px-4 xl:px-0 max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40 lg:space-y-56 scroll-smooth">
      <Hero />

      <div className="relative">
        <PageThreadLine className="hidden 2xl:block absolute inset-y-0 left-[calc(50%-680px)] w-24 h-full text-navy/[0.06] pointer-events-none -z-10" aria-hidden="true" />

        <div className="space-y-24 sm:space-y-32 md:space-y-40 lg:space-y-56">
          <Features1 />
          <Features4 />
          <Features2 />
          <Features3 />
          <CTA />
          <FAQ />
        </div>
      </div>

      <Footer />
    </div>
  )
}
