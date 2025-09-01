import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Simple fullstack URL shortener app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 font-sans min-h-screen`}
      >
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-center">URL Shortener</h1>
        </header>
        <main className="p-4 max-w-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
