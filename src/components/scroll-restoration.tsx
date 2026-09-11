'use client'

import { useLayoutEffect } from "react"

export default function ScrollRestoration() {
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return null
}
