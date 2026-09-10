import SlideEffect from "@/components/slide-effect"

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`space-y-6 md:space-y-8 ${alignClass}`}>
      <div className="space-y-1.5 md:space-y-2">
        {eyebrow && (
          <SlideEffect>
            <span className="text-xs md:text-sm font-medium tracking-[0.14em] uppercase text-teal">{eyebrow}</span>
          </SlideEffect>
        )}
        <SlideEffect>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-header font-semibold leading-tight text-navy">{title}</h2>
        </SlideEffect>
      </div>
      {description && (
        <SlideEffect className={`text-sm lg:text-base w-full ${align === 'center' ? 'md:max-w-2xl mx-auto' : 'md:max-w-2xl'}`}>
          {description}
        </SlideEffect>
      )}
    </div>
  )
}
