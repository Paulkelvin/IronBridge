'use client'

import CurvedArrow from "@/components/graphics/curved-arrow"
import DotGrid from "@/components/graphics/dot-grid"
import HexDot from "@/components/graphics/hex-dot"
import SlideEffect from "@/components/slide-effect"
import TextBlurEffect from "@/components/text-blur-effect"
import Image from "next/image"
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

      <div className="relative mx-auto max-w-5xl px-4 xl:px-0 pt-16 pb-40 md:pt-24 md:pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: text */}
        <SlideEffect direction="right" isSpring={false} className="text-left space-y-4 md:pt-6">
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

        {/* Right: cropped cutout, sitting inside a colored panel, breaking past the hero's bottom edge */}
        <SlideEffect direction="left" isSpring={false} className="relative flex justify-center md:justify-end items-start md:h-[280px]">
          {/* Small accents clustered around the figure's head/shoulders */}
          <HexDot className="hidden md:block absolute -top-8 right-10 h-8 w-8 text-teal-light/50" aria-hidden="true" />
          <span className="hidden md:block absolute top-4 right-0 h-2 w-2 rounded-full bg-white/50" aria-hidden="true" />
          <span className="hidden md:block absolute top-16 -right-8 h-9 w-9 rounded-full border border-white/15" aria-hidden="true" />
          <CurvedArrow className="hidden lg:block absolute -top-4 left-2 h-16 w-16 text-white/25 -scale-x-100" aria-hidden="true" />

          <div className="relative h-[300px] w-[184px] md:h-[440px] md:w-[270px]">
            {/* Colored panel the figure sits inside — offset down-right so it peeks past his edges */}
            <div className="absolute -right-4 top-16 md:-right-6 md:top-24 h-[190px] w-[145px] md:h-[300px] md:w-[210px] rounded-2xl bg-teal/75 -z-10" aria-hidden="true" />
            <Image
              src="/brand/services-hero-courier.png"
              alt="Iron Bridge courier"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </SlideEffect>
      </div>
    </section>
  )
}
