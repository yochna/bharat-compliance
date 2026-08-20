import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { DeadlineTracker } from "@/app/components/dashboard/DeadlineTracker"
import { BellRing } from "lucide-react"

async function getDeadlinesData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/deadlines`, { cache: "no-store" })
    if (!res.ok) return { deadlines: [], standardDeadlines: [] }
    return res.json()
  } catch (err) {
    console.error("Failed to fetch deadlines:", err)
    return { deadlines: [], standardDeadlines: [] }
  }
}

export default async function DeadlinesPage() {
  const session = await getServerSession()
  if (!session?.user?.email) redirect("/login")

  const { deadlines, standardDeadlines } = await getDeadlinesData()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-[#0F1117]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#fbbf24]/10 flex items-center justify-center">
            <BellRing size={16} className="text-[#fbbf24]" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-white tracking-tight">
              Deadline Tracker
            </h1>
            <p className="text-[11px] text-white/30 font-mono">
              Track GST, TDS and compliance deadlines
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 py-6 max-w-5xl">
        <DeadlineTracker 
          initialDeadlines={deadlines}
          initialStandardDeadlines={standardDeadlines}
        />
      </div>
    </div>
  )
}