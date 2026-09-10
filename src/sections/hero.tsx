'use client'

import RouteLine from "@/components/graphics/route-line";
import SlideEffect from "@/components/slide-effect";
import TextBlurEffect from "@/components/text-blur-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const settings = {
  region: 'Maryland · Washington, DC · Northern Virginia',
  headlineTop: 'Dependability',
  headlineBottom: 'Delivered Daily.',
  descriptor: 'Medical Courier & Commercial Logistics',
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
    <div className="space-y-10 md:space-y-16 lg:space-y-20">
      <div className="relative">
        {/* Decorative background — breaks out to the full viewport width, not just this column */}
        <div
          className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 -z-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(70% 90% at 90% 0%, rgba(18,130,98,0.08) 0%, transparent 65%), radial-gradient(70% 90% at 5% 100%, rgba(27,42,74,0.06) 0%, transparent 65%)',
          }}
        >
          <RouteLine className="absolute inset-x-0 top-1/4 w-full h-[200px] md:h-[300px] text-navy/[0.07]" />
        </div>

        <section className="relative overflow-hidden pt-10 pb-10 md:pt-16 md:pb-16 lg:pt-20 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center xl:px-6">
            {/* Left: text content */}
            <div className="flex flex-col gap-6 lg:gap-8 items-center lg:items-start text-center lg:text-left">
              {/* Region indicator */}
              <SlideEffect>
                <span className="inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-[11px] md:text-xs font-medium tracking-[0.1em] md:tracking-[0.14em] text-navy uppercase whitespace-nowrap">
                  <span className="sm:hidden">MD · DC · Northern VA</span>
                  <span className="hidden sm:inline">{settings.region}</span>
                </span>
              </SlideEffect>

              {/* Headline + descriptor (tight to each other) */}
              <div className="space-y-1.5 md:space-y-2">
                <h1 className="font-serif text-navy text-4xl md:text-6xl lg:text-hero font-semibold tracking-tight leading-[0.98]">
                  <span className="block"><TextBlurEffect>{settings.headlineTop}</TextBlurEffect></span>
                  <span className="block"><TextBlurEffect>{settings.headlineBottom}</TextBlurEffect></span>
                </h1>

                <SlideEffect delay={0.1}>
                  <p className="text-lg md:text-2xl lg:text-3xl font-semibold text-teal tracking-tight">
                    {settings.descriptor}
                  </p>
                </SlideEffect>
              </div>

              {/* Sub-headline */}
              <SlideEffect
                delay={0.15}
                className="text-sm lg:text-lg px-6 sm:px-10 md:px-0 max-w-2xl mx-auto lg:max-w-none lg:mx-0 text-foreground"
              >
                {settings.subheadline}
              </SlideEffect>

              {/* CTA */}
              <SlideEffect
                delay={0.2}
                className="flex flex-col md:flex-row items-center w-full md:w-fit justify-center lg:justify-start gap-3 md:gap-4 mt-1"
              >
                <Link href={settings.mainCTA.href} className="w-full">
                  <Button size='lg' className="w-full hidden lg:flex">
                    {settings.mainCTA.content}
                    <ArrowRight strokeWidth={1.5} />
                  </Button>

                  <Button size='default' className="w-full flex lg:hidden">
                    {settings.mainCTA.content}
                    <ArrowRight strokeWidth={1.5} />
                  </Button>
                </Link>

                <Link href={settings.secondaryCTA.href} className="w-full">
                  <Button size='lg' className="w-full hidden lg:flex" variant='outline'>
                    {settings.secondaryCTA.content}
                  </Button>

                  <Button size='default' className="w-full flex lg:hidden" variant='outline'>
                    {settings.secondaryCTA.content}
                  </Button>
                </Link>
              </SlideEffect>
            </div>

            {/* Right: image */}
            <SlideEffect
              direction="left"
              isSpring={false}
              className="relative w-full max-w-sm mx-auto lg:max-w-lg aspect-[1000/784]"
            >
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
      </div>
    </div>
  )
}
