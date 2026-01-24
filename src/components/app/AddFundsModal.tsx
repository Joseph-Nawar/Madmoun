"use client";

import { useState } from "react";

type AddFundsModalProps = {
  onClose: () => void;
  onAddFunds: (amount: number) => void;
};

export function AddFundsModal({ onClose, onAddFunds }: AddFundsModalProps) {
  const [amount, setAmount] = useState(1000);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 opacity-100 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-[#0f172a] p-6 text-white shadow-2xl">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Add Funds</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-[0.3em] text-slate-300"
          >
            Close
          </button>
        </header>
        <div className="mt-4 space-y-3">
          <label className="text-sm text-slate-200">Amount (EGP)</label>
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none"
          />
          <div className="flex flex-wrap gap-2">
            {[500, 1000, 2500, 5000].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value)}
                className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-xs text-slate-200"
              >
                EGP {value}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onAddFunds(amount)}
          className="mt-6 w-full rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-emerald-100"
        >
          Confirm Top-up
        </button>
      </div>
    </div>
  );
}
