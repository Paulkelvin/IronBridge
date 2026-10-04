'use client'

import Logo from "@/components/logo"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import ButtonLink from "@/components/ui/button-link"

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const socials = [
  { title: 'Facebook', href: 'https://www.facebook.com/share/19ZmJDHUMG/?mibextid=wwXIfr', icon: FacebookIcon },
  { title: 'Instagram', href: 'https://www.instagram.com/iron_bridge_mobility?stkn=cGp5a2k1ZjF6anQw', icon: InstagramIcon },
]

const settings = {
  columns: [
    {
      title: 'Services',
      links: [
        { title: 'Medical Courier', href: '/medical-courier' },
        { title: 'Commercial Logistics', href: '/commercial-logistics' },
        { title: 'Dedicated Routes', href: '/dedicated-routes' },
        { title: 'Bulk-Item Removal', href: '/bulk-item-removal' },
        { title: 'All Services', href: '/services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Testimonials', href: '/#testimonials' },
        { title: 'Industries Served', href: '/#industries' },
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
          <p className="text-[11px] sm:text-xs text-foreground/80 uppercase tracking-[0.08em] sm:tracking-[0.1em] whitespace-nowrap">
            <span className="sm:hidden">MD · DC · Northern VA</span>
            <span className="hidden sm:inline">Maryland · Washington, DC · Northern Virginia</span>
          </p>
          <div className="flex items-center gap-3">
            {socials.map(social => (
              <a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Iron Bridge Mobility Solutions on ${social.title}`}
                className="inline-flex items-center justify-center size-9 rounded-full bg-navy text-white hover:bg-teal transition-colors"
              >
                <social.icon />
              </a>
            ))}
          </div>
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
          <p className="text-xs text-foreground/80">Business inquiries: same-day response</p>
          <ButtonLink
            href="/request-a-quote"
            className="mt-1 rounded-md bg-navy text-white border border-navy/80 text-sm font-medium px-6 hover:bg-transparent hover:text-navy transition-colors"
          >
            Request a Quote
          </ButtonLink>
        </div>
      </div>

      {/* copyright */}
      <p className="text-center text-xs text-foreground/80">{settings.copyright}</p>
    </footer>
  )
}
