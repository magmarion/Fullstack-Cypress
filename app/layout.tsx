import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Image from "next/image"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Simple fullstack URL shortener app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans min-h-screen flex flex-col`}
      >
        <header className="bg-primary text-primary-foreground p-6 shadow relative">
          <Image
            src="/Link-Logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="absolute left-6 top-1/2 -translate-y-1/2 object-contain"
          />

          <h1 className="text-2xl md:text-3xl font-bold text-center">URL Shortener</h1>
        </header>

        <main className="flex-1 p-6 max-w-xl w-full mx-auto flex flex-col gap-6">
          {children}
        </main>
      </body>
    </html>
  )
}
