"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrustVisualizer } from "@/components/trust-visualizer";
import { BackgroundBeams } from "@/components/background-beams";
import { MoneyAmount } from "@/components/money-amount";
import { BlurIn } from "@/components/blur-in";

export function SpotlightHero() {
  return (
    <section className="glass-container gradient-border relative overflow-hidden rounded-[32px] px-6 py-16 md:px-12">
      <BackgroundBeams />
      <div className="pointer-events-none absolute inset-0 bg-spotlight" />
      <motion.div
        className="pointer-events-none absolute right-[-15%] top-[-30%] h-[320px] w-[320px] rounded-full bg-emerald-500/20 blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[260px] w-[260px] rounded-full bg-amber-500/20 blur-[120px]"
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <BlurIn className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-emerald-200">
            <ShieldCheck className="h-4 w-4" />
            Fintech Trust Layer
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl font-display">
            Securing every “Mabrouk” on your purchase. The first trusted escrow for
            Egypt.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            Madmoun protects buyers and sellers with verified delivery, instant
            escrow lock, and a premium shield for every EGP transaction.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="group rounded-full bg-emerald-500 px-6 py-5 text-sm text-white hover:bg-emerald-400">
              Start a protected deal
              <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 px-6 py-5 text-sm text-white hover:bg-white/10"
              asChild
            >
              <Link href="/dashboard">Explore the buyer portal</Link>
            </Button>
          </div>
        </BlurIn>
        <BlurIn className="flex flex-col gap-4" delay={0.15}>
          <TrustVisualizer />
          <div className="glass-container gradient-border rounded-3xl p-6 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-200/70">
              Live coverage
            </p>
            <MoneyAmount
              value={4600000}
              className="mt-3 text-2xl font-semibold text-emerald-200 font-display"
            />
            <p className="mt-2 text-sm text-slate-300">
              secured in escrow across Cairo, Giza, and Alexandria.
            </p>
          </div>
        </BlurIn>
      </div>
    </section>
  );
}
