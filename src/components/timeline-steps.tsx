'use client'

import SlideEffect from "@/components/slide-effect"

interface Step {
  title: string
  content: string
}

export default function TimelineSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
      {/* Connecting line */}
      <div className="hidden sm:block absolute top-6 left-[16.67%] right-[16.67%] border-t-2 border-dashed border-teal/30 -z-10" aria-hidden="true" />
      <div className="sm:hidden absolute top-6 bottom-6 left-6 border-l-2 border-dashed border-teal/30 -z-10" aria-hidden="true" />

      {steps.map((step, i) => (
        <SlideEffect
          key={step.title}
          direction="top"
          delay={0.1 * i}
          isSpring={false}
          className="relative flex flex-row sm:flex-col items-start sm:items-center gap-4 text-left sm:text-center"
        >
          <span className="shrink-0 flex items-center justify-center h-12 w-12 rounded-full border-2 border-teal bg-background text-teal font-serif text-lg font-semibold">
            {i + 1}
          </span>
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-800 text-base md:text-lg">{step.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{step.content}</p>
          </div>
        </SlideEffect>
      ))}
    </div>
  )
}
