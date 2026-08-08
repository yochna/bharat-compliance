import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export type DocumentType =
  | "legal_notice"
  | "vendor_agreement"
  | "nda"
  | "employment_letter"
  | "payment_reminder"
  | "compliance_checklist"

export type Language = "en" | "hi"

interface DocumentParams {
  type: DocumentType
  language: Language
  partyA: string
  partyB: string
  details: string
  amount?: string
  date?: string
}

export function buildDocumentPrompt(params: DocumentParams): string {
  const { type, language, partyA, partyB, details, amount, date } = params

  const languageInstruction =
    language === "hi"
      ? "यह दस्तावेज़ हिंदी (देवनागरी लिपि) में तैयार करें। औपचारिक कानूनी हिंदी का उपयोग करें।"
      : "Generate this document in English. Use formal legal language."

  const documentTemplates: Record<DocumentType, string> = {
    legal_notice: `
      Generate a formal Legal Notice with:
      - From: ${partyA}
      - To: ${partyB}
      - Matter: ${details}
      ${amount ? `- Amount in dispute: ₹${amount}` : ""}
      ${date ? `- Date: ${date}` : ""}
      Include: subject line, formal greeting, facts, legal demand,
      consequence of non-compliance, signature block.
    `,
    vendor_agreement: `
      Generate a Vendor Agreement between:
      - Party A (Client): ${partyA}
      - Party B (Vendor): ${partyB}
      - Services/Goods: ${details}
      ${amount ? `- Contract Value: ₹${amount}` : ""}
      ${date ? `- Effective Date: ${date}` : ""}
      Include: parties, scope of work, payment terms,
      delivery terms, warranties, termination clause,
      governing law (Indian law), signature blocks.
    `,
    nda: `
      Generate a Non-Disclosure Agreement between:
      - Disclosing Party: ${partyA}
      - Receiving Party: ${partyB}
      - Confidential Information: ${details}
      ${date ? `- Effective Date: ${date}` : ""}
      Include: definition of confidential information,
      obligations, exclusions, term, remedies,
      governing law (India), signature blocks.
    `,
    employment_letter: `
      Generate an Employment Offer Letter:
      - Company: ${partyA}
      - Candidate: ${partyB}
      - Position: ${details}
      ${amount ? `- CTC: ₹${amount} per annum` : ""}
      ${date ? `- Joining Date: ${date}` : ""}
      Include: position, compensation, benefits,
      conditions, confidentiality clause, acceptance section.
    `,
    payment_reminder: `
      Generate a Payment Reminder Letter:
      - From: ${partyA}
      - To: ${partyB}
      - Invoice/Matter: ${details}
      ${amount ? `- Amount Due: ₹${amount}` : ""}
      ${date ? `- Due Date: ${date}` : ""}
      Include: invoice reference, amount due,
      payment deadline, late fee warning,
      payment instructions, contact details.
    `,
    compliance_checklist: `
      Generate a GST Compliance Checklist for:
      - Business: ${partyA}
      - Business Type: ${partyB}
      - Specific requirements: ${details}
      Include: monthly filing deadlines, quarterly deadlines,
      annual requirements, documents to maintain,
      penalties for non-compliance, actionable tips.
    `,
  }

  return `
    ${languageInstruction}

    You are an expert Indian legal document drafter with 20 years of experience.
    Generate a professional, complete, legally-sound document.

    ${documentTemplates[type]}

    Format the document properly with:
    - Clear headings
    - Numbered clauses where appropriate
    - Professional formatting
    - Today's date if not specified
    - Proper legal language

    Generate ONLY the document content. No explanations or preamble.
  `
}

export async function generateDocument(params: DocumentParams): Promise<string> {
  const prompt = buildDocumentPrompt(params)

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    max_tokens: 2000,
    temperature: 0.3,
  })

  return completion.choices[0]?.message?.content || "Failed to generate document"
}