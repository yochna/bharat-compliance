import { Navbar } from "./components/marketing/Navbar";
import {
  ArrowRight,
  Rocket,
  Terminal,
  ReceiptText,
  FileCheck,
  BellRing,
  TrendingUp,
  ShieldCheck,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Button } from "./components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F0EDE6]">
      <Navbar />

      {/* hero */}
      <section className="max-w-5xl mx-auto px-10 pt-40 pb-20">
        {/* badge */}
        <div className="inline-flex items-centre gap-2 border border-[#2A2A2A] rounded px-3 py-1.5 text-[11px] text-[#888] uppercase tracking-widest mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          AI-powered · Bilingual · India-first
        </div>

        {/* heading */}
        <h1 className="text-6xl font-medium leading-[1.08] tracking-[-2px] mb-6">
          GST filing. <br />
          <span className="text-[#FF5C1A]">Legal docs.</span>
          <br />
          <span className="text-[#333]">Done.</span>
        </h1>

        {/* subheading */}
        <p className="text-base text-[#555] leading-relaxed max-w-md mb-10">
          Stop spending hours on compliance. BharatComply generates GST returns,
          legal notices, and vendor agreements in minutes — in English and
          Hindi.
        </p>

        {/* cta button */}
        <div className="flex items-centre gap-3 mb-20">
          <Button variant="primary" size="lg">
            <Rocket size={16} />
            Start for free
          </Button>
          <Button variant="ghost" size="lg">
            <Terminal size={16} />
            See how it works
          </Button>
        </div>

        {/* terminal block */}
        <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
          {/* terminal top bar */}
          <div className="flex items-centre gap-2 px-4 py-3 border-b  border-[#1A1A1A]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-[11px] text-[#444] font-mono">
              bharatcomply-AI analysis
            </span>
          </div>

          {/* terminal body */}
          <div className="px-6 py-5 font-mono text-xs leading-loose">
            <p>
              <span className="text-[#444]">$</span>
              <span className="text-[#FF5C1A]">analyze</span>
              <span className="text-[#CCC]">
                --gstin=27AAPFU0939F1ZV --period=Jun-2025
              </span>
            </p>
            <p>
              <span className="text-[#444]">→</span>
              <span className="texxt-blue-400">Computing tax liability...</span>
              <span className="text-[#444]">CGST ₹42,180 · IGST ₹68,400</span>
            </p>
            <p>
              <span className="text-[#444]">→ </span>
              <span className="text-yellow-400">Compliance check... </span>
              <span className="text-[#444]">2 discrepancies flagged</span>
            </p>
            <p>
              <span className="text-[#444]">→ </span>
              <span className="text-green-500">GSTR-1 ready </span>
              <span className="text-[#444]">· PDF + JSON export available</span>
            </p>
            <p className="mt-2">
              <span className="text-[#444]">$ </span>
              <span className="text-[#333] animate-pulse">_</span>
            </p>
          </div>
        </div>
      </section>

      {/* features */}
      <section id="features" className="border-t border-[#1A1A1A]">
        <div className="max-w-5xl mx-auto grid grid-cols-3">
          <div className="px-10 py-10 border-r border-[#1A1A1A]">
            <p className="text-[11px] text-[#333] font-momo mb-5">01</p>
            <div className="w-9 h-9 rounded-md border border-[#222] flex items-centre justify-centre mb-4">
              <ReceiptText size={18} className="text-[#FF5C1A]" />
            </div>
            <h3 className="text-sm font-medium text-[#E0DDD6]">GST filing</h3>
            <p className="text-xs text-[#444] leading-relaxed">
              Auto-calculate GSTR-1, GSTR-3B from raw transactions. Export as
              PDF or JSON.
            </p>
          </div>
          <div className="px-10 py-10 border-r border-[#1A1A1A]">
            <p className="text-[11px] text-[#333] font-momo mb-5">02</p>
            <div className="w-9 h-9 rounded-md border border-[#222] flex items-center justify-center mb-4">
              <FileCheck size={18} className="text-[#FF5C1A]" />
            </div>
            <h3 className="text-sm font-medium text-[#E0DDD6] mb-2">
              Legal documents
            </h3>
            <p className="text-xs text-[#444] leading-relaxed">
              AI-drafted notices, agreements, and checklists. Hindi and English
              output.
            </p>
          </div>

          <div className="px-10 py-10">
            <p className="text-[11px] text-[#333] font-momo mb-5">03</p>
            <div className="w-9 h-9 rounded-md border border-[#222] flex items-center justify-center mb-4">
              <BellRing size={18} className="text-[#FF5C1A]" />
            </div>
            <h3 className="text-sm font-medium text-[#E0DDD6] mb-2">
              Deadline tracking
            </h3>
            <p className="text-xs text-[#444] leading-relaxed">
              Never miss a filing date. Smart reminders before every compliance
              deadline.
            </p>
          </div>
        </div>
      </section>

      {/* dashboard preview */}
      <section className="bg-[#111] border-t border-[#1A1A1A] px-10 py-10">
        <div className="max-w-5xl mx-auto">
         {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs text-[#444] font-mono">{`// compliance_dashboard.tsx`}</span>
            <div className="flex items-center gap-2 text-xs text-green-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Live
            </div>
          </div>
          {/* Metric Cards */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: "GST filed", value: "₹2.4L", sub: "+12% this month", icon: TrendingUp, positive: true },
              { label: "Documents", value: "7", sub: "3 this week", icon: FileCheck, positive: true },
              { label: "Next deadline", value: "4d", sub: "GSTR-3B due", icon: Clock, positive: false },
              { label: "Compliance", value: "100%", sub: "All clear", icon: ShieldCheck, positive: true },
            ].map((card) => (
              <div key={card.label} className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-lg p-4">
                <p className="text-[10px] text-[#444] uppercase tracking-widest font-mono mb-2">{card.label}</p>
                <p className="text-2xl font-medium text-[#E0DDD6] tracking-tight">{card.value}</p>
                <p className={`text-[11px] mt-1 flex items-center gap-1 ${card.positive ? "text-green-500" : "text-yellow-400"}`}>
                  <card.icon size={10} />
                  {card.sub}
                </p>
              </div>
            ))}
          </div>

                    {/* Filing rows */}
          <div className="flex flex-col">
            {[
              { name: "GSTR-1", period: "Jun 2025", amount: "₹84,200", status: "FILED", color: "text-green-500 bg-[#0D2818] border-[#164530]" },
              { name: "GSTR-3B", period: "Jun 2025", amount: "₹1,12,400", status: "PENDING", color: "text-yellow-400 bg-[#1A1500] border-[#2A2200]" },
              { name: "TDS Return", period: "Q1 2025", amount: "₹28,600", status: "DUE SOON", color: "text-red-400 bg-[#1A0808] border-[#2A1010]" },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#1A1A1A] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-[#1A1A1A] flex items-center justify-center">
                    <ReceiptText size={13} className="text-[#555]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#CCC]">{row.name}</p>
                    <p className="text-[11px] text-[#444] font-mono">{row.period}</p>
                  </div>
                </div>
                <span className="text-sm text-[#888] font-mono">{row.amount}</span>
                <span className={`text-[10px] px-2 py-1 rounded border font-mono tracking-wide ${row.color}`}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* footer */}
      <footer className="border-t border-[#1A11A1A] px-10 py-5 flex items-center justify-center max-w-5xl mx-auto">
       <span className="text-xs text-[#333] font-momo">v1.0.0 · Made in India · Open source</span>
       <div className="flex items-center gap-2">
        <button className="text-xs text-[#FF5C1A] border border-[#FF5C1A] px-2.5 py-1 rounded font-momo">EN</button>
        <button className="text-xs text-[#444] border border-[#2A2A2A] px-2.5 py-1 rounded font-momo">हिं</button>
       </div>
      </footer>
    </main>
  );
}
