import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GSTFilingForm } from "@/app/components/dashboard/GSTFilingForm";
import { db } from "@/lib/db";
import { ReceiptText } from "lucide-react";

export default async function GSTPage() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/login");

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      filings: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-[#0F1117]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#FF5C1A]/10 flex items-center justify-center">
            <ReceiptText size={16} className="text-[#FF5C1A]" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-white tracking-tight">
              GST Filing
            </h1>
            <p className="text-[11px] text-white/30 font-mono">
              Calculate and file your GST returns
            </p>
          </div>
        </div>
      </div>

    
    <div className="flex-1 px-8 py-6 flex flex-col gap-6 max-w-4xl">

        <div className="bg-[#FF5C1A]/5 border border-[#FF5C1A]/20 rounded-xl px-5 py-4">
        <p className="text-[13px] text-[#FF5C1A] font-medium mb-1">
            How GST calculation works
        </p>
        <p className="text-[12px] text-white/40 leading-relaxed">
            Intrastate (same state) → tax splits as CGST + SGST equally.
            Interstate (different state) → full tax as IGST.
            GST slabs: 0%, 5%, 12%, 18%, 28%. 
        </p>

        </div>
        <GSTFilingForm/>

        {user?.filings && user.filings.length >0 &&(
          <div className="bg-white/[0.02] border border-white/7 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5">
            <p className="text-[13px] font-medium text-white/70">
 Recent Filings
            </p>

            </div>
            <div className="px-5 py-2">
              {user.filings.map((filing,i)=>(
                <div
                key={filing.id}
                className="flex items-center justify-between py-3.5 border-b border-white/4 last:border-0"
                ><div>
                <p className="text-[13px] font-medium text-white/70">
{filing.period}
                </p>
                <p className="text-[10px] text-white/25 font-mono mt-0.5">
                  CGST: ₹{filing.cgst} · SGST: ₹{filing.sgst} · IGST: ₹{filing.igst}
                </p>
                </div>

                <div className="text-right">
                  <p className="text-[13px] text-white/50 font-mono">
                    ₹{filing.totalTaxableValue}
                  </p>
                  <span
                  className={`text-[10px] px-2 py-0.5 rounded-lg font-medium ${
                    filing.status === "filed"
                    ?"text-[#4ade80] bg-[#4ade80]/10"
                    :"text-[#fbbf24] bg-[#fbbf24]/10"
                  } `}
                  >
                    {filing.status}
                  </span>
</div>
                </div>
              ))}

            </div>

          </div>
        )}

    </div>
    </div>
  );
}
