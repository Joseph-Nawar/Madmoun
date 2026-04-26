"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CreditCard, Send, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "@/store/mockStore";
import { EscrowLifecyclePanel, type DemoEscrowPhase } from "@/components/demo/EscrowLifecyclePanel";

const merchantName = "TechStore Egypt";
const orderLines = [
  { name: "Wireless Headphones", detail: "Noise cancelling", price: 6200 },
  { name: "Mechanical Keyboard", detail: "Compact layout", price: 4400 },
  { name: "USB-C Dock", detail: "4K display + charging", price: 3800 },
];

const paymentMethods = [
  {
    key: "card",
    label: "Visa / Card",
    note: "Immediate card payment through the merchant checkout.",
    icon: CreditCard,
  },
  {
    key: "cod",
    label: "Cash on Delivery",
    note: "Traditional delivery settlement on arrival.",
    icon: Send,
  },
  {
    key: "escrow",
    label: "Madmoun Escrow",
    note: "Recommended. Funds stay locked until delivery is confirmed.",
    icon: ShieldCheck,
  },
] as const;

export default function IntegratedCheckoutDemoPage() {
  const createTransaction = useAppStore((state) => state.createTransaction);
  const updateTransactionStatus = useAppStore((state) => state.updateTransactionStatus);
  const releaseEscrow = useAppStore((state) => state.releaseEscrow);

  const [selectedMethod, setSelectedMethod] = useState<(typeof paymentMethods)[number]["key"] | null>(null);
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [phase, setPhase] = useState<DemoEscrowPhase>("pending");
  const [escrowId, setEscrowId] = useState<string | null>(null);

  const total = useMemo(() => orderLines.reduce((sum, item) => sum + item.price, 0), []);

  const handleCreateEscrow = () => {
    const transactionId = createTransaction({
      amount: total,
      status: "pending",
      buyer: "Tech buyer",
      seller: merchantName,
      product: merchantName,
    });

    setEscrowId(transactionId);
    setPhase("pending");
    setShowEscrowModal(true);
    toast.success("Escrow created successfully.");
  };

  const advancePhase = () => {
    if (!escrowId) return;

    if (phase === "pending") {
      updateTransactionStatus(escrowId, "shipped");
      setPhase("shipped");
      toast.message("Shipment marked as shipped.");
      return;
    }

    if (phase === "shipped") {
      updateTransactionStatus(escrowId, "delivered");
      setPhase("delivered");
      toast.message("Delivery marked as confirmed.");
    }
  };

  const releaseFunds = () => {
    if (!escrowId) return;

    releaseEscrow(escrowId);
    setPhase("released");
    toast.success("Funds released to the merchant.");
  };

  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-[2rem] p-6 md:p-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
            Integrated Merchant Checkout
          </p>
          <h1 className="font-display text-3xl font-semibold text-white md:text-5xl">
            Checkout on the merchant site, secure the payment with Madmoun.
          </h1>
          <p className="text-sm leading-6 text-slate-300 md:text-base">
            Madmoun does not sell products. It sits between buyer and seller to hold funds until delivery is confirmed.
          </p>
        </div>
        <div className="mt-6 rounded-3xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-50">
          This is a merchant-side demo checkout. The goods belong to the merchant. Madmoun only handles escrow.
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-container gradient-border rounded-[2rem] p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Merchant checkout</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
                {merchantName}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Secure a real purchase flow without leaving the merchant experience.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-right text-xs uppercase tracking-[0.3em] text-emerald-100">
              Trusted Partner
            </div>
          </div>

          <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>Order summary</span>
              <span>Static demo data</span>
            </div>
            {orderLines.map((item) => (
              <div key={item.name} className="flex items-start justify-between gap-4 rounded-2xl border border-white/5 bg-slate-950/30 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
                </div>
                <p className="font-semibold text-emerald-100">EGP {item.price.toLocaleString()}</p>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-sm uppercase tracking-[0.3em] text-slate-400">Total</span>
              <span className="text-2xl font-semibold text-white">EGP {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Payment methods</p>
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.key;

              return (
                <button
                  key={method.key}
                  type="button"
                  onClick={() => setSelectedMethod(method.key)}
                  className={`flex items-start gap-4 rounded-3xl border px-4 py-4 text-left transition ${
                    isSelected
                      ? "border-emerald-400/50 bg-emerald-500/15 text-white shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/7"
                  }`}
                >
                  <span className={`rounded-2xl p-3 ${isSelected ? "bg-emerald-500/20 text-emerald-100" : "bg-slate-950/50 text-slate-200"}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-white">{method.label}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-300">{method.note}</span>
                  </span>
                  {method.key === "escrow" ? (
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-emerald-100">
                      Recommended
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selectedMethod === "escrow" ? (
              <motion.div
                key="escrow-explanation"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.2 }}
                className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-50"
              >
                Your payment will be held securely until you confirm delivery.
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleCreateEscrow}
                    className="rounded-full border border-emerald-300/40 bg-emerald-500/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100"
                  >
                    Proceed with Escrow
                  </button>
                  <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-emerald-100/70">
                    <CheckCircle2 className="h-4 w-4" />
                    Funds stay locked until release
                  </span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <section className="glass-container gradient-border rounded-[2rem] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Checkout clarity</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white">
              What Madmoun does here
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <p>• The merchant owns the checkout.</p>
              <p>• Madmoun only secures the funds.</p>
              <p>• Release happens after delivery is confirmed.</p>
            </div>
          </section>
        </div>
      </section>

      {escrowId ? (
        <EscrowLifecyclePanel
          merchantName={merchantName}
          amount={total}
          phase={phase}
          transactionId={escrowId}
          onAdvance={advancePhase}
          onRelease={releaseFunds}
        />
      ) : (
        <section className="glass-container gradient-border rounded-[2rem] p-6 text-sm text-slate-300 md:p-8">
          Select Madmoun Escrow to start the protected payment demo.
        </section>
      )}

      <AnimatePresence>
        {showEscrowModal ? (
          <motion.div
            key="escrow-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#091224] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.6)] md:p-8"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
                Redirect simulation
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
                Escrow Created Successfully
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Redirected into the Madmoun protection layer for {merchantName}.
              </p>
              <div className="mt-6 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Merchant</p>
                  <p className="mt-2 font-medium text-white">{merchantName}</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Amount locked</p>
                  <p className="mt-2 font-medium text-white">EGP {total.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Status</p>
                  <p className="mt-2 inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-amber-100">
                    Pending Shipment
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowEscrowModal(false)}
                  className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100"
                >
                  Continue to lifecycle
                </button>
                <button
                  type="button"
                  onClick={() => setShowEscrowModal(false)}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300"
                >
                  Close preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}