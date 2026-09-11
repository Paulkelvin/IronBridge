'use client'

import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const settings = {
  eyebrow: 'Questions',
  title: 'Frequently Asked Questions',
  faqs: [
    {
      question: 'What areas does Iron Bridge serve?',
      answer: {
        intro: 'We operate throughout Maryland, Washington DC, and Northern Virginia, including:',
        cities: ['Baltimore', 'Annapolis', 'Columbia', 'Silver Spring', 'Rockville', 'Bethesda', 'Arlington', 'Alexandria', 'Fairfax'],
        outro: 'Regional and Mid-Atlantic transportation may also be available depending on the assignment.',
      },
    },
    {
      question: 'Are your drivers trained to handle medical specimens?',
      answer: 'Personnel involved in medical courier work complete HIPAA privacy awareness and Bloodborne Pathogens training, and follow documented chain-of-custody and proof-of-delivery procedures.',
    },
    {
      question: 'Do you handle temperature-sensitive or STAT shipments?',
      answer: 'Yes. We support cold-packed and temperature-sensitive shipments as well as time-sensitive, expedited (STAT) courier requests. Let us know the requirements when you request a quote so we can confirm we’re a fit.',
    },
    {
      question: 'Can we set up a recurring or dedicated route?',
      answer: 'Yes, dedicated and recurring routes are one of our core offerings for businesses, laboratories, and healthcare organizations that need consistent daily, weekly, or scheduled transportation.',
    },
    {
      question: 'Do you support organ or tissue transportation?',
      answer: 'Specialized medical transportation, including organ and tissue logistics, is an emerging capability we are developing. It is provided once the appropriate client requirements, training, packaging, temperature-control, chain-of-custody, insurance, and regulatory requirements have been satisfied. It is not offered as a standard service today.',
    },
    {
      question: 'How do I request service?',
      answer: 'Submit a request through our Request a Quote form with your pickup and delivery details, and our team will follow up to confirm the plan.',
    },
  ]
}

export default function FAQ() {
  return (
    <div id='faq' className="space-y-8 md:space-y-10 lg:space-y-12 mx-auto text-center">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} />

      {/* Accordion */}
      <SlideEffect>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-3 text-base text-navy text-left">
          {settings.faqs.map((faq, index) => (
            <AccordionItem key={index} value={index + '-item'}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="text-foreground">
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
