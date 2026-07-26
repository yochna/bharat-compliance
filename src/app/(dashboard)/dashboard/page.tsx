import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import {
  TrendingUp,
  Clock,
  FileCheck,
  ShieldCheck,
  ReceiptText,
  Plus,
  RefreshCw,
  Languages,
  ArrowRight,
} from "lucide-react"
import { AITerminal } from "@/app/components/dashboard/AITerminal"


export default async function DashboardPage() {
  const session = await getServerSession()
  if (!session) redirect("/login")

  const firstName = session.user?.name?.split(" ")[0] || "there"
  const hour = new Date().getHours()
const greeting =
  hour < 12 ? "Good morning" :
  hour < 17 ? "Good afternoon" :
  hour < 21 ? "Good evening" :
  "Good night"

  return (
    <div className="flex flex-col min-h-screen">

      {/* Sticky topbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-[#0F1117]/80 backdrop-blur-xl border-b border-white/5">
        <div>
          <h1 className="text-lg font-semibold text-white tracking-tight">
          {greeting}, <span className="text-[#FF5C1A]">{firstName}</span> 👋
          </h1>
          <p className="text-[11px] text-white/30 mt-0.5 font-mono">
            FY 2025-26 · Q1 · compliance_score: 100%
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-[12px] text-white/40 bg-white/4 border border-white/8 px-4 py-2 rounded-xl hover:text-white/70 hover:bg-white/6 transition-all">
            <RefreshCw size={13} />
            Sync
          </button>
          <button className="flex items-center gap-2 text-[12px] text-white/40 bg-white/4 border border-white/8 px-4 py-2 rounded-xl hover:text-white/70 hover:bg-white/6 transition-all">
            <Languages size={13} />
            EN · हिं
          </button>
          <a
         href="/dashboard/gst"
  className="flex items-center gap-2 text-[12px] text-white bg-gradient-to-r from-[#FF5C1A] to-[#FF7A1A] px-4 py-2 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all font-medium no-underline"
>
  <Plus size={13} />
  New Filing
</a>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 px-8 py-7 flex flex-col gap-6">

        {/* Metric cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              icon: TrendingUp,
              label: "GST Filed MTD",
              value: "₹2.4L",
              footer: "↑ +12% vs last month",
              footerColor: "text-[#4ade80]",
              iconColor: "#FF5C1A",
              iconBg: "rgba(255,92,26,0.1)",
              glowColor: "rgba(255,92,26,0.08)",
            },
            {
              icon: Clock,
              label: "Next Deadline",
              value: "4d",
              footer: "GSTR-3B · Jul 20",
              footerColor: "text-[#fbbf24]",
              iconColor: "#fbbf24",
              iconBg: "rgba(251,191,36,0.1)",
              glowColor: "rgba(251,191,36,0.06)",
            },
            {
              icon: FileCheck,
              label: "Docs Generated",
              value: "7",
              footer: "+3 this week",
              footerColor: "text-white/30",
              iconColor: "#60a5fa",
              iconBg: "rgba(96,165,250,0.1)",
              glowColor: "rgba(96,165,250,0.06)",
            },
            {
              icon: ShieldCheck,
              label: "Penalty Risk",
              value: "₹0",
              footer: "All filings on track",
              footerColor: "text-[#4ade80]",
              iconColor: "#4ade80",
              iconBg: "rgba(74,222,128,0.1)",
              glowColor: "rgba(74,222,128,0.06)",
            },
          ].map((card, i) => (
            <div
              key={card.label}
              className="bg-white/[0.02] border border-white/8 rounded-2xl p-5 relative overflow-hidden hover:border-white/12 transition-all cursor-pointer group"
            >
              {/* Ambient glow */}
              <div
                className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: card.glowColor }}
              />

              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 relative z-10"
                style={{ background: card.iconBg }}
              >
                <card.icon size={17} style={{ color: card.iconColor }} />
              </div>

              <p
                className="text-3xl font-bold tracking-tight mb-1 relative z-10"
                style={{
                  color: card.iconColor === "#FF5C1A" ? "#fff" : card.iconColor,
                }}
              >
                {card.value}
              </p>
              <p className="text-[11px] text-white/30 mb-3 relative z-10">
                {card.label}
              </p>
              <p className={`text-[11px] relative z-10 ${card.footerColor}`}>
                {card.footer}
              </p>
            </div>
          ))}
        </div>

        {/* Main two column grid */}
        <div className="grid grid-cols-2 gap-4">

          {/* AI Terminal */}
          <AITerminal />

          {/* Recent Filings */}
          <div className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#4ade80]/10 flex items-center justify-center">
                  <ReceiptText size={14} className="text-[#4ade80]" />
                </div>
                <span className="text-[13px] font-medium text-white/70">
                  Recent Filings
                </span>
              </div>
              <a
                href="/dashboard/gst"
                className="text-[11px] text-[#FF5C1A] hover:text-[#FF7A1A] transition-colors no-underline flex items-center gap-1"
              >
                View all <ArrowRight size={11} />
              </a>
            </div>

            <div className="px-5 py-2">
              {[
                {
                  name: "GSTR-1",
                  period: "Jun 2025",
                  amount: "₹84,200",
                  status: "Filed",
                  indicatorColor: "#4ade80",
                  statusClass: "text-[#4ade80] bg-[#4ade80]/10",
                },
                {
                  name: "GSTR-3B",
                  period: "Jun 2025",
                  amount: "₹1,12,400",
                  status: "Pending",
                  indicatorColor: "#fbbf24",
                  statusClass: "text-[#fbbf24] bg-[#fbbf24]/10",
                },
                {
                  name: "TDS Return",
                  period: "Q1 2025",
                  amount: "₹28,600",
                  status: "Due Soon",
                  indicatorColor: "#f87171",
                  statusClass: "text-[#f87171] bg-[#f87171]/10",
                },
              ].map((filing, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-4 border-b border-white/4 last:border-0 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <div
                    className="w-1 h-9 rounded-full flex-shrink-0"
                    style={{ background: filing.indicatorColor }}
                  />
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-white/70">
                      {filing.name}
                    </p>
                    <p className="text-[10px] text-white/25 font-mono mt-0.5">
                      {filing.period}
                    </p>
                  </div>
                  <span className="text-[12px] text-white/30 font-mono mr-2">
                    {filing.amount}
                  </span>
                  <span
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-medium ${filing.statusClass}`}
                  >
                    {filing.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
<div className="grid grid-cols-3 gap-4">
  <a
    href="/dashboard/gst"
    className="bg-white/[0.02] border border-white/7 rounded-2xl p-5 no-underline group hover:border-white/12 hover:bg-white/[0.03] transition-all"
  >
    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-[rgba(255,92,26,0.08)]">
      <ReceiptText size={18} style={{ color: "#FF5C1A" }} />
    </div>
    <p className="text-[13px] font-semibold text-white/70 mb-1.5">New GST Filing</p>
    <p className="text-[11px] text-white/25 leading-relaxed">Generate GSTR-1 or GSTR-3B from your transactions instantly</p>
  </a>

  <a
    href="/dashboard/documents"
    className="bg-white/[0.02] border border-white/7 rounded-2xl p-5 no-underline group hover:border-white/12 hover:bg-white/[0.03] transition-all"
  >
    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-[rgba(96,165,250,0.08)]">
      <FileCheck size={18} style={{ color: "#60a5fa" }} />
    </div>
    <p className="text-[13px] font-semibold text-white/70 mb-1.5">Generate Document</p>
    <p className="text-[11px] text-white/25 leading-relaxed">AI-drafted legal notice or vendor agreement in EN or हिं</p>
  </a>

  <a
    href="/dashboard/ai"
    className="bg-white/[0.02] border border-white/7 rounded-2xl p-5 no-underline group hover:border-white/12 hover:bg-white/[0.03] transition-all"
  >
    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-[rgba(74,222,128,0.08)]">
      <ShieldCheck size={18} style={{ color: "#4ade80" }} />
    </div>
    <p className="text-[13px] font-semibold text-white/70 mb-1.5">Ask AI Assistant</p>
    <p className="text-[11px] text-white/25 leading-relaxed">Query your compliance data in plain English or Hindi</p>
  </a>
</div>

        {/* Compliance health */}
        <div className="bg-white/[0.02] border border-white/7 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#4ade80]/10 flex items-center justify-center">
                <ShieldCheck size={15} className="text-[#4ade80]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white/70">
                  Compliance Health
                </p>
                <p className="text-[10px] text-white/25 font-mono">
                  FY 2025-26 · Q1
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[13px] font-bold text-[#4ade80]">100%</p>
              <p className="text-[10px] text-white/25 font-mono">
                overall score
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {[
              { label: "GST", pct: 100, color: "#4ade80" },
              { label: "TDS", pct: 72, color: "#fbbf24" },
              { label: "ROC", pct: 90, color: "#4ade80" },
              { label: "PF / ESI", pct: 55, color: "#f87171" },
            ].map((h) => (
              <div key={h.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-white/35">{h.label}</span>
                  <span
                    className="text-[11px] font-mono font-medium"
                    style={{ color: h.color }}
                  >
                    {h.pct}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${h.pct}%`,
                      background: h.color,
                    }}
                  />
                </div>
                <p className="text-[10px] text-white/20 mt-1.5">
                  {h.pct === 100
                    ? "All filed"
                    : h.pct >= 80
                    ? "Good standing"
                    : h.pct >= 60
                    ? "Needs attention"
                    : "Action required"}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}