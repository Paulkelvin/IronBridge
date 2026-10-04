'use client'

import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqAnswerText, faqs } from "@/content/site-facts"

const settings = {
  eyebrow: 'Questions',
  title: 'Frequently Asked Questions',
  faqs,
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: settings.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faqAnswerText(faq.answer),
    },
  })),
}

export default function FAQ() {
  return (
    <div id='faq' className="space-y-8 md:space-y-10 lg:space-y-12 mx-auto text-center">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} />

      {/* Accordion */}
      <SlideEffect>
        <Accordion type="single" collapsible className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 text-base text-navy text-left">
          {settings.faqs.map((faq, index) => (
            <AccordionItem key={index} value={index + '-item'}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent forceMount className="text-foreground">
                {typeof faq.answer === 'string' ? faq.answer : (
                  <>
                    <p>{faq.answer.intro}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {faq.answer.cities.map(city => (
                        <span key={city} className="text-xs rounded-full border border-border px-3 py-1">{city}</span>
                      ))}
                    </div>
                    <p className="mt-3">{faq.answer.outro}</p>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SlideEffect>
    </div>
  )
}
