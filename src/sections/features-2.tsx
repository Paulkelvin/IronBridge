'use client'

import DiagonalRoute from "@/components/graphics/diagonal-route"
import SectionHeader from "@/components/section-header"
import SlideEffect from "@/components/slide-effect"
import IconBadge from "@/components/ui/icon-badge"
import { CardBody, CardTitle } from "@/components/ui/card-text"
import { FileCheck, PackageCheck, ShieldCheck, UserCheck } from "lucide-react"

const settings = {
  eyebrow: 'Why Iron Bridge',
  title: 'Trained. Documented. Accountable.',
  description: 'Every route runs on the same standards, whether the shipment is a lab specimen or a business delivery.',
  points: [
    {
      icon: ShieldCheck,
      title: 'HIPAA & BBP Trained',
      content: 'Personnel complete HIPAA privacy awareness and Bloodborne Pathogens training as part of our medical courier standards.',
    },
    {
      icon: PackageCheck,
      title: 'Chain-of-Custody Handling',
      content: 'Shipments are accepted, tracked, and released to authorized recipients following documented custody procedures.',
    },
    {
      icon: FileCheck,
      title: 'Proof of Delivery',
      content: 'Every delivery is confirmed with proof-of-delivery documentation, on request for standard routes.',
    },
    {
      icon: UserCheck,
      title: 'Qualified Drivers',
      content: 'Drivers are reviewed against license, insurance, and training standards before being assigned a route.',
    },
  ]
}

export default function Features2() {
  return (
    <div className="relative space-y-8 md:space-y-10 lg:space-y-12 mx-auto text-center">
      <div className="absolute top-0 left-1/2 w-screen -translate-x-1/2 h-[120px] md:h-[180px] -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        <DiagonalRoute className="absolute top-0 left-0 w-[140px] md:w-[220px] h-full text-teal/[0.16] scale-y-[-1]" />
      </div>

      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      {/* Points */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {settings.points.map((point, i) => (
          <SlideEffect
            key={point.title}
            direction="top"
            delay={0.08 * i}
            isSpring={false}
            className="text-left space-y-3 border-l-2 border-teal/30 pl-5"
          >
            <IconBadge icon={point.icon} size={24} />
            <CardTitle className="text-base md:text-lg">{point.title}</CardTitle>
            <CardBody className="text-sm">{point.content}</CardBody>
          </SlideEffect>
        ))}
      </div>
    </div>
  )
}
