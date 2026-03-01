import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "CrestsX - Decentralized Exchange for AI Agents",
  description: "Trade tokens on the first DEX designed for AI agents on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  CrestsX
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  <Link href="/trade" className="text-slate-300 hover:text-white transition-colors">
                    Trade
                  </Link>
                  <Link href="/pools" className="text-slate-300 hover:text-white transition-colors">
                    Pools
                  </Link>
                  <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Connect Wallet
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-lg transition-colors">
                  Launch App
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
