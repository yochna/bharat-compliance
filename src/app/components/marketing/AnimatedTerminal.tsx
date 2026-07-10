"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const lines = [
  {
    prefix: "$ ",
    prefixColor: "text-[#444]",
    content: "analyze ",
    contentColor: "text-[#FF5C1A]",
    suffix: "--gstin=27AAPFU0939F1ZV --period=Jun-2025",
    suffixColor: "text-[#888]",
    delay: 0,
  },
  {
    prefix: "→ ",
    prefixColor: "text-[#444]",
    content: "Fetching transactions... ",
    contentColor: "text-green-400",
    suffix: "142 records found",
    suffixColor: "text-[#444]",
    delay: 800,
  },
  {
    prefix: "→ ",
    prefixColor: "text-[#444]",
    content: "Computing tax liability... ",
    contentColor: "text-blue-400",
    suffix: "CGST ₹42,180 · IGST ₹68,400",
    suffixColor: "text-[#444]",
    delay: 1600,
  },
  {
    prefix: "→ ",
    prefixColor: "text-[#444]",
    content: "Compliance check... ",
    contentColor: "text-yellow-400",
    suffix: "2 discrepancies flagged",
    suffixColor: "text-[#444]",
    delay: 2400,
  },
  {
    prefix: "→ ",
    prefixColor: "text-[#444]",
    content: "GSTR-1 ready ",
    contentColor: "text-green-400",
    suffix: "· PDF + JSON export available",
    suffixColor: "text-[#444]",
    delay: 3200,
  },
];

export function AnimateTerminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });
    setTimeout(() => setShowCursor(true), 3600);
  }, []);

  return (
    <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-[#1A1A1A]">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57] inline-block"></span>
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
        <span className="w-3 h-3 rounded-full bg-[#28C840] inline-block"></span>
        <span className="ml-4 text-[#444] font-mono tracking-wide">
          bharatcomply-AI analysis
        </span>
      </div>

      {/* {terminal body} */}
      <div>
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={
              visibleLines.includes(i)
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -8 }
            }
            transition={{ duration: 0.3 }}
          >
            <span className={line.prefixColor}>{line.prefix}</span>
            <span className={line.contentColor}>{line.content}</span>
            <span className={line.suffixColor}>{line.suffix}</span>
          </motion.p>
        ))}
        {showCursor && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-1"
          >
            <span className="text-[#444]">$</span>

            <span className="animate-pulse text-[#FF5C1A]">█</span>
          </motion.p>
        )}
      </div>
    </div>
  );
}
