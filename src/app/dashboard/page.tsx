import type { Metadata } from "next";
import Link from "next/link";
import { VaultWallet } from "@/components/vault-wallet";

export const metadata: Metadata = {
  title: "Madmoun | Dashboard",
};

const transactions = [
  {
    id: "MDN-1024",
    merchant: "CairoMart",
    status: "Escrow Locked",
    method: "Same-day courier",
    amount: "EGP 4,850",
    time: "2 mins ago",
  },
  {
    id: "MDN-1023",
    merchant: "SouqTech",
    status: "Delivery Verified",
    method: "Rider handoff",
    amount: "EGP 8,120",
    time: "18 mins ago",
  },
  {
    id: "MDN-1022",
    merchant: "Alexandria Luxe",
    status: "Release Scheduled",
    method: "Warehouse pickup",
    amount: "EGP 2,990",
    time: "1 hour ago",
  },
  {
    id: "MDN-1021",
    merchant: "Delta Logistics",
    status: "Escrow Locked",
    method: "Two-step verification",
    amount: "EGP 12,700",
    time: "3 hours ago",
  },
];

export default function DashboardPage() {
  return (
    <main className="opacity-100 relative z-50 grid gap-8 pt-10 lg:grid-cols-[260px_1fr]">
      <aside className="glass-container gradient-border flex h-fit flex-col gap-6 rounded-3xl bg-slate-950/70 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">
            Madmoun
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white font-display">
            Vault Command
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Neutral Vault controls built for Egyptian escrow workflows.
          </p>
        </div>
        <nav className="space-y-3 text-sm text-slate-300">
          <Link className="block transition hover:text-emerald-200" href="/">
            Overview
          </Link>
          <span className="block text-emerald-200">Dashboard</span>
          <span className="block text-slate-500">Risk Monitor</span>
          <span className="block text-slate-500">Settlement Rules</span>
          <span className="block text-slate-500">Compliance Vault</span>
        </nav>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs uppercase tracking-[0.3em] text-emerald-200">
          Shield Status: Active
        </div>
      </aside>

      <section className="space-y-8">
        <header className="glass-container gradient-border rounded-3xl bg-slate-950/70 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">
            Neutral Vault Overview
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white font-display">
            Trust visibility across every EGP escrow.
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Monitor escrow health, delivery confirmations, and instant releases.
          </p>
        </header>

        <VaultWallet />

        <section className="glass-container gradient-border rounded-3xl bg-slate-950/70 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">
                Transaction History
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white font-display">
                Escrow activity across Egypt
              </h3>
            </div>
            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-200">
              Last 24 hours
            </span>
          </div>

          <div className="mt-6 grid gap-4">
            {transactions.map((transaction) => (
              <article
                key={transaction.id}
                className="glass-container gradient-border rounded-2xl bg-slate-950/70 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
                      {transaction.id}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-white">
                      {transaction.merchant}
                    </h4>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                      {transaction.method}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                      {transaction.status}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-emerald-200">
                      {transaction.amount}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                      {transaction.time}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
