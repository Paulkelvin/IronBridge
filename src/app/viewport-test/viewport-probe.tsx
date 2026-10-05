'use client'

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

const BAR_HEIGHT = 48

type Reading = Record<string, string | number>

function measureUnit(unit: string) {
  const probe = document.createElement("div")
  probe.style.cssText = `position:absolute;visibility:hidden;height:${unit}`
  document.body.appendChild(probe)
  const height = probe.getBoundingClientRect().height
  probe.remove()
  return Math.round(height)
}

export default function ViewportProbe() {
  const [shiftB, setShiftB] = useState(0)
  const [topC, setTopC] = useState<number | null>(null)
  const [reading, setReading] = useState<Reading>({})
  const barA = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = window.visualViewport
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const clientHeight = document.documentElement.clientHeight
        const vvHeight = viewport?.height ?? window.innerHeight
        const vvOffsetTop = viewport?.offsetTop ?? 0
        const vvPageTop = viewport?.pageTop ?? window.scrollY
        setShiftB(Math.max(0, window.innerHeight - clientHeight))
        setTopC(vvPageTop + vvHeight - BAR_HEIGHT)
        setReading({
          innerH: window.innerHeight,
          clientH: clientHeight,
          vvH: Math.round(vvHeight),
          vvTop: Math.round(vvOffsetTop),
          scrollY: Math.round(window.scrollY),
          svh: measureUnit("100svh"),
          dvh: measureUnit("100dvh"),
          lvh: measureUnit("100lvh"),
          safeBottom: measureUnit("env(safe-area-inset-bottom)"),
          barA_bottom: Math.round(barA.current?.getBoundingClientRect().bottom ?? 0),
        })
      })
    }
    update()
    viewport?.addEventListener("resize", update)
    viewport?.addEventListener("scroll", update)
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      cancelAnimationFrame(frame)
      viewport?.removeEventListener("resize", update)
      viewport?.removeEventListener("scroll", update)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const barClass = "flex items-center justify-center text-white text-lg font-bold"

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold text-navy">Bottom bar test</h1>
      <p className="mt-2 text-foreground/80">
        Scroll down until the browser toolbar hides, stop, and take a screenshot. Three test bars sit at the bottom: A, B and C.
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 rounded-lg bg-secondary p-3 font-mono text-sm">
        {Object.entries(reading).map(([key, value]) => (
          <div key={key} className="contents">
            <dt>{key}</dt>
            <dd className="text-right">{value}</dd>
          </div>
        ))}
      </dl>
      {Array.from({ length: 60 }, (_, i) => (
        <p key={i} className={`py-6 text-center text-foreground/60 ${i % 2 ? "bg-white" : "bg-secondary/60"}`}>Row {i + 1}</p>
      ))}

      <div ref={barA} className={`fixed bottom-0 left-0 w-1/3 bg-[#d9480f] ${barClass}`} style={{ height: BAR_HEIGHT, zIndex: 60 }}>A</div>
      <div className={`fixed bottom-0 left-1/3 w-1/3 bg-[#1971c2] ${barClass}`} style={{ height: BAR_HEIGHT, zIndex: 60, transform: `translateY(${shiftB}px)` }}>B</div>
      {topC !== null && createPortal(
        <div className={`absolute left-2/3 w-1/3 bg-[#2f9e44] ${barClass}`} style={{ top: topC, height: BAR_HEIGHT, zIndex: 60 }}>C</div>,
        document.body
      )}
    </div>
  )
}
