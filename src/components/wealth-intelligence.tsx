"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { useAppStore } from "@/store/mockStore";

export function WealthIntelligence() {
  const { balance, lockedFunds } = useAppStore();
  const auraRef = useRef<HTMLDivElement | null>(null);
  const totalWealth = balance + lockedFunds;
  const glow = Math.min(0.6, 0.25 + totalWealth / 60000);

  useLayoutEffect(() => {
    if (!auraRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(auraRef.current, {
        scale: 1.03,
        boxShadow: `0 0 60px rgba(16, 185, 129, ${glow})`,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, auraRef);

    return () => ctx.revert();
  }, [glow]);

  return (
    <section className="glass-container gradient-border relative overflow-hidden rounded-3xl bg-slate-950/70 p-8">
      <div className="absolute inset-0 opacity-60 blur-3xl">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        <header>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
            Intelligence Pulse
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white font-display">
            Financial brain monitoring your escrow layer.
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Live neural insight across trust, protection, and network strength.
          </p>
        </header>

        <div className="relative flex flex-col items-center gap-6 lg:flex-row">
          <div className="relative flex flex-1 items-center justify-center">
            <motion.div
              ref={auraRef}
              className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-4 rounded-full border border-emerald-400/30" />
              <div className="absolute inset-7 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.45),rgba(2,6,23,0.1)_70%)]" />
              <div className="relative z-10 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/80">
                  Trust Core
                </p>
                <p className="mt-2 text-3xl font-semibold text-emerald-200">99.8</p>
              </div>
            </motion.div>
            <motion.span
              className="absolute right-[-10%] top-1/2 hidden h-[1px] w-24 bg-emerald-400/40 lg:block"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="grid flex-1 gap-4">
            {[
              { label: "Trust Score", value: "99.8" },
              { label: "Protection Level", value: "Military Grade" },
              { label: "Network Strength", value: "Ultra Stable" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-3xl"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
              >
                <span className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  {stat.label}
                </span>
                <span className="text-sm font-semibold text-emerald-100">
                  {stat.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
