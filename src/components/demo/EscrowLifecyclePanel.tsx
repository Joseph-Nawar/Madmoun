"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PackageCheck, Truck } from "lucide-react";
import { StatusTimeline } from "@/components/transactions/StatusTimeline";

export type DemoEscrowPhase = "pending" | "shipped" | "delivered" | "released";

const lifecycleSteps = [
  {
    key: "pending",
    label: "Pending",
    note: "Funds are locked while the seller prepares the shipment.",
    icon: PackageCheck,
  },
  {
    key: "shipped",
    label: "Shipped",
    note: "The seller has marked the order as on the way.",
    icon: Truck,
  },
  {
    key: "delivered",
    label: "Delivered",
    note: "The buyer has confirmed delivery from their side.",
    icon: CheckCircle2,
  },
  {
    key: "released",
    label: "Released",
    note: "Madmoun releases funds to the seller and closes the escrow.",
    icon: ArrowRight,
  },
] as const;

const phaseToTimelineStep: Record<DemoEscrowPhase, number> = {
  pending: 2,
  shipped: 3,
  delivered: 4,
  released: 5,
};

type EscrowLifecyclePanelProps = {
  merchantName: string;
  amount: number;
  phase: DemoEscrowPhase;
  transactionId?: string;
  onAdvance: () => void;
  onRelease: () => void;
};

export function EscrowLifecyclePanel({
  merchantName,
  amount,
  phase,
  transactionId,
  onAdvance,
  onRelease,
}: EscrowLifecyclePanelProps) {
  const activeStepIndex = lifecycleSteps.findIndex((step) => step.key === phase);
  const currentStep = phaseToTimelineStep[phase];
  const actionLabel =
    phase === "pending"
      ? "Simulate Delivery"
      : phase === "shipped"
        ? "Confirm Delivery"
        : "Release Funds";

  return (
    <section className="glass-container gradient-border rounded-[2rem] p-6 md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
            Escrow Lifecycle
          </p>
          <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
            {merchantName} is now secured by Madmoun
          </h2>
          <p className="text-sm leading-6 text-slate-300">
            Madmoun does not sell products. It secures the transaction between buyer and seller until delivery is confirmed.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-left text-sm text-emerald-50">
          <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-100/70">
            Amount locked
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">EGP {amount.toLocaleString()}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-emerald-100/80">
            Status: {lifecycleSteps[activeStepIndex]?.label}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {lifecycleSteps.map((step, index) => {
          const StepIcon = step.icon;
          const active = index <= activeStepIndex;
          return (
            <div
              key={step.key}
              className={`rounded-2xl border px-4 py-3 text-center transition ${
                active
                  ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-50"
                  : "border-white/10 bg-white/5 text-slate-400"
              }`}
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/60">
                <StepIcon className="h-4 w-4" />
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em]">
                {step.label}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{step.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
        <StatusTimeline currentStep={currentStep} />
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/40 p-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
            Next action
          </p>
          <p className="text-sm text-slate-300">
            {phase === "pending"
              ? "Use the demo button to simulate delivery handoff and continue the escrow flow."
              : phase === "shipped"
                ? "Once the buyer confirms receipt, move the escrow to delivered."
                : phase === "delivered"
                  ? "Release the funds to complete the escrow lifecycle."
                  : `Escrow ${transactionId ? `${transactionId} ` : ""}has been released.`}
          </p>
        </div>

        {phase === "released" ? (
          <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100">
            Funds released
          </div>
        ) : (
          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={phase === "delivered" ? onRelease : onAdvance}
            className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-5 py-3 text-xs uppercase tracking-[0.3em] text-emerald-100 transition hover:bg-emerald-500/20"
          >
            {actionLabel}
          </motion.button>
        )}
      </div>
    </section>
  );
}