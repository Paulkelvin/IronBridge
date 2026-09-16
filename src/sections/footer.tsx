'use client'

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

const settings = {
  columns: [
    {
      title: 'Services',
      links: [
        { title: 'Medical Courier', href: '/medical-courier' },
        { title: 'Commercial Logistics', href: '/commercial-logistics' },
        { title: 'Dedicated Routes', href: '/dedicated-routes' },
        { title: 'Bulk-Item Removal', href: '/bulk-item-removal' },
        { title: 'Industries Served', href: '/#industries' },
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Testimonials', href: '/#testimonials' },
        { title: 'Capability Statement', href: '/capability-statement' },
        { title: 'Service Area', href: '/service-area' },
        { title: 'Compliance & Safety', href: '/compliance-safety' },
        { title: 'Become a Driver', href: '/become-a-driver' },
        { title: 'Privacy Policy', href: '/privacy-policy' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Iron Bridge Mobility Solutions. All rights reserved.`
}

export default function Footer() {
  return (
    <footer className="relative w-full py-12 md:py-16 flex flex-col gap-10 md:gap-14 text-sm">
      <div className="absolute top-0 left-1/2 w-screen -translate-x-1/2 border-t border-border" aria-hidden="true" />
      <div className="flex flex-col md:flex-row gap-10 md:gap-6 md:justify-between">
        {/* Brand */}
        <div className="flex flex-col gap-4 max-w-xs">
          <Logo />
          <p className="text-foreground/80">Dependability Delivered Daily.</p>
          <p className="text-[11px] sm:text-xs text-foreground/60 uppercase tracking-[0.08em] sm:tracking-[0.1em] whitespace-nowrap">
            <span className="sm:hidden">MD · DC · Northern VA</span>
            <span className="hidden sm:inline">Maryland · Washington, DC · Northern Virginia</span>
          </p>
        </div>

        {/* Link columns */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-8 sm:gap-10 md:gap-16">
          {settings.columns.map(col => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="text-xs font-medium tracking-[0.12em] uppercase text-navy">{col.title}</span>
              {col.links.map(link => (
                <Link key={link.title} href={link.href} className="text-foreground/80 hover:text-navy transition-colors">{link.title}</Link>
              ))}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3 items-start md:items-end">
          <span className="text-xs font-medium tracking-[0.12em] uppercase text-navy">Contact</span>
          <a href="tel:+13018181929" className="flex items-center gap-2 text-foreground/80 hover:text-navy transition-colors">
            <Phone size={14} strokeWidth={1.5} aria-hidden="true" />
            (301) 818-1929
          </a>
          <a href="mailto:lbrent@ironbridgems.com" className="flex items-center gap-2 text-foreground/80 hover:text-navy transition-colors">
            <Mail size={14} strokeWidth={1.5} aria-hidden="true" />
            lbrent@ironbridgems.com
          </a>
          <a
            href="https://maps.google.com/?q=12530+Fairwood+Parkway+Ste+102+%23568+Bowie+MD+20720"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-foreground/80 hover:text-navy transition-colors text-left md:text-right"
          >
            <MapPin size={14} strokeWidth={1.5} className="shrink-0 mt-0.5" aria-hidden="true" />
            <span>12530 Fairwood Parkway, Ste 102 #568<br />Bowie, MD 20720</span>
          </a>
          <span className="flex items-center gap-2 text-foreground/80">
            <Clock size={14} strokeWidth={1.5} aria-hidden="true" />
            24/7 Availability
          </span>
          <p className="text-xs text-foreground/60">Business inquiries: same-day response</p>
          <Link href="/request-a-quote" className="mt-1">
            <Button
              size='default'
              className="rounded-md bg-navy text-white border border-navy/80 text-sm font-medium px-6 hover:bg-transparent hover:text-navy transition-colors"
            >
              Request a Quote
            </Button>
          </Link>
        </div>
      </div>

      {/* copyright */}
      <p className="text-center text-xs text-foreground/60">{settings.copyright}</p>
    </footer>
  )
}
