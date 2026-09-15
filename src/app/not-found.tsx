import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="px-4 xl:px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-6 py-32 md:py-44">
      <span className="text-6xl md:text-8xl font-serif font-semibold text-navy/20">404</span>
      <h1 className="font-serif text-2xl md:text-3xl font-semibold text-navy">Page Not Found</h1>
      <p className="text-foreground/70 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link href="/">
          <Button className="bg-navy text-white hover:bg-navy/90">
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to Home
          </Button>
        </Link>
        <Link href="/request-a-quote">
          <Button variant="outline" className="border-navy/30 text-navy hover:bg-navy/5">
            Request a Quote
          </Button>
        </Link>
      </div>
    </div>
  )
}
