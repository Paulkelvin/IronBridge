import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"
import DriverForm from "./driver-form"

export const metadata: Metadata = pageMetadata({
  title: "Become a Driver | Iron Bridge Mobility Solutions",
  description: "Drive with Iron Bridge Mobility Solutions. We work with reliable drivers and owner-operators on medical courier and delivery routes in MD, DC, and VA.",
  path: "/become-a-driver",
})

export default function BecomeADriverPage() {
  return <DriverForm />
}
