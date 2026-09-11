import RouteLine from "@/components/graphics/route-line"
import SlideEffect from "@/components/slide-effect"
import TextBlurEffect from "@/components/text-blur-effect"

export default function PageHeader({
  eyebrow,
  title,
  description,
  mobileDescription,
}: {
  eyebrow: string
  title: string
  description: string
  mobileDescription?: string
}) {
  return (
    <div className="space-y-8 md:space-y-10">
      <div className="relative">
        <div
          className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 -z-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(70% 90% at 90% 0%, rgba(18,130,98,0.08) 0%, transparent 65%), radial-gradient(70% 90% at 5% 100%, rgba(27,42,74,0.06) 0%, transparent 65%)',
          }}
        >
          <RouteLine className="absolute inset-x-0 top-1/4 w-full h-[160px] md:h-[220px] text-navy/[0.07]" />
        </div>

        <section className="relative flex flex-col gap-8 lg:gap-10 items-center text-center pt-4 pb-4 md:pb-8">
          <div className="flex flex-col gap-2 lg:gap-2.5 items-center">
            <SlideEffect>
              <span className="inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-[11px] md:text-xs font-medium tracking-[0.14em] text-navy uppercase">
                {eyebrow}
              </span>
            </SlideEffect>

            <h1 className="font-serif text-navy text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] max-w-3xl">
              <TextBlurEffect>{title}</TextBlurEffect>
            </h1>
          </div>

          <SlideEffect delay={0.15} className="text-sm lg:text-lg px-4 sm:px-10 md:px-0 md:max-w-2xl mx-auto text-foreground">
            {mobileDescription ? (
              <>
                <span className="md:hidden">{mobileDescription}</span>
                <span className="hidden md:inline">{description}</span>
              </>
            ) : description}
          </SlideEffect>
        </section>
      </div>
    </div>
  )
}
