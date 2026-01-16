import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { BackgroundConstruction } from "@/components/background-construction";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Madmoun | Trusted Escrow for Egypt",
  description:
    "Madmoun is a high-end escrow fintech securing every EGP transaction with trust and protection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} min-h-screen bg-slate-950 text-slate-100 antialiased`}
      >
        <div className="relative min-h-screen overflow-x-hidden">
          <BackgroundConstruction />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(5,150,105,0.15),transparent_55%)]" />
          <div className="relative z-10">
            <div className="sticky top-0 z-50">
              <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
                <div className="absolute inset-0 -z-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]" />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-600/20 ring-1 ring-emerald-400/40" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">
                      Madmoun
                    </p>
                    <p className="text-xs text-slate-400">
                      Escrow Infrastructure
                    </p>
                  </div>
                </div>
                <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
                  <Link className="transition hover:text-emerald-300" href="/">
                    Home
                  </Link>
                  <Link className="transition hover:text-emerald-300" href="/dashboard">
                    Dashboard
                  </Link>
                  <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
                    EGP Focused
                  </span>
                </nav>
              </div>
            </div>
            <div className="mx-auto w-full max-w-6xl px-6 pb-16">
              <PageTransition>{children}</PageTransition>
              <footer className="mt-16 flex justify-center">
                <div className="glass-container gradient-border rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-slate-300">
                  Licensed by Nile FinTech Authority • Secured by Madmoun Protocol.
                </div>
              </footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
