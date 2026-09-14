'use client'

import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import { ClipboardCheck, MapPin, PackageCheck, ShieldAlert, ShieldCheck, Truck } from "lucide-react"

const settings = {
  eyebrow: 'Credentials',
  title: 'What We Bring to Every Route',
  description: 'Current qualifications we maintain as a business, not government certifications or endorsements.',
  items: [
    { icon: ShieldCheck, title: 'Insured Transportation Provider' },
    { icon: ShieldAlert, title: 'HIPAA & Bloodborne Pathogens Trained' },
    { icon: PackageCheck, title: 'DOT Category B Trained' },
    { icon: ClipboardCheck, title: 'Documented Chain-of-Custody Procedures' },
    { icon: Truck, title: 'Professional Commercial Vehicle' },
    { icon: MapPin, title: 'Maryland-Based Business' },
  ],
}

export default function Credentials() {
  return (
    <div className="space-y-8 md:space-y-10 mx-auto text-center">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      <SlideEffect isSpring={false} className="rounded-2xl bg-secondary p-6 md:p-8">
        <div className="flex flex-wrap justify-center gap-3">
          {settings.items.map((item) => (
            <span
              key={item.title}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-navy"
            >
              <item.icon size={16} strokeWidth={1.5} className="text-teal-dark shrink-0" aria-hidden="true" />
              {item.title}
            </span>
          ))}
        </div>
      </SlideEffect>

      <SlideEffect className="text-xs md:text-sm text-foreground/60 italic max-w-2xl mx-auto">
        These reflect training our personnel have completed, coverage and standards we maintain, and where
        we&apos;re based — not licenses, certifications, or endorsements issued by a government agency.
      </SlideEffect>
    </div>
  )
}
