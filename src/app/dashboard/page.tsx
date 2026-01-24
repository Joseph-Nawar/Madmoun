"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import logo from "../../../Madmoun_Logo_By_Kenz.png";
import Link from "next/link";
import { MoneyAmount } from "@/components/money-amount";
import { WealthIntelligence } from "@/components/wealth-intelligence";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { StatusTimeline } from "@/components/transactions/StatusTimeline";

type TransactionStatus =
  | "Secured"
  | "In Transit"
  | "Action Required"
  | "Completed"
  | "Disputed";

type TransactionGroup = "Action Needed" | "In Progress";

type Transaction = {
  id: string;
  item: string;
  seller: string;
  location: string;
  amount: number;
  status: TransactionStatus;
  group: TransactionGroup;
  insurance: boolean;
};

const transactions: Transaction[] = [
  {
    id: "MDM-4550",
    item: "PlayStation 5",
    seller: "Ahmed Mansour",
    location: "Sheikh Zayed",
    amount: 28500,
    status: "Action Required",
    group: "Action Needed",
    insurance: true,
  },
  {
    id: "MDM-2488",
    item: "Samsung S24 Ultra",
    seller: "Kareem Abdelaziz",
    location: "Zamalek",
    amount: 54000,
    status: "Disputed",
    group: "Action Needed",
    insurance: true,
  },
  {
    id: "MDM-9821",
    item: "MacBook Air M3",
    seller: "Omar Gamal",
    location: "New Cairo",
    amount: 92000,
    status: "Secured",
    group: "In Progress",
    insurance: true,
  },
  {
    id: "MDM-7712",
    item: "iPhone 15 Pro",
    seller: "Salma Fathy",
    location: "Zamalek",
    amount: 64000,
    status: "In Transit",
    group: "In Progress",
    insurance: true,
  },
  {
    id: "MDM-3309",
    item: "Dyson Airwrap",
    seller: "Laila Abdallah",
    location: "Alexandria",
    amount: 38500,
    status: "Completed",
    group: "In Progress",
    insurance: false,
  },
];

const filterOptions = [
  "All",
  "Secured (Escrow)",
  "In Transit",
  "Completed",
  "Disputed",
] as const;

const statusStyles: Record<TransactionStatus, string> = {
  Secured:
    "border-emerald-400/40 bg-emerald-500/15 text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.4)]",
  "In Transit": "border-sky-400/40 bg-sky-500/15 text-sky-100",
  "Action Required":
    "border-amber-400/40 bg-amber-500/20 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.35)]",
  Completed: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  Disputed: "border-red-500/30 bg-red-500/10 text-red-100",
};

