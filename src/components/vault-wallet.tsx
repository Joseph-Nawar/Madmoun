"use client";

import { motion } from "framer-motion";
import { MoneyAmount } from "@/components/money-amount";

export function VaultWallet() {
  return (
    <motion.section
      className="glass-container gradient-border rounded-3xl bg-slate-950/70 p-8"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 14 }}
    >
      <header className="glass-container gradient-border rounded-2xl p-5">
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
      </header>

      <motion.figure
        className="glass-container gradient-border mt-8 flex w-full items-center justify-center rounded-3xl bg-zinc-950/70 p-6"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative flex h-[350px] w-full items-center justify-center">
          <div
            className="relative flex h-[240px] w-[240px] items-center justify-center rounded-full border-4 border-zinc-900 ring-1 ring-black/50"
            style={{
              background:
                "conic-gradient(#10b981 0deg 214deg, #0f172a 214deg 216deg, #f59e0b 216deg 358deg, #0f172a 358deg 360deg)",
            }}
          >
            <div className="absolute inset-6 rounded-full bg-zinc-950/90 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Secure Total
              </p>
              <MoneyAmount
                value={20000}
                className="mt-3 text-3xl font-semibold text-white font-display"
              />
            </div>
          </div>
        </div>
      </motion.figure>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="glass-container gradient-border rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
            Available Funds
          </p>
          <MoneyAmount
            value={12000}
            className="mt-2 text-lg font-semibold text-white font-display"
          />
        </div>
        <div className="glass-container gradient-border rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
            Held in Escrow
          </p>
          <MoneyAmount
            value={8000}
            className="mt-2 text-lg font-semibold text-white font-display"
          />
        </div>
      </div>
    </motion.section>
  );
}
