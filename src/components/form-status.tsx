import { CheckCircle2, XCircle } from "lucide-react"

export function FormSuccess({ title, description }: { title: string, description: string }) {
  return (
    <div role="status" aria-live="polite" className="rounded-2xl bg-secondary border border-teal/30 p-8 md:p-10 text-center space-y-3">
      <CheckCircle2 size={36} strokeWidth={1.5} className="text-teal mx-auto" aria-hidden="true" />
      <h3 className="text-lg md:text-xl text-navy font-medium">{title}</h3>
      <p className="text-sm md:text-base max-w-md mx-auto">{description}</p>
    </div>
  )
}

export function FormError({ message }: { message: string }) {
  return (
    <div role="alert" aria-live="assertive" className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <XCircle size={18} strokeWidth={1.5} className="shrink-0 mt-0.5" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}
