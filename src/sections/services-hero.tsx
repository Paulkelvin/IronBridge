'use client'

import CurvedArrow from "@/components/graphics/curved-arrow"
import DotGrid from "@/components/graphics/dot-grid"
import HexDot from "@/components/graphics/hex-dot"
import SlideEffect from "@/components/slide-effect"
import TextBlurEffect from "@/components/text-blur-effect"
import Link from "next/link"

export default function ServicesHero() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2">
      {/* Dark background panel — clipped to the curved shape, but nothing else in this section is */}
      <div
        className="absolute inset-0 -z-20 overflow-hidden rounded-bl-[70px] md:rounded-bl-[140px] bg-navy pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/brand/services-hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/80" />
        <DotGrid id="services-hero-dot-grid" className="absolute inset-0 h-full w-full text-white/[0.05]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(50% 90% at 100% 0%, rgba(61,166,132,0.22) 0%, transparent 65%), radial-gradient(50% 90% at 0% 100%, rgba(18,130,98,0.12) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* Small scattered accents */}
      <HexDot className="hidden md:block absolute top-14 right-[18%] h-8 w-8 text-teal-light/50" aria-hidden="true" />
      <span className="hidden md:block absolute bottom-16 left-[8%] h-2 w-2 rounded-full bg-white/40" aria-hidden="true" />
      <span className="hidden md:block absolute top-20 right-[6%] h-9 w-9 rounded-full border border-white/15" aria-hidden="true" />
      <CurvedArrow className="hidden lg:block absolute bottom-12 right-[30%] h-16 w-16 text-white/25" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 xl:px-0 py-12 md:py-24">
        <SlideEffect direction="right" isSpring={false} className="text-left space-y-4 max-w-xl">
          <p className="text-xs md:text-sm text-white/55">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-teal-light font-medium">Services</span>
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]">
            <TextBlurEffect>Services</TextBlurEffect>
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-md">
            Iron Bridge supports healthcare organizations and commercial businesses with professionally handled transportation throughout Maryland, Washington DC, and Northern Virginia.
          </p>
        </SlideEffect>
      </div>
    </section>
  )
}
