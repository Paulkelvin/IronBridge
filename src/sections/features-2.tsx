'use client'

import Card from "@/components/card"
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
    <div className="space-y-8 md:space-y-10 lg:space-y-12 mx-auto text-center">
      <SectionHeader eyebrow={settings.eyebrow} title={settings.title} description={settings.description} />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {settings.points.map((point, i) => (
          <SlideEffect key={point.title} direction="top" delay={0.08 * i} className="col-span-1 h-full" isSpring={false}>
            <Card className="items-start">
              <IconBadge icon={point.icon} size={24} />
              <CardTitle className="text-base md:text-lg">{point.title}</CardTitle>
              <CardBody className="text-sm">{point.content}</CardBody>
            </Card>
          </SlideEffect>
        ))}
      </div>
    </div>
  )
}
