'use client'

import Link from "next/link"
import { useRef } from "react"

export function useSpamGuard() {
  const honeypotRef = useRef<HTMLInputElement>(null)
  const startedAt = useRef(Date.now())

  const guardFields = () => ({
    website: honeypotRef.current?.value ?? "",
    formElapsedMs: Date.now() - startedAt.current,
  })

  const honeypot = (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Website
        <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )

  return { honeypot, guardFields }
}

export function focusFirstError(container: HTMLElement | null) {
  requestAnimationFrame(() => {
    if (!container) return
    const invalidInput = container.querySelector<HTMLElement>('[aria-invalid="true"]')
    if (invalidInput) {
      invalidInput.focus()
      return
    }
    const firstAlert = container.querySelector('[role="alert"]')
    firstAlert?.parentElement?.querySelector<HTMLElement>("button, input, select, textarea")?.focus()
  })
}

export function FormConsent({ subject }: { subject: string }) {
  return (
    <p className="text-xs text-foreground/80">
      By submitting, you agree that Iron Bridge Mobility Solutions may contact you about {subject}. See our{" "}
      <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-navy">Privacy Policy</Link>.
    </p>
  )
}
