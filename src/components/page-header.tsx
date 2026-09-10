import Navbar from "@/components/navbar"
import SlideEffect from "@/components/slide-effect"
import TextBlurEffect from "@/components/text-blur-effect"

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="space-y-10 md:space-y-14 z-50 relative">
      <Navbar />

      <section className="flex flex-col gap-5 lg:gap-6 items-center text-center pt-4 pb-4 md:pb-8">
        <SlideEffect>
          <span className="inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-[11px] md:text-xs font-medium tracking-[0.14em] text-navy uppercase">
            {eyebrow}
          </span>
        </SlideEffect>

        <h1 className="font-serif text-navy text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] max-w-3xl">
          <TextBlurEffect>{title}</TextBlurEffect>
        </h1>

        <SlideEffect delay={0.15} className="text-sm lg:text-lg px-4 sm:px-10 md:px-0 md:max-w-2xl mx-auto text-foreground">
          {description}
        </SlideEffect>
      </section>
    </div>
  )
}
