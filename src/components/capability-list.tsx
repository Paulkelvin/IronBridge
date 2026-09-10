import SlideEffect from "@/components/slide-effect"
import { CardBody, CardTitle } from "@/components/ui/card-text"
import IconBadge from "@/components/ui/icon-badge"
import type { LucideIcon } from "lucide-react"

interface CapabilityItem {
  icon: LucideIcon
  title: string
  content: string
}

export default function CapabilityList({ items }: { items: CapabilityItem[] }) {
  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <SlideEffect key={item.title} direction="top" delay={0.04 * i} isSpring={false}>
          <div className="flex flex-row items-start gap-4 py-5">
            <IconBadge icon={item.icon} size={20} />
            <div className="space-y-1">
              <CardTitle className="text-base">{item.title}</CardTitle>
              <CardBody className="text-sm">{item.content}</CardBody>
            </div>
          </div>
        </SlideEffect>
      ))}
    </div>
  )
}
