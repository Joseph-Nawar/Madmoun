"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building2, CheckCircle2, Copy, CreditCard, MessageCircleMore, Send, ShieldCheck, Smartphone } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "@/store/mockStore";
import { EscrowLifecyclePanel, type DemoEscrowPhase } from "@/components/demo/EscrowLifecyclePanel";

type PayoutMethod = "bank" | "card" | "instapay" | "wallet" | "other";

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
  const [payoutMethod, setPayoutMethod] = useState<PayoutMethod | null>(null);
  const [bankAccountHolder, setBankAccountHolder] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [cardLast4, setCardLast4] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otherPayoutDetails, setOtherPayoutDetails] = useState("");

  const shareText = useMemo(
    () =>
      `Send this secure Madmoun payment link to ${sellerName}: ${generatedLink || "https://madmoun.eg/pay/demo"}`,
    [generatedLink, sellerName]
  );

  const payoutMethodOptions = useMemo(
    () => [
      {
        id: "bank" as const,
        title: "Bank Account",
        description: "Account transfer for traditional settlement.",
        icon: Building2,
      },
      {
        id: "card" as const,
        title: "Debit / Credit Card",
        description: "Receive to a card, keeping only the last 4 digits.",
        icon: CreditCard,
      },
      {
        id: "instapay" as const,
        title: "InstaPay",
        description: "Recommended for Egypt-wide instant transfers.",
        icon: Smartphone,
        badge: "Recommended 🇪🇬",
      },
      {
        id: "wallet" as const,
        title: "Mobile Wallet",
        description: "Send funds to a mobile wallet number.",
        icon: Smartphone,
      },
      {
        id: "other" as const,
        title: "Other",
        description: "Add a short note for an alternative payout route.",
        icon: Building2,
      },
    ],
    []
  );

  const payoutReady = useMemo(() => {
    if (!payoutMethod) return false;

    switch (payoutMethod) {
      case "bank":
        return bankAccountHolder.trim().length > 0 && bankAccountNumber.trim().length > 0;
      case "card":
        return cardholderName.trim().length > 0 && /^\d{4}$/.test(cardLast4.trim());
      case "instapay":
      case "wallet":
        return phoneNumber.trim().length > 0;
      case "other":
        return otherPayoutDetails.trim().length > 0;
      default:
        return false;
    }
  }, [bankAccountHolder, bankAccountNumber, cardLast4, cardholderName, otherPayoutDetails, payoutMethod, phoneNumber]);

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
    if (!payoutReady) return;

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
                <section className="mt-5 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-semibold text-white">
                      How would you like to receive your funds?
                    </h3>
                    <p className="text-xs leading-5 text-slate-400">
                      This information is used to release your funds once delivery is confirmed.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {payoutMethodOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = payoutMethod === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setPayoutMethod(option.id)}
                          className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                            isSelected
                              ? "border-emerald-400/40 bg-emerald-500/15 text-white shadow-[0_0_0_1px_rgba(16,185,129,0.15)]"
                              : "border-white/10 bg-white/0 text-slate-300 hover:border-white/20 hover:bg-white/5"
                          }`}
                        >
                          <span className={`mt-0.5 rounded-xl p-2 ${isSelected ? "bg-emerald-400/15 text-emerald-100" : "bg-white/5 text-slate-300"}`}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1 space-y-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="font-medium text-white">{option.title}</span>
                              {option.badge ? (
                                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.25em] text-emerald-100">
                                  {option.badge}
                                </span>
                              ) : null}
                            </span>
                            <span className="block text-xs leading-5 text-slate-400">{option.description}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence mode="wait">
                    {payoutMethod ? (
                      <motion.div
                        key={payoutMethod}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {payoutMethod === "bank" ? (
                          <div className="space-y-4">
                            <label className="space-y-2 text-sm text-slate-300">
                              <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">
                                Account Holder Name
                              </span>
                              <input
                                value={bankAccountHolder}
                                onChange={(event) => setBankAccountHolder(event.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                                placeholder="Account holder name"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-slate-300">
                              <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">
                                IBAN or Account Number
                              </span>
                              <input
                                value={bankAccountNumber}
                                onChange={(event) => setBankAccountNumber(event.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                                placeholder="IBAN or account number"
                              />
                            </label>
                          </div>
                        ) : null}

                        {payoutMethod === "card" ? (
                          <div className="space-y-4">
                            <label className="space-y-2 text-sm text-slate-300">
                              <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">
                                Cardholder Name
                              </span>
                              <input
                                value={cardholderName}
                                onChange={(event) => setCardholderName(event.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                                placeholder="Name on card"
                              />
                            </label>
                            <label className="space-y-2 text-sm text-slate-300">
                              <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">
                                Last 4 digits only
                              </span>
                              <input
                                value={cardLast4}
                                onChange={(event) => setCardLast4(event.target.value.replace(/\D/g, "").slice(0, 4))}
                                inputMode="numeric"
                                maxLength={4}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                                placeholder="1234"
                              />
                            </label>
                          </div>
                        ) : null}

                        {payoutMethod === "instapay" || payoutMethod === "wallet" ? (
                          <label className="space-y-2 text-sm text-slate-300">
                            <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">
                              Phone Number
                            </span>
                            <input
                              value={phoneNumber}
                              onChange={(event) => setPhoneNumber(event.target.value)}
                              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                              placeholder="01xxxxxxxxx"
                            />
                          </label>
                        ) : null}

                        {payoutMethod === "other" ? (
                          <label className="space-y-2 text-sm text-slate-300">
                            <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">
                              Other payout details
                            </span>
                            <input
                              value={otherPayoutDetails}
                              onChange={(event) => setOtherPayoutDetails(event.target.value)}
                              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                              placeholder="Describe the preferred payout route"
                            />
                          </label>
                        ) : null}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </section>
              <button
                type="button"
                onClick={handleSellerAccept}
                  disabled={!payoutReady}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-5 py-3 text-xs uppercase tracking-[0.3em] text-emerald-100 transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                  Accept Escrow
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