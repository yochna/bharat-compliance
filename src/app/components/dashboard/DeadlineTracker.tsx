"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  BellRing,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  X,
} from "lucide-react"

interface Deadline {
  id: string
  title: string
  dueDate: string
  type: string
  status: string
}

interface StandardDeadline {
  title: string
  dueDate: string
  type: string
  description: string
}

interface DeadlineTrackerProps {
  initialDeadlines: Deadline[]
  initialStandardDeadlines: StandardDeadline[]
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dueDate: z.string().min(1, "Due date is required"),
  type: z.enum(["gst", "tds", "roc", "other"]),
})

type FormData = z.infer<typeof formSchema>

function getDaysUntil(dateStr: string): number {
  const now = new Date()
  const due = new Date(dateStr)
  const diff = due.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function getUrgencyColor(days: number, status: string) {
  if (status === "completed") return {
    bg: "bg-[#4ade80]/10",
    border: "border-[#4ade80]/20",
    text: "text-[#4ade80]",
    badge: "bg-[#4ade80]/10 text-[#4ade80]",
    dot: "bg-[#4ade80]",
  }
  if (days < 0 || days <= 5) return {
    bg: "bg-[#f87171]/5",
    border: "border-[#f87171]/20",
    text: "text-[#f87171]",
    badge: "bg-[#f87171]/10 text-[#f87171]",
    dot: "bg-[#f87171]",
  }
  if (days <= 15) return {
    bg: "bg-[#fbbf24]/5",
    border: "border-[#fbbf24]/20",
    text: "text-[#fbbf24]",
    badge: "bg-[#fbbf24]/10 text-[#fbbf24]",
    dot: "bg-[#fbbf24]",
  }
  return {
    bg: "bg-[#4ade80]/5",
    border: "border-[#4ade80]/20",
    text: "text-[#4ade80]",
    badge: "bg-[#4ade80]/10 text-[#4ade80]",
    dot: "bg-[#4ade80]",
  }
}

function getUrgencyLabel(days: number, status: string): string {
  if (status === "completed") return "Completed"
  if (days < 0) return `${Math.abs(days)}d overdue`
  if (days === 0) return "Due today"
  if (days === 1) return "Due tomorrow"
  return `${days}d left`
}

export function DeadlineTracker({
  initialDeadlines,
  initialStandardDeadlines,
}: DeadlineTrackerProps) {
  const [deadlines, setDeadlines] = useState<Deadline[]>(initialDeadlines)
  const [standardDeadlines] = useState<StandardDeadline[]>(initialStandardDeadlines)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all")

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { type: "gst" },
  })

  const refreshDeadlines = async () => {
    try {
      const res = await fetch("/api/deadlines")
      const data = await res.json()
      setDeadlines(data.deadlines || [])
    } catch (err) {
      console.error(err)
    }
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const res = await fetch("/api/deadlines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        await refreshDeadlines()
        reset()
        setShowForm(false)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const markComplete = async (id: string) => {
    try {
      await fetch("/api/deadlines", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "completed" }),
      })
      await refreshDeadlines()
    } catch (err) {
      console.error(err)
    }
  }

  const filteredDeadlines = deadlines.filter((d) => {
    if (filter === "upcoming") return d.status !== "completed"
    if (filter === "completed") return d.status === "completed"
    return true
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Standard deadlines this month */}
      <div className="bg-[#0D0D1A] border border-[#ffffff0f] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#ffffff08]">
          <p className="text-[11px] text-white/40 uppercase tracking-widest font-mono">
            Standard GST Deadlines · This Month
          </p>
        </div>
        <div className="px-6 py-4 grid grid-cols-3 gap-4">
          {standardDeadlines.map((deadline, i) => {
            const days = getDaysUntil(deadline.dueDate)
            const colors = getUrgencyColor(days, "upcoming")
            return (
              <div
                key={i}
                className={`${colors.bg} border ${colors.border} rounded-xl p-4`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                  <span className={`text-[10px] font-mono ${colors.text}`}>
                    {getUrgencyLabel(days, "upcoming")}
                  </span>
                </div>
                <p className="text-[13px] font-medium text-white/80 mb-1">
                  {deadline.title}
                </p>
                <p className="text-[10px] text-white/30">{deadline.description}</p>
                <p className="text-[11px] text-white/40 font-mono mt-2">
                  {new Date(deadline.dueDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Custom deadlines */}
      <div className="bg-[#0D0D1A] border border-[#ffffff0f] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ffffff08]">
          <p className="text-[13px] font-medium text-white/70">
            My Deadlines
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#13131F] border border-[#ffffff0f] rounded-lg p-1">
              {(["all", "upcoming", "completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-md text-[11px] transition-all capitalize ${
                    filter === f
                      ? "bg-[#FF5C1A] text-white"
                      : "text-white/30 hover:text-white/60"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-1.5 text-[11px] text-[#FF5C1A] hover:text-[#FF7A1A] transition-colors"
            >
              {showForm ? <X size={13} /> : <Plus size={13} />}
              {showForm ? "Cancel" : "Add deadline"}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="px-6 py-4 border-b border-[#ffffff08] bg-[#13131F]">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <input
                    {...register("title")}
                    placeholder="Deadline title"
                    className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#ffffff33] outline-none focus:border-[#FF5C1A] transition-colors"
                  />
                  {errors.title && (
                    <p className="text-[10px] text-red-400 mt-1">{errors.title.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("dueDate")}
                    type="date"
                    className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#FF5C1A] transition-colors"
                  />
                </div>
                <div>
                  <select
                    {...register("type")}
                    className="w-full bg-[#1A1A2E] border border-[#ffffff14] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#FF5C1A] transition-colors"
                  >
                    <option value="gst">GST</option>
                    <option value="tds">TDS</option>
                    <option value="roc">ROC</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5C1A] to-[#FF7A1A] text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-50"
              >
                <BellRing size={14} />
                {submitting ? "Adding..." : "Add Deadline"}
              </button>
            </form>
          </div>
        )}

        <div className="px-6 py-2">
          {filteredDeadlines.length === 0 ? (
            <div className="py-10 text-center">
              <Calendar size={32} className="text-white/10 mx-auto mb-3" />
              <p className="text-[13px] text-white/20 mb-2">No deadlines yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-[12px] text-[#FF5C1A] hover:text-[#FF7A1A] transition-colors"
              >
                Add your first deadline →
              </button>
            </div>
          ) : (
            filteredDeadlines.map((deadline) => {
              const days = getDaysUntil(deadline.dueDate)
              const colors = getUrgencyColor(days, deadline.status)
              return (
                <div
                  key={deadline.id}
                  className="flex items-center gap-4 py-4 border-b border-white/4 last:border-0"
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${colors.dot}`} />

                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-white/70">
                      {deadline.title}
                    </p>
                    <p className="text-[10px] text-white/25 font-mono mt-0.5">
                      {new Date(deadline.dueDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })} · {deadline.type.toUpperCase()}
                    </p>
                  </div>

                  <span className={`text-[11px] px-2.5 py-1 rounded-lg font-mono ${colors.badge}`}>
                    {getUrgencyLabel(days, deadline.status)}
                  </span>

                  {deadline.status !== "completed" && (
                    <button
                      onClick={() => markComplete(deadline.id)}
                      className="text-white/20 hover:text-[#4ade80] transition-colors"
                      title="Mark as complete"
                    >
                      <CheckCircle size={16} />
                    </button>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            icon: AlertTriangle,
            label: "Overdue",
            value: deadlines.filter(d =>
              getDaysUntil(d.dueDate) < 0 && d.status !== "completed"
            ).length,
            color: "text-[#f87171]",
            bg: "bg-[#f87171]/10",
          },
          {
            icon: Clock,
            label: "Due this week",
            value: deadlines.filter(d => {
              const days = getDaysUntil(d.dueDate)
              return days >= 0 && days <= 7 && d.status !== "completed"
            }).length,
            color: "text-[#fbbf24]",
            bg: "bg-[#fbbf24]/10",
          },
          {
            icon: CheckCircle,
            label: "Completed",
            value: deadlines.filter(d => d.status === "completed").length,
            color: "text-[#4ade80]",
            bg: "bg-[#4ade80]/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#0D0D1A] border border-[#ffffff0f] rounded-2xl p-5 flex items-center gap-4"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon size={18} className={stat.color} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[11px] text-white/30">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}