import { NextResponse,NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { calculateGST,calculateFilingTotals } from "@/lib/gst";
import { GSTTransaction } from "@/app/types";
import { error } from "console";


export async function POST(req:NextRequest){
    try{
        // check if user is logged in 
        const session = await getServerSession()
        if(!session?.user?.email){
            return NextResponse.json(
                {error:"Unauthorized"},
                {status:401}
            )
        }
        // get request body
        const body = await req.json()
    const { period, transactions } = body as {
      period: string
      transactions: GSTTransaction[]
    }
    // validate input
    if(!period ||!transactions || transactions.length===0){
        return NextResponse.json(
            {error:"Period and transactions are required"},
            {status:400}
        )
    }
    // calculate gst for each transaction
    const calculations = transactions.map((t)=> calculateGST(t))

    // calculate totals
    const filingData = calculateFilingTotals(calculations,period)
    // get user from database
    const user = await db.user.findUnique({
        where:{email :session.user.email},
    })
    if(!user){
        return NextResponse.json(
            {error:"User not found "},
            {status:404}
        )
    }
    // save filing to database
    const filing = await db.gSTFiling.create({
        data:{
            userId:user.id,
            period:filingData.period,
            totalTaxableValue:filingData.totalTaxableValue,
            cgst:filingData.totalCGST,
            igst:filingData.totalIGST,
            sgst:filingData.totalSGST,
            status:"draft",
        },
    })
    // return calculation results
    return NextResponse.json({
        success:true,
        filing,
        calculations:filingData,
    })
    }catch(error){
        console.error("GST calculation error:",error)
        return NextResponse.json(
            {error:"Internal server error"},
            {status:500}
        )
    }
}
export async function GET(req:NextRequest){
    try{
        const session = await getServerSession()
        if(!session?.user?.email){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }
        const user = await db.user.findUnique({
            where:{email:session.user.email},
        })
        if(!user){
            return NextResponse.json({error:'Usser not found'},{status:404})
        }
        const filings = await db.gSTFiling.findMany({
            where:{userId:user.id},
            orderBy:{createdAt:"desc"},
        })
        return NextResponse.json({filings})
    }catch(error){
        return NextResponse.json(
            {error:"Internal server error"},
            {status:500}
        )
    }
}