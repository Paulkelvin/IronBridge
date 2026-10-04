export const contact = {
  phoneDisplay: "(301) 818-1929",
  phoneHref: "tel:+13018181929",
  email: "lbrent@ironbridgems.com",
  address: "12530 Fairwood Parkway, Ste 102 #568, Bowie, MD 20720",
}

export const serviceRegions = [
  {
    id: 'maryland' as const,
    title: 'Maryland',
    cities: ['Baltimore', 'Bowie', 'Annapolis', 'Columbia', 'Silver Spring', 'Rockville', 'Bethesda', 'Hyattsville'],
  },
  {
    id: 'dc' as const,
    title: 'Washington, DC',
    cities: ['Washington, DC'],
  },
  {
    id: 'virginia' as const,
    title: 'Northern Virginia',
    cities: ['Arlington', 'Alexandria', 'Fairfax', 'Reston', 'Sterling', 'Ashburn'],
  },
]

export const regionCoverage = [
  {
    title: 'Maryland',
    content: "From our base in Bowie, we cover Prince George's, Montgomery, Anne Arundel, Howard, and Baltimore counties and Baltimore City, including Silver Spring, Rockville, Bethesda, Hyattsville, Annapolis, Columbia, and Baltimore.",
  },
  {
    title: 'Washington, DC',
    content: 'Pickups and deliveries anywhere in the District, including runs between DC and the Maryland and Northern Virginia suburbs.',
  },
  {
    title: 'Northern Virginia',
    content: 'Arlington, Fairfax, and Loudoun counties and the City of Alexandria, including Reston, Sterling, and Ashburn.',
  },
]

export type Faq = {
  question: string
  answer: string | { intro: string, cities: string[], outro: string }
}

export const faqs: Faq[] = [
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

export function faqAnswerText(answer: Faq['answer']) {
  return typeof answer === 'string' ? answer : `${answer.intro} ${answer.cities.join(', ')}. ${answer.outro}`
}
