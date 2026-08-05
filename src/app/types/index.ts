export interface User{
    id:string
    name:string
    email:string
    gstin?:string
    language:"en"|"hi"
    createdAt:Date
}

export interface GSTFiling{
    id:string
    userId:string
    period:string
    totalTaxableValue:number
    cgst:number
    sgst:number
    igst:number
    status:"draft"|"pending"|"filed"
    createdAt:Date
}
export interface LegalDocument {
  id: string
  userId: string
  type: "notice" | "agreement" | "checklist"
  title: string
  content: string
  language: "en" | "hi"
  createdAt: Date
}

export interface Deadline {
  id: string
  userId: string
  title: string
  dueDate: Date
  type: "gst" | "tds" | "roc" | "other"
  status: "upcoming" | "due" | "overdue" | "completed"
}

export type GSTSlab=0|5|12|18|28

export interface GSTTransaction{
  description:string
  amount:number
  gstSlab:GSTSlab
  transactionType:"intrastate"|"interstate"
}

export interface GSTCalculation{
    description: string
  taxableAmount: number
  gstSlab: number
  cgst: number
  sgst: number
  igst: number
  totalTax: number
  totalAmount: number
  transactionType: "intrastate" | "interstate"
}

export interface GSTFilingData{
    period: string
  transactions: GSTCalculation[]
  totalTaxableValue: number
  totalCGST: number
  totalSGST: number
  totalIGST: number
  totalTax: number
  grandTotal: number
}