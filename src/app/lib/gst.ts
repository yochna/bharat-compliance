import { GSTCalculation,GSTFilingData,GSTTransaction } from "../types";

// core gst calculation function
export function calculateGST(transaction: GSTTransaction): GSTCalculation {
    const{description,amount,gstSlab,transactionType} = transaction

    const taxableAmount = amount
    const totalTaxRate = gstSlab/100
 let cgst =0
 let sgst =0
 let igst =0

 if(transactionType === "intrastate"){
    // same state-split equally between CGST and SGST
    cgst = taxableAmount*(totalTaxRate/2)
    sgst = taxableAmount*(totalTaxRate/2)
    igst =0
 }else{
    // different state-full tax as  IGST
    cgst =0
    sgst =0
    igst = taxableAmount*totalTaxRate
 }
 const totalTax = cgst+sgst+igst
 const totalAmount = taxableAmount+totalTax

 return{
    description,
    taxableAmount,
    gstSlab,
    cgst:Math.round(cgst*100)/100,
    sgst:Math.round(sgst*100)/100,
    igst:Math.round(igst*100)/100,
    totalTax:Math.round(totalTax*100)/100,
    totalAmount:Math.round(totalAmount*100)/100,
transactionType,
 }

}

// calculate total across  all transactions

export function calculateFilingTotals(
    calculations:GSTCalculation[],
    period:string

):GSTFilingData{
   const totalTaxableValue = calculations.reduce(
      (sum,c)=> sum+c.taxableAmount,0
   )
   const totalCGST = calculations.reduce((sum,c)=> sum+c.cgst,0)
   const totalSGST = calculations.reduce((sum,c)=> sum+c.sgst,0)
   const totalIGST = calculations.reduce((sum,c)=> sum+c.igst,0)
   const totalTax = totalCGST+totalSGST+totalIGST
   const grandTotal = totalTaxableValue + totalTax

   return{
      period,
      transactions:calculations,
      totalTaxableValue:Math.round(totalTaxableValue*100)/100,
      totalCGST:Math.round(totalCGST*100)/100,
      totalSGST:Math.round(totalSGST*100)/100,
      totalIGST:Math.round(totalIGST*100)/100,
      totalTax:Math.round(totalTax*100)/100,
      grandTotal:Math.round(grandTotal*100)/100,

   }
}

// format currency in Indian format
export function formatINR(amount :number):string{
   return new Intl.NumberFormat("en-IN",{
      style:"currency",
      currency:"INR",
      minimumFractionDigits:2,
   }).format(amount)
}