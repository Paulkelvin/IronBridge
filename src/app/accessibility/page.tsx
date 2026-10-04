import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"
import CTA from "@/sections/cta"
import Footer from "@/sections/footer"
import PageHeader from "@/components/page-header"
import SlideEffect from "@/components/slide-effect"

export const metadata: Metadata = pageMetadata({
  title: "Accessibility Statement | Iron Bridge Mobility Solutions",
  description: "Iron Bridge Mobility Solutions aims to make this website usable for everyone and to meet WCAG 2.1 Level AA. Here's what we do and how to reach us.",
  path: "/accessibility",
})

const sections = [
  {
    title: "Our Commitment",
    body: [
      "We want everyone, including people who use screen readers, keyboard navigation, magnification, or other assistive technology, to be able to learn about our services, request a quote, and apply to drive with us.",
      "Our goal is to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.",
    ],
  },
  {
    title: "What We've Done",
    body: [
      "Every page can be used with a keyboard, shows a visible focus outline, and offers a \"Skip to main content\" link. Pages use a clear heading structure and page landmarks so screen-reader users can move around quickly.",
      "Form fields have labels, errors are announced and explained in plain language, and focus moves to the first field that needs attention. Text and background colors are chosen to meet contrast guidelines, images have text alternatives, and animations switch off when your device asks for reduced motion.",
      "Our capability statement PDF is tagged so screen readers can read it in order.",
    ],
  },
  {
    title: "Known Limitations",
    body: [
      "The interactive service-area map is visual. The same information, every region and city we serve, is listed as text beside the map and on our Service Area page.",
      "Address suggestions on the quote form come from Google and may not work perfectly with every assistive technology. You can always type your address directly into the street, city, state, and ZIP fields.",
    ],
  },
  {
    title: "How We Check",
    body: [
      "We test the site with automated accessibility tools and by navigating with a keyboard at phone, tablet, and desktop sizes. We review accessibility again whenever we make significant changes.",
    ],
  },
]

export default function AccessibilityPage() {
  return (
    <div className="px-4 xl:px-6 max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40 scroll-smooth">
      <PageHeader
        eyebrow="Accessibility"
        title="Accessibility Statement"
        description="Our commitment to making this website usable for everyone."
      />

      <div className="max-w-3xl mx-auto w-full space-y-10 md:space-y-12">
        <SlideEffect isSpring={false}>
          <p className="text-sm text-foreground/80">Last reviewed: October 4, 2026</p>
        </SlideEffect>

        {sections.map((section, i) => (
          <SlideEffect key={section.title} direction="top" delay={0.04 * i} isSpring={false} className="space-y-3">
            <h2 className="font-serif text-navy text-lg md:text-xl font-semibold">{section.title}</h2>
            {section.body.map((p, j) => (
              <p key={j} className="text-sm md:text-base text-foreground/80 leading-relaxed">{p}</p>
            ))}
          </SlideEffect>
        ))}

        <SlideEffect isSpring={false} className="space-y-3">
          <h2 className="font-serif text-navy text-lg md:text-xl font-semibold">Need Help or Found a Problem?</h2>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
            If anything on this site is hard to use, or you&apos;d like information in another format, contact us at{" "}
            <a href="mailto:lbrent@ironbridgems.com" className="text-navy underline underline-offset-2 hover:text-teal transition-colors">
              lbrent@ironbridgems.com
            </a>{" "}
            or{" "}
            <a href="tel:+13018181929" className="text-navy underline underline-offset-2 hover:text-teal transition-colors">
              (301) 818-1929
            </a>
            . Tell us the page and what went wrong, and we&apos;ll help you directly, including taking a quote request or driver application by phone.
          </p>
        </SlideEffect>
      </div>

      <CTA />
      <Footer />
    </div>
  )
}
