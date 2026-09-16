'use client'

import Logo from "./logo"
import Link from "next/link"
import { Button } from "./ui/button"
import { AlignJustify, ChevronDown, X } from "lucide-react"
import { AnimatePresence } from 'motion/react'
import * as motion from "motion/react-m"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { useEffect, useState } from "react"

const settings = {
  services: {
    name: 'services',
    href: '/services',
    items: [
      { name: 'Medical Courier', href: '/medical-courier', description: 'Specimen transport, cold-packed and STAT shipments.' },
      { name: 'Commercial Logistics', href: '/commercial-logistics', description: 'Cargo van, same-day, and multi-stop delivery.' },
      { name: 'Dedicated Routes', href: '/dedicated-routes', description: 'Consistent daily, weekly, or recurring coverage.' },
      { name: 'Bulk-Item Removal', href: '/bulk-item-removal', description: 'Furniture, appliance, and large-item removal.' },
    ],
  },
  company: {
    name: 'company',
    items: [
      { name: 'About', href: '/about', description: 'Our story, mission, and the team behind Iron Bridge.' },
      { name: 'Testimonials', href: '/#testimonials', description: 'What our clients say about working with us.' },
      { name: 'Capability Statement', href: '/capability-statement', description: 'Qualifications, NAICS codes, and company overview.' },
    ],
  },
  navLinks: [
    { name: 'service area', href: '/service-area' },
    { name: 'become a driver', href: '/become-a-driver' },
  ],
  mobileLinks: [
    { name: 'home', href: '/' },
    { name: 'services', href: '/services' },
    { name: 'medical courier', href: '/medical-courier' },
    { name: 'commercial logistics', href: '/commercial-logistics' },
    { name: 'dedicated routes', href: '/dedicated-routes' },
    { name: 'bulk-item removal', href: '/bulk-item-removal' },
    { name: 'about', href: '/about' },
    { name: 'testimonials', href: '/#testimonials' },
    { name: 'capability statement', href: '/capability-statement' },
    { name: 'service area', href: '/service-area' },
    { name: 'become a driver', href: '/become-a-driver' },
  ],
  cta: {
    content: 'request a quote',
    href: '/request-a-quote'
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <nav className="w-full flex items-center justify-between">
      {/* Logo */}
      <Link href='/' title="Home" id="Logo">
        <Logo />
      </Link>

      {/* desktop menu */}
      <div className="items-center justify-center gap-6 hidden lg:flex">

        {/* Nav Links */}
        <NavigationMenu.Root delayDuration={80} className="relative">
          <NavigationMenu.List className="flex items-center justify-center gap-6 text-black font-medium select-none text-link">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group flex items-center gap-1 hover:opacity-80 transition-all capitalize cursor-pointer outline-none">
                {settings.services.name}
                <ChevronDown size={14} strokeWidth={2} className="text-teal transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-full left-1/2 -translate-x-1/2 pt-3 data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out data-[motion=from-start]:fade-in data-[motion=from-end]:fade-in data-[motion=to-start]:fade-out data-[motion=to-end]:fade-out data-[motion=from-start]:slide-in-from-top-1 data-[motion=from-end]:slide-in-from-top-1 duration-150">
                <ul className="w-72 rounded-xl border border-border bg-white shadow-lg p-2">
                  {settings.services.items.map(item => (
                    <li key={item.name}>
                      <NavigationMenu.Link asChild>
                        <Link href={item.href} className="block rounded-lg px-3.5 py-2.5 hover:bg-secondary transition-colors">
                          <span className="block text-sm font-semibold text-navy normal-case">{item.name}</span>
                          <span className="block text-xs text-foreground/60 normal-case mt-0.5">{item.description}</span>
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                  <li className="border-t border-border mt-1 pt-1">
                    <NavigationMenu.Link asChild>
                      <Link href={settings.services.href} className="block rounded-lg px-3.5 py-2.5 text-sm font-semibold text-teal hover:bg-secondary transition-colors normal-case">
                        View All Services →
                      </Link>
                    </NavigationMenu.Link>
                  </li>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group flex items-center gap-1 hover:opacity-80 transition-all capitalize cursor-pointer outline-none">
                {settings.company.name}
                <ChevronDown size={14} strokeWidth={2} className="text-teal transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-full left-1/2 -translate-x-1/2 pt-3 data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out data-[motion=from-start]:fade-in data-[motion=from-end]:fade-in data-[motion=to-start]:fade-out data-[motion=to-end]:fade-out data-[motion=from-start]:slide-in-from-top-1 data-[motion=from-end]:slide-in-from-top-1 duration-150">
                <ul className="w-72 rounded-xl border border-border bg-white shadow-lg p-2">
                  {settings.company.items.map(item => (
                    <li key={item.name}>
                      <NavigationMenu.Link asChild>
                        <Link href={item.href} className="block rounded-lg px-3.5 py-2.5 hover:bg-secondary transition-colors">
                          <span className="block text-sm font-semibold text-navy normal-case">{item.name}</span>
                          <span className="block text-xs text-foreground/60 normal-case mt-0.5">{item.description}</span>
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {settings.navLinks.map(link => (
              <NavigationMenu.Item key={link.name}>
                <NavigationMenu.Link asChild>
                  <Link href={link.href} title={link.name} className="hover:opacity-80 transition-all capitalize">{link.name}</Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Call To Action */}
        <Link href={settings.cta.href} title={settings.cta.content}>
          <Button className="capitalize">{settings.cta.content}</Button>
        </Link>
      </div>

      {/* mobile only - burger menu icon */}
      <motion.button
        type="button"
        initial={{ scale: 1, y: 0 }}
        whileTap={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-none flex lg:hidden cursor-pointer text-black"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {!isOpen && <AlignJustify size={20} strokeWidth={1.5} aria-hidden="true" />}
        {isOpen && <X size={20} strokeWidth={1.5} aria-hidden="true" />}
      </motion.button>

      {/* mobile only - menu container with AnimatePresence for exit animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 1, y: -20 }}
            animate={{ height: '100vh', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 1, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed flex flex-col lg:hidden top-[72px] left-0 w-full bg-white z-40 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              <ul className="flex flex-col space-y-2 text-black font-medium select-none text-base">
                {settings.mobileLinks.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} title={link.name} onClick={toggleMenu} className="block py-2 capitalize">{link.name}</Link>
                  </li>
                ))}
              </ul>

              <Link href={settings.cta.href} title={settings.cta.content} onClick={toggleMenu}>
                <Button className="w-full capitalize">{settings.cta.content}</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
