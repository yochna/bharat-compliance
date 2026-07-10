import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "./components/providers/SessionProvider"
import { ScrollProgress } from "./components/ui/ScrollProgress"
export const metadata: Metadata = {
  title: "BharatComply - GST & Legal Compliance",
  description: "Auto-generate GST filings, legal notices, and compliance documents for Indian businesses.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <ScrollProgress/>
          {children}
          </AuthProvider>
      </body>
    </html>
  )
}