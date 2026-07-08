
import { Building2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F0EDE6] flex items-centre justify-center px-6 ">
      <div className="w-full max-w-sm">
        {/* logo */}
        <Link
          href="/"
          className="flex items-centre justify-center gap-2.5 no-underline mb-10"
        >
          <div className="w-9 h-9 rounded-lg bg-[#FF5C1A] flex items-centre justify-center">
            <Building2 size={18} color="white" />
          </div>
          <span className="text-[#F0EDE6] font-medium text-lg tracking-tight">
            Bharat<span className="text-[#FF5C1A]">Comply</span>
          </span>
        </Link>
        \{children}
      </div>
    </main>
  );
}
