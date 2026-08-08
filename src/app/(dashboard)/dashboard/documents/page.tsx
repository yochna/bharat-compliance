import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { DocumentGenerator } from "@/app/components/dashboard/DocumentGenerator"
import { FileCheck } from "lucide-react"

export default async function DocumentsPage() {
  const session = await getServerSession()
  if (!session?.user?.email) redirect("/login")

  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-[#0F1117]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#60a5fa]/10 flex items-center justify-center">
            <FileCheck size={16} className="text-[#60a5fa]" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-white tracking-tight">
              AI Document Generator
            </h1>
            <p className="text-[11px] text-white/30 font-mono">
              Generate legal documents in English or Hindi using AI
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-6 max-w-4xl">
        <DocumentGenerator />
      </div>
    </div>
  )
}