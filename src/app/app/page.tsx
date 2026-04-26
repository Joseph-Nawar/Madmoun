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

  const demoScenarios = [
    {
      title: "Pay with Madmoun",
      description: "See how Madmoun works as a payment method during checkout",
      href: "/app/demo/integrated-checkout",
      cta: "Start Demo",
      badge: "Integrated Checkout",
    },
    {
      title: "Send a Secure Payment Link",
      description: "Use escrow even with sellers not integrated with Madmoun",
      href: "/app/demo/payment-link",
      cta: "Start Demo",
      badge: "Payment Link",
    },
  ];

  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
          Madmoun App Demo
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white font-display">
          Wallet, escrow, and trusted partners in one view
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

        <section className="glass-container gradient-border rounded-[2rem] p-6 md:p-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
              Demo Scenarios
            </p>
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
              Try Madmoun in Action
            </h2>
            <p className="text-sm leading-6 text-slate-300 md:text-base">
              Explore how escrow works with and without merchant integration.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {demoScenarios.map((scenario) => (
              <Link
                key={scenario.href}
                href={scenario.href}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/7 hover:shadow-[0_24px_70px_rgba(16,185,129,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-emerald-400/0 to-amber-300/0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:from-emerald-400/10 group-hover:via-transparent group-hover:to-amber-300/10" />
                <div className="relative flex h-full flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-emerald-100">
                      {scenario.badge}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-white">{scenario.title}</h3>
                      <p className="text-sm leading-6 text-slate-300">
                        {scenario.description}
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center justify-between rounded-full border border-white/10 bg-slate-950/30 px-4 py-3 text-xs uppercase tracking-[0.3em] text-emerald-100 transition group-hover:border-emerald-300/40 group-hover:bg-emerald-500/10">
                    <span>{scenario.cta}</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

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
