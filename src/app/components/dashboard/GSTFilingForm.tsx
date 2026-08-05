"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, Trash2, Calculator, CheckCircle } from "lucide-react"
import { formatINR } from "@/lib/gst"

const transactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  gstSlab: z.enum(["0", "5", "12", "18", "28"]),
  transactionType: z.enum(["intrastate", "interstate"]),
})

const formSchema = z.object({
  period: z.string().min(1, "Period is required"),
  transactions: z.array(transactionSchema).min(1, "Add at least one transaction"),
})

type FormData = z.infer<typeof formSchema>

interface CalculationResult {
  description: string
  taxableAmount: number
  gstSlab: number
  cgst: number
  sgst: number
  igst: number
  totalTax: number
  totalAmount: number
  transactionType: string
}

interface FilingResult {
  calculations: {
    transactions: CalculationResult[]
    totalTaxableValue: number
    totalCGST: number
    totalSGST: number
    totalIGST: number
    totalTax: number
    grandTotal: number
  }
}

export function GSTFilingForm() {
  const [result, setResult] = useState<FilingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      period: "",
      transactions: [
        {
          description: "",
          amount: 0,
          gstSlab: "18",
          transactionType: "intrastate",
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transactions",
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError("")
    setResult(null)
    setSaved(false)

    try {
      const response = await fetch("/api/gst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          period: data.period,
          transactions: data.transactions.map((t) => ({
            ...t,
            amount: Number(t.amount),
            gstSlab: Number(t.gstSlab),
          })),
        }),
      })

      const json = await response.json()

      if (!response.ok) {
        setError(json.error || "Something went wrong")
        return
      }

      setResult(json)
      setSaved(true)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Form */}
      <div className="bg-[#0D0D1A] border border-[#ffffff0f] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#ffffff08]">
          <p className="text-[13px] font-medium text-white/70">
            New GST Calculation
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 flex flex-col gap-5">

          {/* Period */}
          <div>
            <label className="text-[11px] text-white/40 mb-2 block uppercase tracking-widest font-mono">
              Filing Period
            </label>
            <input
              {...register("period")}
              placeholder="e.g. Aug 2025"
              className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#ffffff33] outline-none focus:border-[#FF5C1A] transition-colors"
            />
            {errors.period && (
              <p className="text-[11px] text-red-400 mt-1">{errors.period.message}</p>
            )}
          </div>

          {/* Transactions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-[11px] text-white/40 uppercase tracking-widest font-mono">
                Transactions
              </label>
              <button
                type="button"
                onClick={() => append({
                  description: "",
                  amount: 0,
                  gstSlab: "18",
                  transactionType: "intrastate",
                })}
                className="flex items-center gap-1.5 text-[11px] text-[#FF5C1A] hover:text-[#FF7A1A] transition-colors"
              >
                <Plus size={13} />
                Add transaction
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-[#13131F] border border-[#ffffff0f] rounded-xl p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-white/25 font-mono">
                      Transaction {index + 1}
                    </span>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-white/20 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    {/* Description */}
                    <div className="col-span-2">
                      <input
                        {...register(`transactions.${index}.description`)}
                        placeholder="Description (e.g. Web development services)"
                        className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#ffffff33] outline-none focus:border-[#FF5C1A] transition-colors"
                      />
                      {errors.transactions?.[index]?.description && (
                        <p className="text-[10px] text-red-400 mt-1">
                          {errors.transactions[index]?.description?.message}
                        </p>
                      )}
                    </div>

                    {/* Amount */}
                    <div>
                      <input
                        {...register(`transactions.${index}.amount`, { valueAsNumber: true })}
                        type="number"
                        placeholder="Amount (₹)"
                        className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#ffffff33] outline-none focus:border-[#FF5C1A] transition-colors"
                      />
                    </div>

                    {/* GST Slab */}
                    <div>
                      <select
                        {...register(`transactions.${index}.gstSlab`)}
                        className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#FF5C1A] transition-colors"
                      >
                        <option value="0">0% GST (Exempt)</option>
                        <option value="5">5% GST (Essential)</option>
                        <option value="12">12% GST (Standard)</option>
                        <option value="18">18% GST (Services)</option>
                        <option value="28">28% GST (Luxury)</option>
                      </select>
                    </div>

                    {/* Transaction type */}
                    <div className="col-span-2">
                      <select
                        {...register(`transactions.${index}.transactionType`)}
                        className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#FF5C1A] transition-colors"
                      >
                        <option value="intrastate">
                          Intrastate — Same state (CGST + SGST)
                        </option>
                        <option value="interstate">
                          Interstate — Different state (IGST only)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-[12px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5C1A] to-[#FF7A1A] text-white text-sm font-medium px-6 py-3 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calculator size={15} />
            {loading ? "Calculating..." : "Calculate GST"}
          </button>
        </form>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-[#0D0D1A] border border-[#ffffff0f] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#ffffff08]">
            <p className="text-[13px] font-medium text-white/70">
              Calculation Results
            </p>
            {saved && (
              <div className="flex items-center gap-1.5 text-[11px] text-[#4ade80]">
                <CheckCircle size={13} />
                Saved to database
              </div>
            )}
          </div>

          <div className="px-6 py-5 flex flex-col gap-4">

            {/* Per transaction breakdown */}
            {result.calculations.transactions.map((t, i) => (
              <div
                key={i}
                className="bg-[#13131F] border border-[#ffffff0f] rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[13px] font-medium text-white/70">{t.description}</p>
                  <span className="text-[11px] text-white/30 font-mono bg-[#1A1A2E] px-2 py-1 rounded-lg">
                    {t.gstSlab}% GST
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <p className="text-[10px] text-white/25 mb-1 font-mono">Taxable</p>
                    <p className="text-[13px] text-white/70 font-mono">{formatINR(t.taxableAmount)}</p>
                  </div>
                  {t.transactionType === "intrastate" ? (
                    <>
                      <div>
                        <p className="text-[10px] text-white/25 mb-1 font-mono">CGST</p>
                        <p className="text-[13px] text-[#60a5fa] font-mono">{formatINR(t.cgst)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/25 mb-1 font-mono">SGST</p>
                        <p className="text-[13px] text-[#60a5fa] font-mono">{formatINR(t.sgst)}</p>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-2">
                      <p className="text-[10px] text-white/25 mb-1 font-mono">IGST</p>
                      <p className="text-[13px] text-[#fbbf24] font-mono">{formatINR(t.igst)}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] text-white/25 mb-1 font-mono">Total</p>
                    <p className="text-[13px] text-[#4ade80] font-mono">{formatINR(t.totalAmount)}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Grand totals */}
            <div className="bg-gradient-to-r from-[#FF5C1A]/10 to-transparent border border-[#FF5C1A]/20 rounded-xl p-5">
              <p className="text-[11px] text-[#FF5C1A] font-mono mb-4 uppercase tracking-widest">
                Filing Summary
              </p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-[10px] text-white/30 mb-1 font-mono">Total Taxable</p>
                  <p className="text-xl font-bold text-white font-mono">
                    {formatINR(result.calculations.totalTaxableValue)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 mb-1 font-mono">Total Tax</p>
                  <p className="text-xl font-bold text-[#fbbf24] font-mono">
                    {formatINR(result.calculations.totalTax)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 mb-1 font-mono">Grand Total</p>
                  <p className="text-xl font-bold text-[#4ade80] font-mono">
                    {formatINR(result.calculations.grandTotal)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-white/20 mb-0.5 font-mono">CGST</p>
                  <p className="text-[13px] text-[#60a5fa] font-mono">
                    {formatINR(result.calculations.totalCGST)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/20 mb-0.5 font-mono">SGST</p>
                  <p className="text-[13px] text-[#60a5fa] font-mono">
                    {formatINR(result.calculations.totalSGST)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/20 mb-0.5 font-mono">IGST</p>
                  <p className="text-[13px] text-[#fbbf24] font-mono">
                    {formatINR(result.calculations.totalIGST)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}