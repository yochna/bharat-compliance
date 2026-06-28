import { Navbar } from "./components/marketing/Navbar"
import {
  Rocket,
  Terminal,
  ReceiptText,
  FileCheck,
  BellRing,
  TrendingUp,
  ShieldCheck,
  Clock,
} from "lucide-react"
import { Button } from "./components/ui/Button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F0EDE6] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-12">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-[#2A2A2A] rounded px-3 py-1.5 text-[11px] text-[#666] uppercase tracking-widest mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
          AI-powered · Bilingual · India-first
        </div>

        {/* Heading */}
        <h1 className="text-[52px] md:text-[80px] font-bold leading-[1.05] tracking-[-2px] md:tracking-[-4px] mb-6">
          GST filing.<br />
          <span className="text-[#FF5C1A]">Legal docs.</span><br />
          <span className="text-[#2A2A2A]">Done.</span>
        </h1>

        {/* Subheading */}
        <p className="text-base text-[#555] leading-relaxed max-w-md mb-10">
          Stop spending hours on compliance. BharatComply generates GST returns,
          legal notices, and vendor agreements in minutes — in English and Hindi.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <Button variant="primary" size="lg">
            <Rocket size={15} />
            Start for free
          </Button>
          <Button variant="ghost" size="lg">
            <Terminal size={15} />
            See how it works
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#1E1E1E] rounded-xl overflow-hidden mb-10">
          {[
            { value: "12,000+", label: "Businesses served" },
            { value: "98%", label: "Filing accuracy" },
            { value: "4 min", label: "Avg. time to file" },
            { value: "EN + हिं", label: "Bilingual AI" },
          ].map((stat, i) => (
            <div key={i} className={`py-5 text-center bg-[#0D0D0D] ${i !== 3 ? "border-r border-[#1E1E1E]" : ""}`}>
              <p className="text-xl font-semibold text-[#F0EDE6] tracking-tight">{stat.value}</p>
              <p className="text-[11px] text-[#444] mt-1 font-mono">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Terminal */}
        <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#1A1A1A]">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#28C840] inline-block"></span>
            <span className="ml-4 text-[11px] text-[#444] font-mono tracking-wide">
              bharatcomply — AI analysis
            </span>
          </div>
          <div className="px-4 md:px-6 py-6 font-mono text-[12px] md:text-[13px] leading-8 overflow-x-auto">
            <p>
              <span className="text-[#444]">$ </span>
              <span className="text-[#FF5C1A]">analyze </span>
              <span className="text-[#888]">--gstin=27AAPFU0939F1ZV --period=Jun-2025</span>
            </p>
            <p>
              <span className="text-[#444]">→ </span>
              <span className="text-green-400">Fetching transactions... </span>
              <span className="text-[#444]">142 records found</span>
            </p>
            <p>
              <span className="text-[#444]">→ </span>
              <span className="text-blue-400">Computing tax liability... </span>
              <span className="text-[#444]">CGST ₹42,180 · IGST ₹68,400</span>
            </p>
            <p>
              <span className="text-[#444]">→ </span>
              <span className="text-yellow-400">Compliance check... </span>
              <span className="text-[#444]">2 discrepancies flagged</span>
            </p>
            <p>
              <span className="text-[#444]">→ </span>
              <span className="text-green-400">GSTR-1 ready </span>
              <span className="text-[#444]">· PDF + JSON export available</span>
            </p>
            <p className="mt-1">
              <span className="text-[#444]">$ </span>
              <span className="animate-pulse text-[#FF5C1A]">█</span>
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-[#1A1A1A]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3">
          {[
            {
              num: "01",
              icon: ReceiptText,
              title: "GST filing",
              desc: "Auto-calculate GSTR-1, GSTR-3B from raw transactions. Export as PDF or JSON.",
            },
            {
              num: "02",
              icon: FileCheck,
              title: "Legal documents",
              desc: "AI-drafted notices, agreements, and checklists. Hindi and English output.",
            },
            {
              num: "03",
              icon: BellRing,
              title: "Deadline tracking",
              desc: "Never miss a filing date. Smart reminders before every compliance deadline.",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className={`px-6 md:px-10 py-8 md:py-10 hover:bg-[#0D0D0D] transition-colors border-b md:border-b-0 border-[#1A1A1A] ${i !== 2 ? "md:border-r md:border-[#1A1A1A]" : ""}`}
            >
              <p className="text-[11px] text-[#2A2A2A] font-mono mb-6">{feat.num}</p>
              <div className="w-9 h-9 rounded-lg border border-[#1E1E1E] flex items-center justify-center mb-5">
                <feat.icon size={18} className="text-[#FF5C1A]" />
              </div>
              <h3 className="text-sm font-medium text-[#CCC] mb-2">{feat.title}</h3>
              <p className="text-xs text-[#444] leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="how-it-works" className="bg-[#0D0D0D] border-t border-[#1A1A1A] px-6 md:px-10 py-10">
        <div className="max-w-5xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <span className="text-xs text-[#333] font-mono">{`// compliance_dashboard.tsx`}</span>
            <div className="flex items-center gap-2 text-xs text-green-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
              Live
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "GST FILED", value: "₹2.4L", sub: "+12% this month", icon: TrendingUp, positive: true },
              { label: "DOCUMENTS", value: "7", sub: "3 this week", icon: FileCheck, positive: true },
              { label: "NEXT DEADLINE", value: "4d", sub: "GSTR-3B due", icon: Clock, positive: false },
              { label: "COMPLIANCE", value: "100%", sub: "All clear", icon: ShieldCheck, positive: true },
            ].map((card) => (
              <div key={card.label} className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl p-4">
                <p className="text-[10px] text-[#333] uppercase tracking-widest font-mono mb-3">{card.label}</p>
                <p className="text-2xl font-semibold text-[#E0DDD6] tracking-tight mb-1">{card.value}</p>
                <p className={`text-[11px] font-mono flex items-center gap-1 ${card.positive ? "text-green-500" : "text-yellow-400"}`}>
                  <card.icon size={10} />
                  {card.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Filing Rows */}
          {[
            { name: "GSTR-1", period: "Jun 2025", amount: "₹84,200", status: "FILED", color: "text-green-400 bg-green-950 border-green-900" },
            { name: "GSTR-3B", period: "Jun 2025", amount: "₹1,12,400", status: "PENDING", color: "text-yellow-400 bg-yellow-950 border-yellow-900" },
            { name: "TDS Return", period: "Q1 2025", amount: "₹28,600", status: "DUE SOON", color: "text-red-400 bg-red-950 border-red-900" },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between py-3.5 border-b border-[#1A1A1A] last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#111] border border-[#1E1E1E] flex items-center justify-center">
                  <ReceiptText size={14} className="text-[#444]" />
                </div>
                <div>
                  <p className="text-sm text-[#CCC] font-medium">{row.name}</p>
                  <p className="text-[11px] text-[#444] font-mono">{row.period}</p>
                </div>
              </div>
              <span className="text-sm text-[#666] font-mono">{row.amount}</span>
              <span className={`text-[10px] px-2.5 py-1 rounded border font-mono tracking-wider ${row.color}`}>
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="pricing" className="border-t border-[#1A1A1A]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#2A2A2A] font-mono">v1.0.0 · Made in India · Open source</span>
          <div className="flex items-center gap-2">
            <button className="text-xs text-[#FF5C1A] border border-[#FF5C1A] px-2.5 py-1 rounded font-mono hover:bg-[#FF5C1A] hover:text-white transition-colors">
              EN
            </button>
            <button className="text-xs text-[#444] border border-[#2A2A2A] px-2.5 py-1 rounded font-mono hover:border-[#444] hover:text-[#888] transition-colors">
              हिं
            </button>
          </div>
        </div>
      </footer>

    </main>
  )
}