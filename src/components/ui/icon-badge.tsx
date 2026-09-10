import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

export default function IconBadge({
  icon: Icon,
  size = 22,
  className,
}: {
  icon: LucideIcon
  size?: number
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center justify-center shrink-0 rounded-xl bg-teal-tint p-2.5", className)}>
      <Icon size={size} strokeWidth={1.5} className="text-teal-dark" />
    </span>
  )
}
