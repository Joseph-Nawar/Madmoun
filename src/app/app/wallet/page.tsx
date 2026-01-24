"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { WalletBalance } from "@/components/app/WalletBalance";
import { RecentTransactions } from "@/components/app/RecentTransactions";
import { AddFundsModal } from "@/components/app/AddFundsModal";
import { useAppStore } from "@/store/mockStore";

export default function WalletPage() {
  const { balance, transactions, addFunds, sendMoney, requestMoney, resetDemo } =
    useAppStore();
  const [showAddFunds, setShowAddFunds] = useState(false);

  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white font-display">My Wallet</h1>
            <p className="mt-2 text-sm text-slate-300">
              Manage top-ups, transfers, and escrow releases.
            </p>
          </div>
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

      <WalletBalance
        balance={balance}
        onAddFunds={() => setShowAddFunds(true)}
        onSendMoney={() => {
          sendMoney(800, "Laila Abdallah");
          toast.success("Sent EGP 800 to Laila Abdallah");
        }}
        onRequestMoney={() => {
          requestMoney(600, "Karim Hassan");
          toast.message("Requested EGP 600 from Karim Hassan");
        }}
      />

      <section className="glass-container gradient-border rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Transaction History</h2>
          <Link
            href="/app/wallet/history"
            className="text-xs uppercase tracking-[0.3em] text-emerald-200"
          >
            View All
          </Link>
        </div>
        <div className="mt-4">
          <RecentTransactions transactions={transactions} limit={5} />
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
