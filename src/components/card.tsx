export default function Card({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline'
}) {
  const variantClasses = variant === 'outline' ? 'border border-border bg-transparent' : 'bg-secondary'
  return (
    <div className={`rounded-2xl text-sm md:text-base h-full ${variantClasses} p-8 md:p-10 flex flex-col items-start justify-start text-start gap-4 md:gap-5 ${className}`}>
      {children}
    </div>
  )
}