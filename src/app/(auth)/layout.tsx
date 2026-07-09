import { Building2 } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F0EDE6] flex flex-col items-center justify-center px-6">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline mb-8">
        <div className="w-7 h-7 rounded-md bg-[#FF5C1A] flex items-center justify-center">
          <Building2 size={14} color="white" />
        </div>
        <span className="text-[#F0EDE6] font-medium text-sm tracking-tight">
          Bharat<span className="text-[#FF5C1A]">Comply</span>
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-sm">
        {children}
      </div>

    </main>
  )
}