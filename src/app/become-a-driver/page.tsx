import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"
import DriverForm from "./driver-form"

export const metadata: Metadata = pageMetadata({
  title: "Become a Driver | Iron Bridge Mobility Solutions",
  description: "Drive or run your own vehicle with Iron Bridge Mobility Solutions, a medical courier and commercial logistics company serving Maryland, Washington DC, and Northern Virginia.",
  path: "/become-a-driver",
})

export default function BecomeADriverPage() {
  return <DriverForm />
}
