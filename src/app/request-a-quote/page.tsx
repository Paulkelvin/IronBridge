import type { Metadata } from "next"
import QuoteForm from "./quote-form"

export const metadata: Metadata = {
  title: "Request a Quote | Iron Bridge Mobility Solutions",
  description: "Request a medical courier or commercial logistics quote from Iron Bridge Mobility Solutions, serving Maryland, Washington DC, and Northern Virginia.",
}

export default function RequestAQuotePage() {
  return <QuoteForm />
}
