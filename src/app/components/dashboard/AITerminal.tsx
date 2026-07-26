"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setTimeout } from "timers";

const lines = [
  {
    prefix: "$",
    command: "bc analyze",
    args: " --period=Jun-2025 --auto",
    type: "command",
    delay: 0,
  },
  {
    prefix: "→",
    command: "GSTR-1 filed",
    args: " · ₹84,200 · 0 discrepancies · on time",
    type: "success",
    delay: 700,
  },
  {
    prefix: "→",
    command: "GSTR-3B pending",
    args: " · ₹1,12,400 · due in 4 days",
    type: "warning",
    delay: 1400,
  },
  {
    prefix: "→",
    command: "ITC available",
    args: " · ₹18,400 input tax credit eligible",
    type: "info",
    delay: 2100,
  },
  {
    prefix: "→",
    command: "Penalty risk: ₹0",
    args: " · file GSTR-3B before Jul 20 to avoid penalty",
    type: "success",
    delay: 2800,
  },
];

const colors: Record<string, string> = {
  command: "text-[#FF7A1A]",
  success: "text-[#4ade80]",
  warning: "text-[#fbbf24]",
  info: "text-[#60a5fa]",
};

export function AITerminal() {
  const [visible, setVisible] = useState<number[]>([]);
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, i]);
      }, line.delay);
    });
    setTimeout(() => setCursor(true), 3200);
  }, []);

  return (
    <div className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden h-full">
      {/* {header} */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
          </div>
          <span className="text-[11px] text-white/20 font-mono">
            ai_assistant · Jun-2025
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse"></span>
          <span className="text-[10px] text-[#4ade80] font-mono">live</span>
        </div>
      </div>

      {/* terminal body */}
      <div className="px-5 py-5 font-mono text-[12px] leading-loose min-h-[180px]">
        <AnimatePresence>
          {lines.map((line, i) =>
            visible.includes(i) ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-3"
              >
                <span className="text-white/15 w-3 flex-shrink-0">
                  {line.prefix}
                </span>
                <span>
                  <span className={colors[line.type]}>{line.command}</span>
                  <span className="text-white/20">{line.args}</span>
                </span>
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
        {cursor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 mt-1"
          >
            <span className="text-white/15 w-3">$</span>
            <span className="animate-pulse text-[#FF5C1A]">█</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
