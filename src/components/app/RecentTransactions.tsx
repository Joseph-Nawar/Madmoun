import Link from "next/link";
import type { Transaction } from "@/store/mockStore";

const statusLabels: Record<string, string> = {
  pending: "Pending",
  escrow: "In Escrow",
  shipped: "Shipped",
  delivered: "Delivered",
  completed: "Completed",
  disputed: "Disputed",
};

export function RecentTransactions({
  transactions,
  limit = 4,
}: {
  transactions: Transaction[];
  limit?: number;
}) {
  return (
    <div className="grid gap-3">
      {transactions.slice(0, limit).map((transaction) => (
        <Link
          key={transaction.id}
          href={`/app/transaction/${transaction.id}`}
          className="glass-container gradient-border flex items-center justify-between rounded-2xl px-4 py-4 text-sm text-slate-100"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              {transaction.id}
            </p>
            <p className="mt-1 font-semibold text-white">{transaction.product}</p>
          </div>
          <div className="text-left">
            <p className="font-semibold text-emerald-200">EGP {transaction.amount}</p>
            <p className="mt-1 text-xs text-slate-400">
              {statusLabels[transaction.status]}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
