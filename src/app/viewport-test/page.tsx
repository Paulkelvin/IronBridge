import type { Metadata } from "next"
import ViewportProbe from "./viewport-probe"

export const metadata: Metadata = {
  title: "Viewport test",
  robots: { index: false, follow: false },
}

export default function ViewportTestPage() {
  return <ViewportProbe />
}
