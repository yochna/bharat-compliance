"use client";

import { Building2, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-centre  justify-centre justify-between px-10 py-5 border-b border-[#1E1E1E] bg-[#0A0A0A]/80 backdrop-blur-md">
      {/* logo */}
      <Link href="/" className="flex items-centre gap-2.5 no-underline">
        <div className="w-8 h-8 rounded-lg bg-[#FF5C1A flex items-centre justify-centre">
          <Building2 size={16} color="white" />
        </div>
        <span className="text-[#F0EDE6] font-medium text-base tracking-tight">
          Bharat<span className="text-[#FF5C1A]">Comply</span>
        </span>
      </Link>

      {/* nav links */}
      <div className="flex items-centre gap-8">
        <Link
          href="#features"
          className="text-sm text-[#666] hover:text-[#CCC] transition-colors no-underline"
        >
          Features
        </Link>
        <Link
          href="#how-it-works"
          className="text-sm text-[#666] hover:text-[#CCC] transition-colors no-underline"
        >
          How it works
        </Link>
        <Link
          href="#pricing"
          className="text-sm text-[#666] hover:text-[#CCC] transition-colors no-underline"
        >
          Pricing
        </Link>
      </div>

      {/* cta */}
      <div className="flex items-centre gap-3">
        <Button variant="ghost" size="sm">
          Sign in
        </Button>
        <Button variant="primary" size="sm">
          Get started <ArrowRight size={14} />
        </Button>
      </div>
    </nav>
  );
}
