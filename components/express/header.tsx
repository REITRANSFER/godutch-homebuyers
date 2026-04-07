"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
  { label: "Areas We Serve", href: "#areas" },
  { label: "Blog", href: "#blog" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* House with swoosh logo */}
              <circle cx="24" cy="24" r="20" fill="#0e7490" />
              <path d="M24 12L12 22V36H20V28H28V36H36V22L24 12Z" fill="white" />
              <path d="M8 26C12 20 18 16 28 14" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="ml-2 flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#0e4a6f]">EXPRESS</span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#0e7490]">HOMEBUYERS</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Phone and CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:8882984807"
            className="flex items-center gap-2 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" />
            __COMPANY_NAME__
          </a>
          <Button className="bg-[#22c55e] font-semibold text-white hover:bg-[#16a34a]">
            Get My Cash Offer
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full bg-[#0a1628]/95 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-3 text-sm font-medium text-white/90 border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:8882984807"
              className="flex items-center gap-2 py-3 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4" />
              __COMPANY_NAME__
            </a>
            <Button className="mt-3 bg-[#22c55e] font-semibold text-white hover:bg-[#16a34a]">
              Get My Cash Offer
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
