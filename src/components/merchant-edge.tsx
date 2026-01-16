"use client";

import { TrendingUp } from "lucide-react";
import { MoneyAmount } from "@/components/money-amount";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BlurIn } from "@/components/blur-in";

const logos = [
  "SouqTech",
  "CairoMart",
  "NileGadgets",
  "Zamalek Studio",
  "Delta Logistics",
  "Sphinx Commerce",
  "Bosta Partners",
  "Alexandria Luxe",
];

const cards = [
  {
    title: "CairoMart",
    description:
      "Verified escrow release blocks fraudulent chargebacks and costly returns.",
    tier: "Enterprise",
  },
  {
    title: "SouqTech",
    description:
      "Merchants display Madmoun protection to convert buyers instantly.",
    tier: "Growth",
  },
  {
    title: "Alexandria Luxe",
    description:
      "Funds clear as soon as delivery is confirmed. No manual follow-ups.",
    tier: "Signature",
  },
];

export function MerchantEdge() {
  const pulseRef = useRef<HTMLElement>(null);
  const pulseInView = useInView(pulseRef, { amount: 0.4, once: true });

  return (
    <section className="glass-container gradient-border rounded-3xl p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <BlurIn>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
              B2B Conversion
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white font-display">
              The Madmoun Merchant Edge.
            </h2>
          </div>
        </BlurIn>
        <BlurIn delay={0.1}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-200">
            <TrendingUp className="h-4 w-4" />
            Get Paid Faster & Risk-Free
          </div>
        </BlurIn>
      </header>

      <div className="marquee glass-container gradient-border mt-8 rounded-2xl p-4">
        <div className="marquee-track">
          {logos.concat(logos).map((logo, index) => (
            <span
              key={`${logo}-${index}`}
              className="text-xs uppercase tracking-[0.35em] text-slate-300"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="card-shimmer group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900/80 to-emerald-950/60 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          >
            <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
              <div className="absolute -left-10 top-0 h-full w-20 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-2xl bg-emerald-600/20 ring-1 ring-emerald-400/40">
                  <span className="absolute inset-2 rounded-lg border border-emerald-300/40" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                    Madmoun
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                    {card.tier}
                  </p>
                </div>
              </div>
              <div className="h-10 w-14 rounded-lg border border-amber-400/40 bg-gradient-to-br from-amber-500/20 to-emerald-500/10" />
            </div>
            <div className="mt-6">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                <span className="verified-shimmer">{card.title}</span>
              </p>
              <p className="mt-3 text-sm text-slate-300">
                {card.description}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-200">
                Verified
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Escrow Active
              </span>
            </div>
          </div>
        ))}
      </div>

      <article className="glass-container gradient-border mt-8 rounded-3xl p-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <BlurIn>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
                Live Trust Pulse
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white font-display">
                Merchant Success Rate
              </h3>
            </div>
          </BlurIn>
          <BlurIn delay={0.1}>
            <MoneyAmount
              value={99.9}
              type="percentage"
              className="text-3xl font-semibold text-emerald-200 font-display"
            />
          </BlurIn>
        </header>
        <figure
          ref={pulseRef}
          className="glass-container gradient-border mt-6 rounded-2xl p-4"
        >
          <svg viewBox="0 0 600 120" className="h-28 w-full">
            <defs>
              <linearGradient id="pulseGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0 80 L60 72 L120 78 L180 60 L240 68 L300 50 L360 70 L420 58 L480 64 L540 48 L600 56"
              fill="none"
              stroke="url(#pulseGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: pulseInView ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </svg>
        </figure>
        <div className="mt-6 grid gap-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/70">
            Live Blockchain Pulse
          </p>
          <div className="grid gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.span
                key={`pulse-line-${index}`}
                className="block h-[2px] w-full rounded-full bg-emerald-500/20"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
