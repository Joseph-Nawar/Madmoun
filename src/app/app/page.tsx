"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { VaultWallet } from "@/components/vault-wallet";
import { QuickActions } from "@/components/app/QuickActions";
import { RecentTransactions } from "@/components/app/RecentTransactions";
import { AddFundsModal } from "@/components/app/AddFundsModal";
import { useAppStore } from "@/store/mockStore";

export default function AppHomePage() {
  const { transactions, addFunds, sendMoney, requestMoney, resetDemo, quickDemo } =
    useAppStore();
  const [showAddFunds, setShowAddFunds] = useState(false);

  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
          Madmoun App Demo
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white font-display">
          Wallet, escrow, and marketplace in one view
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Experience the escrow flow with realistic demo data.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const id = quickDemo();
              toast.success(`Demo escrow created: ${id}`);
            }}
            className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100"
          >
            Quick Demo
          </button>
          <button
            type="button"
            onClick={() => {
              resetDemo();
              toast.info("Demo data reset");
            }}
            className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300"
          >
            Reset Demo
          </button>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <VaultWallet />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setShowAddFunds(true)}
            className="glass-container gradient-border rounded-2xl px-4 py-3 text-xs uppercase tracking-[0.25em] text-emerald-200"
          >
            Add Funds
          </button>
          <button
            type="button"
            onClick={() => {
              sendMoney(250, "Omar Gamal");
              toast.success("Sent EGP 250 to Omar Gamal");
            }}
            className="glass-container gradient-border rounded-2xl px-4 py-3 text-xs uppercase tracking-[0.25em] text-slate-100"
          >
            Send Money
          </button>
          <button
            type="button"
            onClick={() => {
              requestMoney(400, "Salma Fathy");
              toast.message("Requested EGP 400 from Salma Fathy");
            }}
            className="glass-container gradient-border rounded-2xl px-4 py-3 text-xs uppercase tracking-[0.25em] text-slate-300"
          >
            Request Money
          </button>
        </div>
      </section>
      <QuickActions
        onQuickAdd={(amount) => {
          addFunds(amount);
          toast.success(`Added EGP ${amount} to wallet`);
        }}
        quickAmounts={[500, 1000, 2500, 5000]}
      />

      <section className="glass-container gradient-border rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
          <Link
            href="/app/transaction"
            className="text-xs uppercase tracking-[0.3em] text-emerald-200"
          >
            View All
          </Link>
        </div>
        <div className="mt-4">
          <RecentTransactions transactions={transactions} limit={4} />
        </div>
      </section>

      {showAddFunds && (
        <AddFundsModal
          onClose={() => setShowAddFunds(false)}
          onAddFunds={(amount) => {
            addFunds(amount);
            toast.success(`Added EGP ${amount} to wallet`);
            setShowAddFunds(false);
          }}
        />
      )}
    </div>
  );
}