const statusToStep: Record<TransactionStatus, number> = {
  Secured: 2,
  "In Transit": 3,
  "Action Required": 2,
  Completed: 5,
  Disputed: 2,
};

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filterOptions)[number]>(
    "All"
  );

  const [visibleAction, setVisibleAction] = useState(4);
  const [visibleProgress, setVisibleProgress] = useState(4);
  const { ref: actionRef, inView: actionInView } = useInView({
    threshold: 0.4,
  });
  const { ref: progressRef, inView: progressInView } = useInView({
    threshold: 0.4,
  });

  const filteredTransactions = useMemo(() => {
    if (activeFilter === "All") return transactions;

    const match = activeFilter.replace(" (Escrow)", "");
    return transactions.filter((transaction) => transaction.status === match);
  }, [activeFilter]);

  const actionNeeded = filteredTransactions.filter(
    (transaction) => transaction.group === "Action Needed"
  );
  const inProgress = filteredTransactions.filter(
    (transaction) => transaction.group === "In Progress"
  );

  useEffect(() => {
    if (actionInView && visibleAction < actionNeeded.length) {
      setVisibleAction((prev) => Math.min(prev + 4, actionNeeded.length));
    }
  }, [actionInView, actionNeeded.length, visibleAction]);

  useEffect(() => {
    if (progressInView && visibleProgress < inProgress.length) {
      setVisibleProgress((prev) => Math.min(prev + 4, inProgress.length));
    }
  }, [progressInView, inProgress.length, visibleProgress]);

  return (
    <main className="relative z-10 space-y-12 rounded-[36px] border border-white/10 bg-white/[0.02] p-8 pt-10 shadow-glass backdrop-blur-xl">
      <header className="flex items-center gap-4">
        <div className="logo-shimmer logo-glow">
          <Image
            src={logo}
            alt="Madmoun logo"
            className="h-10 w-auto"
            sizes="40px"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
            Buyer Dashboard
          </p>
          <p className="text-sm text-slate-300">
            Live escrow operations console
          </p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="glass-container gradient-border rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
            Secured Volume
          </p>
          <div className="mt-2 text-2xl font-semibold text-emerald-200">
            <AnimatedCounter value={2847500} prefix="EGP " duration={2.2} />
          </div>
          <p className="mt-1 text-xs text-slate-400">Rolling 30 days</p>
        </div>
        <div className="glass-container gradient-border rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
            Successful Transactions
          </p>
          <div className="mt-2 text-2xl font-semibold text-white font-display">
            <AnimatedCounter value={342} duration={1.6} />
          </div>
          <p className="mt-1 text-xs text-slate-400">Completed this month</p>
        </div>
        <div className="glass-container gradient-border rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
            Success Rate
          </p>
          <div className="mt-2 text-2xl font-semibold text-white font-display">
            <AnimatedCounter value={98.5} suffix="%" decimals={1} duration={2} />
          </div>
          <p className="mt-1 text-xs text-slate-400">Delivery confirmed</p>
        </div>
      </section>
      <WealthIntelligence />

      <motion.section
        className="glass-container gradient-border rounded-3xl p-8"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
      >
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
              Buyer Portal
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white font-display">
              Money-first transaction control
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Track escrow, resolve action items, and confirm releases without
              friction.
            </p>
          </div>
          <nav className="glass-container gradient-border rounded-full px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setActiveFilter(option)}
                  className={`relative overflow-hidden rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                    activeFilter === option
                      ? "text-emerald-100"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {activeFilter === option && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full border border-emerald-400/40 bg-emerald-500/10"
                    />
                  )}
                  <span className="relative z-10">{option}</span>
                </button>
              ))}
            </div>
          </nav>
        </header>

        <section className="mt-10 space-y-6">
          <article className="glass-container gradient-border rounded-3xl p-6 shadow-[0_0_45px_rgba(245,158,11,0.18)]">
            <h3 className="text-lg font-semibold text-white font-display">
              Action Needed
            </h3>
            <p className="mt-1 text-sm text-amber-100/70">
              Priority releases and disputes waiting on you.
            </p>
            <div className="mt-6 grid gap-4">
              <AnimatePresence mode="popLayout">
                {actionNeeded.slice(0, visibleAction).map((transaction) => {
                  const currentStep = statusToStep[transaction.status] ?? 1;

                  return (
                    <motion.article
                      key={transaction.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ type: "spring", stiffness: 160, damping: 16 }}
                      className="glare-card glass-container gradient-border rounded-3xl p-6"
                    >
                      <Link
                        href={`/transaction/${transaction.id}`}
                        className="block"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                              #{transaction.id}
                            </p>
                            <h4 className="mt-2 text-lg font-semibold text-white font-display">
                              {transaction.item}
                            </h4>
                            <p className="mt-2 text-sm text-slate-300">
                              Seller: {transaction.seller} · {transaction.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <MoneyAmount
                              value={transaction.amount}
                              className="text-lg font-semibold text-white font-display"
                            />
                            <div
                              className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${
                                statusStyles[transaction.status]
                              }`}
                            >
                              {transaction.status}
                            </div>
                          </div>
                        </div>
                        {transaction.insurance && (
                          <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-200">
                            <ShieldCheck className="h-4 w-4" />
                            Madmoun Protection
                          </div>
                        )}
                        <div className="mt-4">
                          <StatusTimeline currentStep={currentStep} />
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
              <div ref={actionRef} />
            </div>
          </article>

          <article className="glass-container gradient-border rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-white font-display">
              In Progress
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Escrow-secured deals moving through delivery and inspection.
            </p>
            <div className="mt-6 grid gap-4">
              <AnimatePresence mode="popLayout">
                {inProgress.slice(0, visibleProgress).map((transaction) => {
                  const currentStep = statusToStep[transaction.status] ?? 1;

                  return (
                    <motion.article
                      key={transaction.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ type: "spring", stiffness: 160, damping: 16 }}
                      className="glare-card glass-container gradient-border rounded-3xl p-6"
                    >
                      <Link
                        href={`/transaction/${transaction.id}`}
                        className="block"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                              #{transaction.id}
                            </p>
                            <h4 className="mt-2 text-lg font-semibold text-white font-display">
                              {transaction.item}
                            </h4>
                            <p className="mt-2 text-sm text-slate-300">
                              Seller: {transaction.seller} · {transaction.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <MoneyAmount
                              value={transaction.amount}
                              className="text-lg font-semibold text-white font-display"
                            />
                            <div
                              className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${
                                statusStyles[transaction.status]
                              }`}
                            >
                              {transaction.status}
                            </div>
                          </div>
                        </div>
                        {transaction.insurance && (
                          <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-200">
                            <ShieldCheck className="h-4 w-4" />
                            Madmoun Protection
                          </div>
                        )}
                        <div className="mt-4">
                          <StatusTimeline currentStep={currentStep} />
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
              <div ref={progressRef} />
            </div>
          </article>
        </section>
      </motion.section>
    </main>
  );
}