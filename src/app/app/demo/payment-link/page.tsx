"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Copy, MessageCircleMore, Send, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "@/store/mockStore";
import { EscrowLifecyclePanel, type DemoEscrowPhase } from "@/components/demo/EscrowLifecyclePanel";

export default function PaymentLinkDemoPage() {
  const createTransaction = useAppStore((state) => state.createTransaction);
  const updateTransactionStatus = useAppStore((state) => state.updateTransactionStatus);
  const releaseEscrow = useAppStore((state) => state.releaseEscrow);

  const [sellerName, setSellerName] = useState("Omar Trading");
  const [amount, setAmount] = useState(8400);
  const [description, setDescription] = useState("Custom office equipment order");
  const [generatedLink, setGeneratedLink] = useState("");
  const [phase, setPhase] = useState<DemoEscrowPhase>("pending");
  const [escrowId, setEscrowId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<"buyer" | "seller">("buyer");

  const shareText = useMemo(
    () =>
      `Send this secure Madmoun payment link to ${sellerName}: ${generatedLink || "https://madmoun.eg/pay/demo"}`,
    [generatedLink, sellerName]
  );

  const handleGenerateLink = () => {
    const token = Math.random().toString(36).slice(2, 8).toUpperCase();
    setGeneratedLink(`https://madmoun.eg/pay/${token}`);
    setPhase("pending");
    setEscrowId(null);
    setActiveStep("buyer");
    toast.success("Secure payment link generated.");
  };

  const handleCopyLink = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    toast.success("Payment link copied.");
  };

  const handleWhatsAppShare = () => {
    if (!generatedLink) return;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleSellerAccept = () => {
    const transactionId = createTransaction({
      amount,
      status: "pending",
      buyer: "Buyer via payment link",
      seller: sellerName,
      product: sellerName,
    });

    setEscrowId(transactionId);
    setPhase("pending");
    toast.success("Seller accepted the escrow setup.");
  };

  const advancePhase = () => {
    if (!escrowId) return;

    if (phase === "pending") {
      updateTransactionStatus(escrowId, "shipped");
      setPhase("shipped");
      toast.message("Seller marked the order as shipped.");
      return;
    }

    if (phase === "shipped") {
      updateTransactionStatus(escrowId, "delivered");
      setPhase("delivered");
      toast.message("Delivery confirmed.");
    }
  };

  const releaseFunds = () => {
    if (!escrowId) return;

    releaseEscrow(escrowId);
    setPhase("released");
    toast.success("Funds released to the seller.");
  };

  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-[2rem] p-6 md:p-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
            Non-Integrated Seller Flow
          </p>
          <h1 className="font-display text-3xl font-semibold text-white md:text-5xl">
            Generate a payment link, then let the seller join escrow.
          </h1>
          <p className="text-sm leading-6 text-slate-300 md:text-base">
            Madmoun does not sell products. It secures transactions between buyer and seller, even when the seller has no website integration.
          </p>
        </div>
        <div className="mt-6 rounded-3xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-50">
          This demo shows a buyer creating a secure link, then switching to the seller view to accept escrow.
        </div>
      </header>

      <section className="space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-container gradient-border rounded-[2rem] p-6 md:p-8"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Step 1</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-white">
            Create Escrow
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-300">
              <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">Seller name</span>
              <input
                value={sellerName}
                onChange={(event) => setSellerName(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="Seller name"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">Amount</span>
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-300 md:col-span-1">
              <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">Description</span>
              <input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="Transaction description"
              />
            </label>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleGenerateLink}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-5 py-3 text-xs uppercase tracking-[0.3em] text-emerald-100 transition hover:bg-emerald-500/20"
            >
              Proceed with Escrow
              <Send className="h-4 w-4" />
            </button>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Madmoun does not sell products. We secure transactions between buyers and sellers.
            </span>
          </div>
        </motion.section>

        {generatedLink ? (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-container gradient-border rounded-[2rem] p-6 md:p-8"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Step 2</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white">
              Link Generated
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Send this link to the seller to complete the escrow setup.
            </p>
            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
              <p className="truncate font-mono text-emerald-100">{generatedLink}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100"
              >
                <MessageCircleMore className="h-4 w-4" />
                WhatsApp Share
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-100/70">
              <CheckCircle2 className="h-4 w-4" />
              {description}
            </div>
          </motion.section>
        ) : null}

        {generatedLink ? (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-container gradient-border rounded-[2rem] p-6 md:p-8"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Step 3</p>
            <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-semibold text-white">
                  Switch to Seller View
                </h2>
                <p className="text-sm leading-6 text-slate-300">
                  Keep the flow full-width and move into the seller handoff when you are ready.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep("seller")}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-5 py-3 text-xs uppercase tracking-[0.3em] text-emerald-100 transition hover:bg-emerald-500/20"
              >
                Switch to Seller View
                <ShieldCheck className="h-4 w-4" />
              </button>
            </div>
          </motion.section>
        ) : null}

        <AnimatePresence mode="wait">
          {activeStep === "seller" && generatedLink ? (
            <motion.section
              key="seller-view"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="glass-container gradient-border rounded-[2rem] p-6 md:p-8"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Step 4</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                Seller View
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The seller receives the payment link, reviews the escrow terms, and accepts before shipment.
              </p>
              <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Seller</span>
                  <span className="font-medium text-white">{sellerName}</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-slate-400">Amount</span>
                  <span className="font-medium text-white">EGP {amount.toLocaleString()}</span>
                </div>
                <div className="mt-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-emerald-100">
                  Escrow terms ready
                </div>
              </div>
              <button
                type="button"
                onClick={handleSellerAccept}
                disabled={!generatedLink}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-5 py-3 text-xs uppercase tracking-[0.3em] text-emerald-100 transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                Proceed with Escrow
                <ShieldCheck className="h-4 w-4" />
              </button>
            </motion.section>
          ) : null}
        </AnimatePresence>

        <div className="space-y-6">
          {escrowId ? (
            <EscrowLifecyclePanel
              merchantName={sellerName}
              amount={amount}
              phase={phase}
              transactionId={escrowId}
              onAdvance={advancePhase}
              onRelease={releaseFunds}
            />
          ) : (
            <section className="glass-container gradient-border rounded-[2rem] p-6 text-sm text-slate-300 md:p-8">
              Step 5 appears here after the seller accepts the escrow setup.
            </section>
          )}
        </div>
      </section>
    </div>
  );
}