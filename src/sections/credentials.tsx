'use client'

import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion"
import { ClipboardCheck, MapPin, PackageCheck, ShieldAlert, ShieldCheck, Truck, type LucideIcon } from "lucide-react"

const settings = {
  eyebrow: 'Credentials',
  title: 'Our Credentials',
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

function Badge({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-navy mx-2">
      <Icon size={16} strokeWidth={1.5} className="text-teal-dark shrink-0" aria-hidden="true" />
      {title}
    </span>
  )
}

export default function Credentials() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const track = [...settings.items, ...settings.items]

  return (
    <div className="space-y-8 md:space-y-10 mx-auto text-center">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      <SlideEffect isSpring={false}>
        {prefersReducedMotion ? (
          // Static, wrapped layout — no auto-scrolling content for reduced-motion users.
          <div className="rounded-2xl bg-secondary p-6 md:p-8">
            <div className="flex flex-wrap justify-center gap-3">
              {settings.items.map((item) => (
                <Badge key={item.title} icon={item.icon} title={item.title} />
              ))}
            </div>
          </div>
        ) : (
          <div
            className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-secondary py-6 md:py-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            aria-label="Iron Bridge credentials"
          >
            <div className="flex w-max animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
              {track.map((item, i) => (
                <Badge key={`${item.title}-${i}`} icon={item.icon} title={item.title} />
              ))}
            </div>
          </div>
        )}
      </SlideEffect>

      <p className="text-xs md:text-sm text-foreground/60 italic max-w-2xl mx-auto">
        These reflect training our personnel have completed, coverage and standards we maintain, and where
        we&apos;re based — not licenses, certifications, or endorsements issued by a government agency.
      </p>
    </div>
  )
}
