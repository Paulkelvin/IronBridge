import { cn } from "@/lib/utils"

export function CardTitle({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h3 className={cn("font-bold text-slate-800", className)}>{children}</h3>
}

export function CardBody({ children, className }: { children: React.ReactNode, className?: string }) {
  return <p className={cn("text-slate-500 font-normal leading-relaxed", className)}>{children}</p>
}
