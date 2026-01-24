"use client";

import { useAppStore } from "@/store/mockStore";
import { RecentTransactions } from "@/components/app/RecentTransactions";

export default function WalletHistoryPage() {
  const { transactions } = useAppStore();

  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-3xl p-6">
        <h1 className="text-2xl font-semibold text-white font-display">Wallet History</h1>
        <p className="mt-2 text-sm text-slate-300">
          All top-ups and transfers are recorded here.
        </p>
      </header>
      <RecentTransactions transactions={transactions} limit={10} />
    </div>
  );
}
