'use client'

import Logo from "./logo"
import Link from "next/link"
import { Button } from "./ui/button"
import { AlignJustify, X } from "lucide-react"
import { AnimatePresence } from 'motion/react'
import * as motion from "motion/react-m"
import { useEffect, useState } from "react"

const settings = {
  navLinks: [
    { name: 'services', href: '/services' },
    { name: 'medical courier', href: '/medical-courier' },
    { name: 'dedicated routes', href: '/dedicated-routes' },
    { name: 'about', href: '/about' },
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
    <nav className="w-full h-fit py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href='/' title="Home" id="Logo">
        <Logo />
      </Link>

      {/* desktop menu */}
      <div className="items-center justify-center gap-5 hidden md:flex">

        {/* Nav Links */}
        <ul className="flex items-center justify-center gap-5 text-black font-medium select-none text-link">
          {settings.navLinks.map(link => (
            <li key={link.name}>
              <Link href={link.href} title={link.name} className="hover:opacity-80 transition-all capitalize">{link.name}</Link>
            </li>
          ))}
        </ul>

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
        className="bg-white shadow-none flex md:hidden cursor-pointer text-black"
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
            className="fixed flex flex-col md:hidden top-16 left-0 w-full bg-white z-50 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              <ul className="flex flex-col space-y-2 text-black font-medium select-none text-base">
                {settings.navLinks.map(link => (
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
