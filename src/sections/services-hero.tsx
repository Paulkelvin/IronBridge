'use client'

import CurvedArrow from "@/components/graphics/curved-arrow"
import DotGrid from "@/components/graphics/dot-grid"
import HexDot from "@/components/graphics/hex-dot"
import SlideEffect from "@/components/slide-effect"
import TextBlurEffect from "@/components/text-blur-effect"
import { Truck } from "lucide-react"
import Link from "next/link"

export default function ServicesHero() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-navy rounded-bl-[70px] md:rounded-bl-[140px]">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
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
      <HexDot className="hidden md:block absolute top-16 left-[42%] h-8 w-8 text-teal-light/50" aria-hidden="true" />
      <span className="hidden md:block absolute bottom-24 left-[8%] h-2 w-2 rounded-full bg-white/40" aria-hidden="true" />
      <span className="hidden md:block absolute top-28 right-[6%] h-10 w-10 rounded-full border border-white/15" aria-hidden="true" />
      <CurvedArrow className="hidden lg:block absolute bottom-10 right-[38%] h-16 w-16 text-white/25" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-4 xl:px-0 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: text */}
        <SlideEffect direction="right" isSpring={false} className="text-left space-y-4">
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

        {/* Right: cutout image with accent block behind it */}
        <SlideEffect direction="left" isSpring={false} className="relative flex justify-center md:justify-end">
          <div className="absolute right-2 md:right-6 bottom-0 h-56 w-44 md:h-72 md:w-56 rounded-2xl bg-teal/80" aria-hidden="true" />
          <div className="relative h-64 md:h-80 w-52 md:w-64 rounded-2xl overflow-hidden">
            {/*
              Swap this placeholder for the generated courier cutout once ready:
              <Image src="/brand/services-hero-courier.png" alt="" fill className="object-contain object-bottom" />
            */}
            <div className="h-full w-full flex items-center justify-center bg-navy-light/40 border border-white/10 rounded-2xl">
              <Truck size={64} strokeWidth={1} className="text-white/30" />
            </div>
          </div>
        </SlideEffect>
      </div>
    </section>
  )
}
