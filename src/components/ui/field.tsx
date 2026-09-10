import { cn } from "@/lib/utils"

export function Label({ children, required, className, htmlFor }: { children: React.ReactNode, required?: boolean, className?: string, htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn("block text-sm font-medium text-navy mb-1.5", className)}>
      {children}
      {required && <span className="text-teal ml-0.5" aria-hidden="true">*</span>}
      {required && <span className="sr-only"> (required)</span>}
    </label>
  )
}

const fieldClasses = "w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors"

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldClasses, props.className)} />
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(fieldClasses, "min-h-28 resize-y", props.className)} />
}

export function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(fieldClasses, "bg-white", props.className)}>
      {children}
    </select>
  )
}

export function FieldError({ children, id }: { children?: string, id?: string }) {
  if (!children) return null
  return <p id={id} role="alert" className="text-xs text-red-600 mt-1">{children}</p>
}

export function PillGroup({
  options,
  value,
  onChange,
  name,
  ariaLabel,
}: {
  options: { label: string, value: string }[]
  value?: string
  onChange: (value: string) => void
  name: string
  ariaLabel?: string
}) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={ariaLabel || name}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            value === opt.value
              ? "bg-navy text-white border-navy"
              : "bg-white text-navy border-navy/20 hover:border-navy/40"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function CheckboxPillGroup({
  options,
  value,
  onChange,
  name,
  ariaLabel,
}: {
  options: { label: string, value: string }[]
  value: string[]
  onChange: (value: string[]) => void
  name: string
  ariaLabel?: string
}) {
  const toggle = (v: string) => {
    onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v])
  }
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={ariaLabel || name}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={value.includes(opt.value)}
          onClick={() => toggle(opt.value)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            value.includes(opt.value)
              ? "bg-navy text-white border-navy"
              : "bg-white text-navy border-navy/20 hover:border-navy/40"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
