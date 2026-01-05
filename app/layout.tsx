import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PortfolioProvider } from "@/lib/portfolio-context"
import { Toaster } from "@/components/ui/toaster"
import { CursorFollower } from "@/components/cursor-follower"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Praveen Mirji",
  description: "Portfolio showcasing innovative web applications, AI-powered tools, and modern development expertise",
  generator: "v0.app",
  icons: {
    icon: "/ai-icon.svg",
    apple: "/ai-icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <PortfolioProvider>
          <CursorFollower />
          {children}
          <Toaster />
        </PortfolioProvider>
        <Analytics />
      </body>
    </html>
  )
}
