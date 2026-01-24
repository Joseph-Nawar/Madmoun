"use client";

import { useMemo, useState } from "react";
import { useAppStore, type TransactionStatus } from "@/store/mockStore";
import { RecentTransactions } from "@/components/app/RecentTransactions";

export default function TransactionsPage() {
  const { transactions } = useAppStore();
  const [filter, setFilter] = useState<TransactionStatus | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter((tx) => tx.status === filter);
  }, [filter, transactions]);

  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-3xl p-6">
        <h1 className="text-2xl font-semibold text-white font-display">Transactions</h1>
        <p className="mt-2 text-sm text-slate-300">
          Track escrow activity and release status.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { value: "all", label: "All" },
            { value: "pending", label: "Pending" },
            { value: "escrow", label: "Escrow" },
            { value: "shipped", label: "Shipped" },
            { value: "delivered", label: "Delivered" },
            { value: "completed", label: "Completed" },
            { value: "disputed", label: "Disputed" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value as TransactionStatus | "all")}
              className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${
                filter === item.value
                  ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                  : "border-white/10 text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>
      <RecentTransactions transactions={filtered} limit={10} />
    </div>
  );
}
