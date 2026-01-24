"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoneyAmount } from "@/components/money-amount";
import { StatusTimeline } from "@/components/transactions/StatusTimeline";

const transactionLookup = {
  "MDM-9821": {
    item: "MacBook Air M3",
    buyer: "Nour El-Din",
    seller: "Omar Gamal",
    amount: 92000,
    courier: "Bosta",
    status: "In Transit",
  },
  "MDM-7712": {
    item: "iPhone 15 Pro",
    buyer: "Yara Hamdy",
    seller: "Salma Fathy",
    amount: 64000,
    courier: "Aramex",
    status: "In Transit",
  },
  "MDM-4550": {
    item: "PlayStation 5",
    buyer: "Ahmed Mansour",
    seller: "Kareem Abdelaziz",
    amount: 28500,
    courier: "Bosta",
    status: "Action Required",
  },
} as const;

type TransactionId = keyof typeof transactionLookup;

type TransactionDetailPageProps = {
  params: { id: string };
};

export default function TransactionDetailPage({
  params,
}: TransactionDetailPageProps) {
  const transaction =
    transactionLookup[params.id as TransactionId] ??
    transactionLookup["MDM-9821"];

  const statusToStep: Record<string, number> = {
    Secured: 2,
    "In Transit": 3,
    "Action Required": 2,
    Completed: 5,
    Disputed: 2,
  };

  const currentStep = statusToStep[transaction.status] ?? 1;

  return (
    <main className="space-y-10 pt-10">
      <section className="glass-container gradient-border rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
          Transaction Detail
        </p>
        <h1 className="text-3xl font-semibold text-white font-display">
          {transaction.item}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="border-emerald-400/40 bg-emerald-500/15 text-emerald-100">
            {transaction.status}
          </Badge>
          <span className="text-sm text-slate-300">
            Buyer: {transaction.buyer}
          </span>
          <span className="text-sm text-slate-300">
            Seller: {transaction.seller}
          </span>
          <MoneyAmount
            value={transaction.amount}
            className="text-sm text-slate-200 font-display"
          />
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass-container gradient-border rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-white font-display">
            Escrow Timeline
          </h2>
          <StatusTimeline currentStep={currentStep} />
        </Card>

        <Card className="glass-container gradient-border rounded-3xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                Protection Layer
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white font-display">
                Madmoun Protection
              </h2>
            </div>
            <ShieldCheck className="h-8 w-8 text-amber-200" />
          </div>
          <p className="mt-4 text-sm text-slate-300">
            Funds are held in escrow until you confirm receipt. Release instantly
            to trigger payout and close the deal.
          </p>
          <div className="glass-container gradient-border relative mt-8 overflow-hidden rounded-2xl p-1">
            <motion.span
              className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/30"
              animate={{ scale: [0.6, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-container gradient-border relative z-10 w-full rounded-2xl px-6 py-4 text-base font-semibold text-emerald-50 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              Confirm Receipt & Release Funds
            </motion.button>
          </div>
        </Card>
      </section>
    </main>
  );
}
