"use client"

import { Building2, ArrowRight, Menu, X } from "lucide-react"
import { Button } from "../ui/Button"
import Link from "next/link"
import { useState } from "react"

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1E1E1E] bg-[#0A0A0A]/90 backdrop-blur-md">

      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg bg-[#FF5C1A] flex items-center justify-center">
            <Building2 size={16} color="white" />
          </div>
          <span className="text-[#F0EDE6] font-medium text-base tracking-tight">
            Bharat<span className="text-[#FF5C1A]">Comply</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-[#666] hover:text-[#CCC] transition-colors no-underline">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-[#666] hover:text-[#CCC] transition-colors no-underline">
            How it works
          </Link>
          <Link href="#pricing" className="text-sm text-[#666] hover:text-[#CCC] transition-colors no-underline">
            Pricing
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Sign in</Button>
          <Button variant="primary" size="sm">
            Get started <ArrowRight size={14} />
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#666] hover:text-[#CCC] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1E1E1E] px-6 py-4 flex flex-col gap-4 bg-[#0A0A0A]">
          <Link href="#features" onClick={() => setMenuOpen(false)} className="text-sm text-[#666] hover:text-[#CCC] transition-colors no-underline">
            Features
          </Link>
          <Link href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-sm text-[#666] hover:text-[#CCC] transition-colors no-underline">
            How it works
          </Link>
          <Link href="#pricing" onClick={() => setMenuOpen(false)} className="text-sm text-[#666] hover:text-[#CCC] transition-colors no-underline">
            Pricing
          </Link>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button variant="primary" size="sm">
              Get started <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      )}

    </nav>
  )
}