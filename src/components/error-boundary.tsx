'use client'

import { Component, type ReactNode } from "react"

export default class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('Recovered from a rendering error:', error)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}
