import type { Metadata } from "next"
import DriverForm from "./driver-form"

export const metadata: Metadata = {
  title: "Become a Driver | Iron Bridge Mobility Solutions",
  description: "Drive or run your own vehicle with Iron Bridge Mobility Solutions — medical courier and commercial logistics across Maryland, Washington DC, and Northern Virginia.",
}

export default function BecomeADriverPage() {
  return <DriverForm />
}
