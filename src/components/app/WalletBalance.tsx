"use client";

import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

type WalletBalanceProps = {
  balance: number;
  onAddFunds: () => void;
  onSendMoney: () => void;
  onRequestMoney: () => void;
};

export function WalletBalance({
  balance,
  onAddFunds,
  onSendMoney,
  onRequestMoney,
}: WalletBalanceProps) {
  return (
    <section className="glass-container gradient-border rounded-3xl p-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
            Madmoun Wallet
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white font-display">
            Available Balance
          </h2>
        </div>
        <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-emerald-200">
          Secured
        </span>
      </header>

      <div className="mt-6 text-4xl font-semibold text-emerald-100">
        <span className="text-sm text-emerald-200">EGP </span>
        <AnimatedCounter value={balance} duration={1.6} />
      </div>
      <p className="mt-2 text-sm text-slate-300">
        Real-time balance updates after every transaction.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={onAddFunds}
          className="glass-container gradient-border rounded-2xl px-4 py-3 text-xs uppercase tracking-[0.25em] text-emerald-200"
        >
          Add Funds
        </button>
        <button
          type="button"
          onClick={onSendMoney}
          className="glass-container gradient-border rounded-2xl px-4 py-3 text-xs uppercase tracking-[0.25em] text-slate-100"
        >
          Send Money
        </button>
        <button
          type="button"
          onClick={onRequestMoney}
          className="glass-container gradient-border rounded-2xl px-4 py-3 text-xs uppercase tracking-[0.25em] text-slate-300"
        >
          Request Money
        </button>
      </div>
    </section>
  );
}
