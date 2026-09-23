import type { Metadata } from "next"
import { pageMetadata } from "@/lib/page-metadata"
import QuoteForm from "./quote-form"

export const metadata: Metadata = pageMetadata({
  title: "Request a Quote | Iron Bridge Mobility Solutions",
  description: "Request a medical courier or commercial logistics quote from Iron Bridge Mobility Solutions, serving Maryland, Washington DC, and Northern Virginia.",
  path: "/request-a-quote",
})

export default function RequestAQuotePage() {
  return <QuoteForm />
}
