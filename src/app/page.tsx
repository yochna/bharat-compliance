"use client"

import { Navbar } from "./components/marketing/Navbar"
import { AnimateTerminal } from "./components/marketing/AnimatedTerminal"
import { AnimateIn } from "./components/ui/AnimateIn"
import { CountUp } from "./components/ui/CountUp"
import Link from "next/link"
import { motion } from "framer-motion"
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
      <section className="max-w-5xl mx-auto px-6 md:px-10 pt-36 pb-12">

        {/* Badge */}
        <AnimateIn delay={0.1}>
          <div className="inline-flex items-center gap-2 border border-[#2A2A2A] rounded px-3 py-1.5 text-[11px] text-[#666] uppercase tracking-widest mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            AI-powered · Bilingual · India-first
          </div>
        </AnimateIn>

        {/* Heading — each line animates separately */}
        <div className="mb-6">
          <AnimateIn delay={0.2}>
            <h1 className="text-[52px] md:text-[80px] font-bold leading-[1.05] tracking-[-2px] md:tracking-[-4px]">
              GST filing.
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.35}>
            <h1 className="text-[52px] md:text-[80px] font-bold leading-[1.05] tracking-[-2px] md:tracking-[-4px] text-[#FF5C1A]">
              Legal docs.
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.5}>
            <h1 className="text-[52px] md:text-[80px] font-bold leading-[1.05] tracking-[-2px] md:tracking-[-4px] text-[#2A2A2A]">
              Done.
            </h1>
          </AnimateIn>
        </div>

        {/* Subheading */}
        <AnimateIn delay={0.65}>
          <p className="text-base text-[#555] leading-relaxed max-w-md mb-10">
            Stop spending hours on compliance. BharatComply generates GST
            returns, legal notices, and vendor agreements in minutes — in
            English and Hindi.
          </p>
        </AnimateIn>

        {/* CTA Buttons */}
        <AnimateIn delay={0.75}>
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="primary" size="lg">
                <Rocket size={15} />
                Start for free
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="ghost" size="lg">
                <Terminal size={15} />
                See how it works
              </Button>
            </motion.div>
          </div>
        </AnimateIn>

        {/* Stats Bar */}
        <AnimateIn delay={0.85}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#1E1E1E] rounded-xl overflow-hidden mb-10">
            {[
              { value: 12000, label: "Businesses served", prefix: "", suffix: "+" },
              { value: 98, label: "Filing accuracy", prefix: "", suffix: "%" },
              { value: 4, label: "Avg. time to file", prefix: "", suffix: " min" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`py-5 text-center bg-[#0D0D0D] border-r border-[#1E1E1E]`}
              >
                <p className="text-xl font-semibold text-[#F0EDE6] tracking-tight">
                  <CountUp
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-[11px] text-[#444] mt-1 font-mono">
                  {stat.label}
                </p>
              </div>
            ))}
            <div className="py-5 text-center bg-[#0D0D0D]">
              <p className="text-xl font-semibold text-[#F0EDE6] tracking-tight">
                EN + हिं
              </p>
              <p className="text-[11px] text-[#444] mt-1 font-mono">
                Bilingual AI
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Animated Terminal */}
        <AnimateIn delay={0.95}>
          <AnimateTerminal />
        </AnimateIn>
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ backgroundColor: "rgba(13,13,13,1)" }}
              className={`px-6 md:px-10 py-8 md:py-10 transition-colors border-b md:border-b-0 border-[#1A1A1A] cursor-default ${
                i !== 2 ? "md:border-r md:border-[#1A1A1A]" : ""
              }`}
            >
              <p className="text-[11px] text-[#2A2A2A] font-mono mb-6">
                {feat.num}
              </p>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-9 h-9 rounded-lg border border-[#1E1E1E] flex items-center justify-center mb-5 w-fit"
              >
                <feat.icon size={18} className="text-[#FF5C1A]" />
              </motion.div>
              <h3 className="text-sm font-medium text-[#CCC] mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-[#444] leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section
        id="how-it-works"
        className="bg-[#0D0D0D] border-t border-[#1A1A1A] px-6 md:px-10 py-10"
      >
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
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: "#2A2A2A" }}
                className="bg-[#0A0A0A] border border-[#1E1E1E] rounded-xl p-4 cursor-default"
              >
                <p className="text-[10px] text-[#333] uppercase tracking-widest font-mono mb-3">
                  {card.label}
                </p>
                <p className="text-2xl font-semibold text-[#E0DDD6] tracking-tight mb-1">
                  {card.value}
                </p>
                <p className={`text-[11px] font-mono flex items-center gap-1 ${card.positive ? "text-green-500" : "text-yellow-400"}`}>
                  <card.icon size={10} />
                  {card.sub}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Filing Rows */}
          {[
            { name: "GSTR-1", period: "Jun 2025", amount: "₹84,200", status: "FILED", color: "text-green-400 bg-green-950 border-green-900" },
            { name: "GSTR-3B", period: "Jun 2025", amount: "₹1,12,400", status: "PENDING", color: "text-yellow-400 bg-yellow-950 border-yellow-900" },
            { name: "TDS Return", period: "Q1 2025", amount: "₹28,600", status: "DUE SOON", color: "text-red-400 bg-red-950 border-red-900" },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ backgroundColor: "rgba(17,17,17,1)" }}
              className="flex items-center justify-between py-3.5 border-b border-[#1A1A1A] last:border-0 transition-colors"
            >
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
            </motion.div>
          ))}
        </div>
      </section>
{/* Pricing */}
<section id="pricing" className="border-t border-[#1A1A1A] px-6 md:px-10 py-20">
  <div className="max-w-5xl mx-auto">

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-14"
    >
      <div className="inline-flex items-center gap-2 border border-[#2A2A2A] rounded px-3 py-1.5 text-[11px] text-[#666] uppercase tracking-widest mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C1A] inline-block"></span>
        Simple pricing
      </div>
      <h2 className="text-4xl font-bold text-[#F0EDE6] tracking-tight mb-4">
        Start free. Scale when ready.
      </h2>
      <p className="text-sm text-[#555] max-w-md mx-auto">
        No credit card required. Cancel anytime.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        {
          name: "Free",
          price: "₹0",
          period: "forever",
          desc: "Perfect for getting started",
          features: [
            "5 GST filings/month",
            "3 legal documents",
            "Deadline reminders",
            "Email support",
          ],
          cta: "Get started",
          highlighted: false,
        },
        {
          name: "Pro",
          price: "₹499",
          period: "per month",
          desc: "For growing businesses",
          features: [
            "Unlimited GST filings",
            "Unlimited documents",
            "AI analysis",
            "Hindi + English",
            "Priority support",
          ],
          cta: "Start Pro",
          highlighted: true,
        },
        {
          name: "Business",
          price: "₹1,499",
          period: "per month",
          desc: "For teams and enterprises",
          features: [
            "Everything in Pro",
            "5 team members",
            "API access",
            "Custom documents",
            "Dedicated support",
          ],
          cta: "Contact us",
          highlighted: false,
        },
      ].map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={`rounded-2xl p-6 border transition-colors ${
            plan.highlighted
              ? "bg-[#FF5C1A] border-[#FF5C1A]"
              : "bg-[#0D0D0D] border-[#1E1E1E] hover:border-[#2A2A2A]"
          }`}
        >
          <div className="mb-6">
            <p className={`text-xs font-mono uppercase tracking-widest mb-3 ${
              plan.highlighted ? "text-white/70" : "text-[#444]"
            }`}>
              {plan.name}
            </p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className={`text-4xl font-bold tracking-tight ${
                plan.highlighted ? "text-white" : "text-[#F0EDE6]"
              }`}>
                {plan.price}
              </span>
              <span className={`text-sm ${
                plan.highlighted ? "text-white/60" : "text-[#444]"
              }`}>
                /{plan.period}
              </span>
            </div>
            <p className={`text-xs ${
              plan.highlighted ? "text-white/60" : "text-[#555]"
            }`}>
              {plan.desc}
            </p>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                  plan.highlighted ? "bg-white/20" : "bg-[#1A1A1A]"
                }`}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4L3 6L7 2" stroke={plan.highlighted ? "white" : "#FF5C1A"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className={`text-xs ${
                  plan.highlighted ? "text-white/80" : "text-[#555]"
                }`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                plan.highlighted
                  ? "bg-white text-[#FF5C1A] hover:bg-white/90"
                  : "bg-[#1A1A1A] text-[#CCC] border border-[#2A2A2A] hover:border-[#FF5C1A] hover:text-[#FF5C1A]"
              }`}
            >
              {plan.cta}
            </motion.button>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      {/* Footer */}
      <footer  className="border-t border-[#1A1A1A]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#2A2A2A] font-mono">
            v1.0.0 · Made in India · Open source
          </span>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs text-[#FF5C1A] border border-[#FF5C1A] px-2.5 py-1 rounded font-mono hover:bg-[#FF5C1A] hover:text-white transition-colors"
            >
              EN
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs text-[#444] border border-[#2A2A2A] px-2.5 py-1 rounded font-mono hover:border-[#444] hover:text-[#888] transition-colors"
            >
              हिं
            </motion.button>
          </div>
        </div>
      </footer>
    </main>
  )
}