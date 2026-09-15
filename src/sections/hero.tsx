'use client'

import SlideEffect from "@/components/slide-effect";
import { Button } from "@/components/ui/button";
import { useLenis } from "lenis/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const settings = {
  region: 'Maryland · Washington, DC · Northern Virginia',
  headlineTop: 'Medical Courier',
  headlineBottom: '& Commercial Logistics',
  descriptor: 'Dependability Delivered Daily.',
  subheadline: 'Reliable service, secure handling, and responsive coverage you can count on.',
  mainCTA: {
    content: 'Request a Quote',
    href: '/request-a-quote'
  },
  secondaryCTA: {
    content: 'Become a Driver',
    href: '/become-a-driver'
  },
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  const scrollToNext = () => {
    const el = heroRef.current
    if (!el) return
    // Header height (72px) is fixed/overlaying, so subtract it from the
    // hero's document-relative bottom to land the next section right below it.
    const target = el.getBoundingClientRect().bottom + window.scrollY - 72
    if (lenis) lenis.scrollTo(target, { duration: 1.2 })
    else window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <div
      ref={heroRef}
      className="relative left-1/2 w-screen -translate-x-1/2 lg:min-h-[calc(100vh-72px)] lg:flex lg:flex-col"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/brand/services-hero-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
      </div>

      {/* Overlay: navy gradient for text readability */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(to right, rgba(16,26,48,0.92) 0%, rgba(16,26,48,0.82) 45%, rgba(16,26,48,0.55) 100%)',
        }}
      />

      <section className="relative overflow-hidden px-4 xl:px-6 max-w-7xl mx-auto pt-12 pb-24 md:pt-20 md:pb-32 lg:py-16 lg:flex-1 lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center xl:px-6 w-full">
          {/* Left: text content */}
          <div className="flex flex-col gap-6 lg:gap-8 items-center lg:items-start text-center lg:text-left">
            <SlideEffect>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-[11px] md:text-xs font-medium tracking-[0.1em] md:tracking-[0.14em] text-white/90 uppercase whitespace-nowrap">
                <span className="sm:hidden">MD · DC · Northern VA</span>
                <span className="hidden sm:inline">{settings.region}</span>
              </span>
            </SlideEffect>

            <div className="space-y-1.5 md:space-y-2">
              <h1 className="font-serif text-white text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-[0.98]">
                <span className="block">{settings.headlineTop}</span>
                <span className="block">{settings.headlineBottom}</span>
              </h1>

              <SlideEffect delay={0.1}>
                <p className="text-lg md:text-2xl lg:text-3xl font-semibold text-teal-light tracking-tight">
                  {settings.descriptor}
                </p>
              </SlideEffect>
            </div>

            <SlideEffect
              delay={0.15}
              className="text-sm lg:text-lg px-6 sm:px-10 md:px-0 max-w-2xl mx-auto lg:max-w-none lg:mx-0 text-white/80"
            >
              {settings.subheadline}
            </SlideEffect>

            <SlideEffect
              delay={0.2}
              className="flex flex-col md:flex-row items-center w-full md:w-fit justify-center lg:justify-start gap-3 md:gap-4 mt-1"
            >
              <Link href={settings.mainCTA.href} className="w-full">
                <Button size='lg' className="w-full hidden lg:flex bg-teal hover:bg-teal-light text-white">
                  {settings.mainCTA.content}
                  <ArrowRight strokeWidth={1.5} />
                </Button>
                <Button size='default' className="w-full flex lg:hidden bg-teal hover:bg-teal-light text-white">
                  {settings.mainCTA.content}
                  <ArrowRight strokeWidth={1.5} />
                </Button>
              </Link>

              <Link href={settings.secondaryCTA.href} className="w-full">
                <Button size='lg' className="w-full hidden lg:flex border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white/50" variant='outline'>
                  {settings.secondaryCTA.content}
                </Button>
                <Button size='default' className="w-full flex lg:hidden border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white hover:border-white/50" variant='outline'>
                  {settings.secondaryCTA.content}
                </Button>
              </Link>
            </SlideEffect>
          </div>

          {/* Right: illustration */}
          <SlideEffect
            direction="left"
            isSpring={false}
            className="relative w-full max-w-[22rem] mx-auto lg:max-w-[38rem] xl:max-w-[44rem] aspect-[784/735]"
          >
            {/* Soft light glow so the white van reads clearly against the dark background */}
            <div
              className="absolute -inset-[4%] -z-10 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.12) 55%, transparent 75%)' }}
              aria-hidden="true"
            />
            <Image
              src="/brand/hero-van-courier.png"
              alt="Iron Bridge delivery courier and van"
              fill
              className="object-contain"
              priority
            />
          </SlideEffect>
        </div>
      </section>

      <button
        type="button"
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-white/60 hover:text-white/90 transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-medium tracking-[0.14em] uppercase">Scroll</span>
        <ChevronDown size={18} strokeWidth={1.5} className="animate-bounce" aria-hidden="true" />
      </button>
    </div>
  )
}
