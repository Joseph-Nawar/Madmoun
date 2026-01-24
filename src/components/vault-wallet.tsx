"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { Lock } from "lucide-react";
import { MoneyAmount } from "@/components/money-amount";
import { BlurIn } from "@/components/blur-in";
import { useAppStore } from "@/store/mockStore";
import { useLayoutEffect, useRef } from "react";

export function VaultWallet() {
  const { balance, lockedFunds } = useAppStore();
  const ringRef = useRef<HTMLDivElement | null>(null);
  const availableCircleRef = useRef<SVGCircleElement | null>(null);
  const lockedCircleRef = useRef<SVGCircleElement | null>(null);

  const totalWealth = balance + lockedFunds;
  const emeraldPercentage = totalWealth === 0 ? 0 : (balance / totalWealth) * 100;
  const goldPercentage = totalWealth === 0 ? 0 : (lockedFunds / totalWealth) * 100;

  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const availableLength = (circumference * emeraldPercentage) / 100;
  const lockedLength = (circumference * goldPercentage) / 100;

  useLayoutEffect(() => {
    if (!availableCircleRef.current || !lockedCircleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(availableCircleRef.current, {
        attr: {
          "stroke-dasharray": `${availableLength} ${Math.max(
            0,
            circumference - availableLength
          )}`,
          "stroke-dashoffset": 0,
        },
        duration: 1.5,
        ease: "power2.out",
      });

      gsap.to(lockedCircleRef.current, {
        attr: {
          "stroke-dasharray": `${lockedLength} ${Math.max(
            0,
            circumference - lockedLength
          )}`,
          "stroke-dashoffset": -availableLength,
        },
        duration: 1.5,
        ease: "power2.out",
      });
    }, ringRef);

    return () => ctx.revert();
  }, [availableLength, lockedLength, circumference]);

  return (
    <motion.section
      className="glass-container gradient-border rounded-3xl bg-slate-950/70 p-8"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 14 }}
    >
      <header className="glass-container gradient-border rounded-2xl p-5">
        <BlurIn>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
              Madmoun Secure Wallet
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white font-display">
              Vault-level visibility on every pound.
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Liquid balance powers instant deals, while escrow stays locked until
              delivery is verified.
            </p>
          </div>
        </BlurIn>
      </header>

      <motion.figure
        className="glass-container gradient-border mt-8 flex w-full items-center justify-center rounded-3xl bg-zinc-950/70 p-6"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative flex w-full items-center justify-center">
          <div
            ref={ringRef}
            className="relative flex h-[210px] w-[210px] items-center justify-center rounded-full border-4 border-zinc-900 ring-1 ring-black/50 md:h-[240px] md:w-[240px]"
          >
            <svg
              viewBox="0 0 240 240"
              className="absolute inset-0 h-full w-full -rotate-90"
              aria-hidden="true"
            >
              <circle
                cx="120"
                cy="120"
                r={radius}
                fill="transparent"
                stroke="#0f172a"
                strokeWidth="12"
              />
              <circle
                ref={availableCircleRef}
                cx="120"
                cy="120"
                r={radius}
                fill="transparent"
                stroke="#10b981"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${availableLength} ${Math.max(
                  0,
                  circumference - availableLength
                )}`}
                strokeDashoffset={0}
              />
              <circle
                ref={lockedCircleRef}
                cx="120"
                cy="120"
                r={radius}
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${lockedLength} ${Math.max(
                  0,
                  circumference - lockedLength
                )}`}
                strokeDashoffset={-availableLength}
              />
            </svg>
            <div className="absolute inset-6 rounded-full bg-zinc-950/90 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Secure Total
              </p>
              <MoneyAmount
                value={totalWealth}
                className="mt-3 text-3xl font-semibold text-emerald-200 font-display"
              />
            </div>
          </div>
        </div>
      </motion.figure>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <BlurIn>
          <div className="glass-container gradient-border rounded-3xl px-6 py-5">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
              Liquid Assets
            </p>
            <div className="mt-3 font-mono text-3xl font-semibold text-emerald-200">
              <MoneyAmount value={balance} className="font-mono" />
            </div>
          </div>
        </BlurIn>
        <BlurIn delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-white/5 px-6 py-5 backdrop-blur-xl">
            <div className="security-sweep" aria-hidden="true" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200/70">
              Madmoun Vault Protection
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="font-mono text-2xl font-semibold text-amber-200">
                <MoneyAmount value={lockedFunds} className="font-mono" />
              </div>
              <motion.span
                className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10"
                animate={{ boxShadow: ["0 0 0 rgba(245,158,11,0)", "0 0 18px rgba(245,158,11,0.5)", "0 0 0 rgba(245,158,11,0)"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Lock className="h-4 w-4 text-amber-200" />
              </motion.span>
            </div>
          </div>
        </BlurIn>
      </div>
    </motion.section>
  );
}
