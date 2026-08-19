"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FileCheck,
  Sparkles,
  Copy,
  CheckCheck,
  Languages,
  Download,
} from "lucide-react";

const formSchema = z.object({
  type: z.enum([
    "legal_notice",
    "vendor_agreement",
    "nda",
    "employment_letter",
    "payment_reminder",
    "compliance_checklist",
  ]),
  language: z.enum(["en", "hi"]),
  partyA: z.string().min(1, "Required"),
  partyB: z.string().min(1, "Required"),
  details: z.string().min(10, "Please provide more details"),
  amount: z.string().optional(),
  date: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const documentTypes = [
  { value: "legal_notice", label: "Legal Notice", desc: "Formal legal demand" },
  {
    value: "vendor_agreement",
    label: "Vendor Agreement",
    desc: "Service/goods contract",
  },
  { value: "nda", label: "NDA", desc: "Non-disclosure agreement" },
  {
    value: "employment_letter",
    label: "Employment Letter",
    desc: "Job offer letter",
  },
  {
    value: "payment_reminder",
    label: "Payment Reminder",
    desc: "Invoice follow-up",
  },
  {
    value: "compliance_checklist",
    label: "Compliance Checklist",
    desc: "GST/tax checklist",
  },
];

export function DocumentGenerator() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedType, setSelectedType] = useState("legal_notice");
  const [downloading, setDownloading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "legal_notice",
      language: "en",
      partyA: "",
      partyB: "",
      details: "",
      amount: "",
      date: "",
    },
  });

  const language = watch("language");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Something went wrong");
        return;
      }

      setResult(json.content);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPDF = async () => {
    if (!result) return;
    setDownloading(true);

    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: result,
          title: `${documentTypes.find((d) => d.value === selectedType)?.label} — Document`,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bharatcomply-document.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Document type selector */}
      <div className="bg-[#0D0D1A] border border-[#ffffff0f] rounded-2xl p-5">
        <p className="text-[11px] text-white/40 uppercase tracking-widest font-mono mb-4">
          Document Type
        </p>
        <div className="grid grid-cols-3 gap-2">
          {documentTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => {
                setSelectedType(type.value);
                setValue("type", type.value as FormData["type"]);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedType === type.value
                  ? "bg-[#FF5C1A]/10 border-[#FF5C1A]/40 text-white"
                  : "bg-[#13131F] border-[#ffffff0f] text-white/40 hover:border-[#ffffff1a] hover:text-white/60"
              }`}
            >
              <p className="text-[12px] font-medium mb-0.5">{type.label}</p>
              <p className="text-[10px] opacity-60">{type.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-[#0D0D1A] border border-[#ffffff0f] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ffffff08]">
          <p className="text-[13px] font-medium text-white/70">
            Document Details
          </p>

          {/* Language toggle */}
          <div className="flex items-center gap-1 bg-[#13131F] border border-[#ffffff0f] rounded-lg p-1">
            <button
              type="button"
              onClick={() => setValue("language", "en")}
              className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                language === "en"
                  ? "bg-[#FF5C1A] text-white"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setValue("language", "hi")}
              className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                language === "hi"
                  ? "bg-[#FF5C1A] text-white"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              हिं
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 py-5 flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] text-white/40 mb-2 block font-mono uppercase tracking-widest">
                Party A (Your name/company)
              </label>
              <input
                {...register("partyA")}
                placeholder="e.g. Yochna Technologies Pvt Ltd"
                className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#ffffff33] outline-none focus:border-[#FF5C1A] transition-colors"
              />
              {errors.partyA && (
                <p className="text-[10px] text-red-400 mt-1">
                  {errors.partyA.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-[11px] text-white/40 mb-2 block font-mono uppercase tracking-widest">
                Party B (Other party)
              </label>
              <input
                {...register("partyB")}
                placeholder="e.g. ABC Supplies Ltd"
                className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#ffffff33] outline-none focus:border-[#FF5C1A] transition-colors"
              />
              {errors.partyB && (
                <p className="text-[10px] text-red-400 mt-1">
                  {errors.partyB.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-[11px] text-white/40 mb-2 block font-mono uppercase tracking-widest">
              Details / Matter
            </label>
            <textarea
              {...register("details")}
              placeholder="Describe the matter in detail. e.g. Non-payment of invoice #INV-2025-001 for web development services delivered on June 15, 2025..."
              rows={3}
              className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#ffffff33] outline-none focus:border-[#FF5C1A] transition-colors resize-none"
            />
            {errors.details && (
              <p className="text-[10px] text-red-400 mt-1">
                {errors.details.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] text-white/40 mb-2 block font-mono uppercase tracking-widest">
                Amount (₹) — optional
              </label>
              <input
                {...register("amount")}
                placeholder="e.g. 50000"
                className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#ffffff33] outline-none focus:border-[#FF5C1A] transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] text-white/40 mb-2 block font-mono uppercase tracking-widest">
                Date — optional
              </label>
              <input
                {...register("date")}
                type="date"
                className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF5C1A] transition-colors"
              />
            </div>
          </div>

          {error && (
            <p className="text-[12px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5C1A] to-[#FF7A1A] text-white text-sm font-medium px-6 py-3 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={15} />
            {loading ? "Generating document..." : "Generate with AI"}
          </button>
        </form>
      </div>

      {/* Generated document */}
      {result && (
        <div className="bg-[#0D0D1A] border border-[#ffffff0f] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#ffffff08]">
            <div className="flex items-center gap-2">
              <FileCheck size={14} className="text-[#4ade80]" />
              <p className="text-[13px] font-medium text-white/70">
                Generated Document
              </p>
            </div>
            <div className="flex items-center gap-2">
              {language === "hi" && (
                <div className="flex items-center gap-1 text-[11px] text-[#60a5fa]">
                  <Languages size={12} />
                  Hindi
                </div>
              )}
              <button
                onClick={downloadPDF}
                disabled={downloading}
                className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white/70 transition-colors bg-[#13131F] border border-[#ffffff0f] px-3 py-1.5 rounded-lg disabled:opacity-50"
              >
                <Download size={12} />
                {downloading ? "Generating..." : "Download PDF"}
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white/70 transition-colors bg-[#13131F] border border-[#ffffff0f] px-3 py-1.5 rounded-lg"
              >
                {copied ? (
                  <>
                    <CheckCheck size={12} className="text-[#4ade80]" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="px-6 py-5">
            <pre className="text-[13px] text-white/70 whitespace-pre-wrap leading-relaxed font-sans">
              {result}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}