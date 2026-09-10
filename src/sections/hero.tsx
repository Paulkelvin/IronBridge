'use client'

import Navbar from "@/components/navbar";
import SlideEffect from "@/components/slide-effect";
import TextBlurEffect from "@/components/text-blur-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileCheck, PackageCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";

const settings = {
  region: 'Maryland · Washington, DC · Northern Virginia',
  headlineTop: 'Dependability',
  headlineBottom: 'Delivered Daily.',
  descriptor: 'Medical Courier & Commercial Logistics',
  subheadline: 'Reliable service, secure handling, and responsive coverage across Maryland, Washington DC, and Northern Virginia.',
  mainCTA: {
    content: 'Request a Quote',
    href: '/request-a-quote'
  },
  secondaryCTA: {
    content: 'Become a Driver',
    href: '/become-a-driver'
  },
  trustPoints: [
    { icon: ShieldCheck, label: 'HIPAA & BBP Trained Personnel' },
    { icon: PackageCheck, label: 'Chain-of-Custody Handling' },
    { icon: FileCheck, label: 'Proof of Delivery' },
  ]
}

export default function Hero() {
  return (
    <div className="space-y-10 md:space-y-16 lg:space-y-20 z-50 relative">
      <Navbar />

      <section className="relative flex flex-col gap-6 lg:gap-8 items-center text-center overflow-hidden pt-6 pb-10 md:pb-16">
        {/* Region indicator */}
        <SlideEffect>
          <span className="inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-[11px] md:text-xs font-medium tracking-[0.1em] md:tracking-[0.14em] text-navy uppercase whitespace-nowrap">
            <span className="sm:hidden">MD · DC · Northern VA</span>
            <span className="hidden sm:inline">{settings.region}</span>
          </span>
        </SlideEffect>

        {/* Headline + descriptor (tight to each other) */}
        <div className="space-y-1.5 md:space-y-2">
          <h1 className="font-serif text-navy text-4xl md:text-6xl lg:text-hero font-semibold tracking-tight leading-[0.98] xl:max-w-4xl">
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
          className="text-sm lg:text-lg px-6 sm:px-10 md:px-0 md:max-w-2xl mx-auto text-foreground"
        >
          {settings.subheadline}
        </SlideEffect>

        {/* CTA */}
        <SlideEffect
          delay={0.2}
          className="flex flex-col gap-8 md:gap-6 items-center justify-center w-full md:w-fit"
        >
          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center w-full justify-center gap-3 md:gap-4 mt-1">
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
          </div>

          {/* Trust points */}
          <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-6 justify-center items-center">
            {settings.trustPoints.map((point) => (
              <div key={point.label} className="flex items-center gap-2 text-xs md:text-sm text-foreground">
                <point.icon size={16} strokeWidth={1.5} className="text-teal shrink-0" />
                <span>{point.label}</span>
              </div>
            ))}
          </div>
        </SlideEffect>
      </section>
    </div>
  )
}
