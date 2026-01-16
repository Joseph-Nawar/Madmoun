"use client";

import { TrendingUp } from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";
import { MoneyAmount } from "@/components/money-amount";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
    title: "Eliminate Return Fraud",
    description:
      "Verified escrow release blocks fraudulent chargebacks and costly returns.",
  },
  {
    title: "Build Immediate Trust",
    description:
      "Merchants display Madmoun protection to convert buyers instantly.",
  },
  {
    title: "Automated Payouts",
    description:
      "Funds clear as soon as delivery is confirmed. No manual follow-ups.",
  },
];

export function MerchantEdge() {
  const pulseRef = useRef<HTMLElement>(null);
  const pulseInView = useInView(pulseRef, { amount: 0.4, once: true });

  return (
    <section className="glass-container gradient-border rounded-3xl p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
            B2B Conversion
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white font-display">
            The Madmoun Merchant Edge.
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-200">
          <TrendingUp className="h-4 w-4" />
          Get Paid Faster & Risk-Free
        </div>
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
          <SpotlightCard
            key={card.title}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

      <article className="glass-container gradient-border mt-8 rounded-3xl p-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
              Live Trust Pulse
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white font-display">
              Merchant Success Rate
            </h3>
          </div>
          <MoneyAmount
            value={99.9}
            type="percentage"
            className="text-3xl font-semibold text-emerald-200 font-display"
          />
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
      </article>
    </section>
  );
}
