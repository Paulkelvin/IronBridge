'use client'

import SlideEffect from "@/components/slide-effect";
import TextBlurEffect from "@/components/text-blur-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
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

      <section className="relative overflow-hidden px-4 xl:px-0 max-w-7xl mx-auto pt-12 pb-24 md:pt-20 md:pb-32 lg:pt-24 lg:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center xl:px-6">
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
                <span className="block"><TextBlurEffect>{settings.headlineTop}</TextBlurEffect></span>
                <span className="block"><TextBlurEffect>{settings.headlineBottom}</TextBlurEffect></span>
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
            className="relative w-full max-w-[22rem] mx-auto lg:max-w-[30rem] aspect-[1000/784]"
          >
            <Image
              src="/brand/hero-van-courier.png"
              alt="Iron Bridge delivery courier and van"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </SlideEffect>
        </div>
      </section>
    </div>
  )
}
