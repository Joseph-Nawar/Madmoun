"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EscrowFlow } from "@/components/app/EscrowFlow";
import { useAppStore } from "@/store/mockStore";

export default function NewTransactionPage() {
  const router = useRouter();
  const { products, users, createTransaction } = useAppStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: 0,
    sellerId: "",
    productId: "",
    deliveryAddress: "",
    notes: "",
  });

  const handleStepComplete = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleConfirm = () => {
    const seller = users.find((user) => user.id === formData.sellerId);
    const product = products.find((item) => item.id === formData.productId);
    if (!seller || !product || !formData.amount) {
      toast.error("Please complete all steps before confirming.");
      return;
    }

    const transactionId = createTransaction({
      amount: formData.amount,
      status: "pending",
      buyer: "You",
      seller: seller.name,
      product: product.title,
    });

    toast.success("Escrow created successfully.");
    router.push(`/app/transaction/${transactionId}`);
  };

  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-3xl p-6">
        <h1 className="text-2xl font-semibold text-white font-display">
          Create Escrow Transaction
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Follow the steps to secure your transaction.
        </p>
      </header>
      <EscrowFlow
        currentStep={step}
        formData={formData}
        onStepChange={setStep}
        onStepComplete={handleStepComplete}
        products={products}
        users={users.filter((user) => user.id !== users[0]?.id)}
      />
      {step === 4 && (
        <button
          type="button"
          onClick={handleConfirm}
          className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-emerald-100"
        >
          Confirm Escrow
        </button>
      )}
      <section className="glass-container gradient-border rounded-3xl p-6 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Estimated Timeline</h2>
        <ul className="mt-3 space-y-2">
          <li>1-3 hours: payment verification & escrow activation.</li>
          <li>24 hours: seller ships the item.</li>
          <li>2-4 days: delivery & confirmation.</li>
        </ul>
      </section>
    </div>
  );
}
