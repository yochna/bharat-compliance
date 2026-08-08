import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { db } from "@/lib/db"
import { generateDocument, DocumentType, Language } from "@/lib/ai"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { type, language, partyA, partyB, details, amount, date } = body as {
      type: DocumentType
      language: Language
      partyA: string
      partyB: string
      details: string
      amount?: string
      date?: string
    }

    if (!type || !partyA || !partyB || !details) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const generatedContent = await generateDocument({
      type,
      language,
      partyA,
      partyB,
      details,
      amount,
      date,
    })

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const typeLabels: Record<DocumentType, string> = {
      legal_notice: "Legal Notice",
      vendor_agreement: "Vendor Agreement",
      nda: "Non-Disclosure Agreement",
      employment_letter: "Employment Letter",
      payment_reminder: "Payment Reminder",
      compliance_checklist: "Compliance Checklist",
    }

    const document = await db.legalDocument.create({
      data: {
        userId: user.id,
        type,
        title: `${typeLabels[type]} — ${partyA} vs ${partyB}`,
        content: generatedContent,
        language,
      },
    })

    return NextResponse.json({
      success: true,
      document,
      content: generatedContent,
    })
  } catch (error) {
    console.error("Document generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate document. Please try again." },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const documents = await db.legalDocument.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ documents })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}