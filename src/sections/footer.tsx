'use client'

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const settings = {
  columns: [
    {
      title: 'Services',
      links: [
        { title: 'Medical Courier', href: '/medical-courier' },
        { title: 'Commercial Logistics', href: '/commercial-logistics' },
        { title: 'Dedicated Routes', href: '/dedicated-routes' },
        { title: 'Industries Served', href: '/#industries' },
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Service Area', href: '/service-area' },
        { title: 'Compliance & Safety', href: '/compliance-safety' },
        { title: 'Become a Driver', href: '/become-a-driver' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Iron Bridge Mobility Solutions. All rights reserved.`
}

export default function Footer() {
  return (
    <footer className="w-full py-12 md:py-16 flex flex-col gap-10 md:gap-14 text-sm border-t border-border">
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

        {/* CTA */}
        <div className="flex flex-col gap-3 items-start md:items-end">
          <span className="text-xs font-medium tracking-[0.12em] uppercase text-navy">Get Started</span>
          <Link href="/request-a-quote">
            <Button
              size='default'
              className="rounded-none bg-navy text-white border border-navy uppercase tracking-[0.14em] text-xs font-semibold px-6 hover:bg-transparent hover:text-navy transition-colors"
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
