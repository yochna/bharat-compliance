import React from "react";

export default function DashboardLayout({children}:{children:React.ReactNode}){
    return(
        <div className="min-h-screen bg-[#0A0A0A] text-[#F0EDE6]">
            {children}
        </div>
    )
}