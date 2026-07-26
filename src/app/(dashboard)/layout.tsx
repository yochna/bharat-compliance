import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/app/components/dashboard/Sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex">
      <Sidebar user={session.user} />
      <main className="flex-1 ml-[240px] min-h-screen">
        {children}
      </main>
    </div>
  )
}