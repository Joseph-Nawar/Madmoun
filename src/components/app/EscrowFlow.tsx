"use client";

import type { Product, User } from "@/store/mockStore";

const steps = [
  { id: 1, title: "Amount", icon: "💰" },
  { id: 2, title: "Seller", icon: "🏪" },
  { id: 3, title: "Delivery", icon: "🚚" },
  { id: 4, title: "Review", icon: "✅" },
];

type EscrowFlowProps = {
  currentStep: number;
  formData: {
    amount: number;
    sellerId: string;
    productId: string;
    deliveryAddress: string;
    notes: string;
  };
  onStepChange: (step: number) => void;
  onStepComplete: (data: Partial<EscrowFlowProps["formData"]>) => void;
  products: Product[];
  users: User[];
};

export function EscrowFlow({
  currentStep,
  formData,
  onStepChange,
  onStepComplete,
  products,
  users,
}: EscrowFlowProps) {
  return (
    <section className="glass-container gradient-border rounded-3xl p-6">
      <div className="grid gap-4 md:grid-cols-4">
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepChange(step.id)}
            className={`rounded-2xl border px-3 py-4 text-sm transition ${
              step.id <= currentStep
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                : "border-white/10 bg-white/5 text-slate-400"
            }`}
          >
            <div className="text-xl">{step.icon}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.25em]">
              {step.title}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {currentStep === 1 && (
          <div className="space-y-3">
            <label className="text-sm text-slate-300">Escrow Amount</label>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-sm text-slate-400">EGP</span>
              <input
                type="number"
                placeholder="0"
                value={formData.amount || ""}
                onChange={(event) =>
                  onStepComplete({ amount: Number(event.target.value) })
                }
                className="w-full bg-transparent text-lg text-white outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[500, 1000, 2500, 5000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => onStepComplete({ amount })}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                >
                  EGP {amount}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-3">
            <label className="text-sm text-slate-300">Select Seller</label>
            <select
              value={formData.sellerId}
              onChange={(event) => onStepComplete({ sellerId: event.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            >
              <option value="">Choose a seller</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <label className="text-sm text-slate-300">Select Product</label>
            <select
              value={formData.productId}
              onChange={(event) => onStepComplete({ productId: event.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            >
              <option value="">Choose a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.title} • EGP {product.price}
                </option>
              ))}
            </select>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-3">
            <label className="text-sm text-slate-300">Delivery Address</label>
            <textarea
              rows={3}
              placeholder="Street, district, building number"
              value={formData.deliveryAddress}
              onChange={(event) =>
                onStepComplete({ deliveryAddress: event.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
            <label className="text-sm text-slate-300">Delivery Notes</label>
            <input
              type="text"
              placeholder="Optional notes"
              value={formData.notes}
              onChange={(event) => onStepComplete({ notes: event.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-3 text-sm text-slate-300">
            <p>Review your escrow details before confirming.</p>
            <ul className="space-y-2">
              <li>Amount: EGP {formData.amount || 0}</li>
              <li>Seller: {users.find((user) => user.id === formData.sellerId)?.name || "Not selected"}</li>
              <li>Product: {products.find((product) => product.id === formData.productId)?.title || "Not selected"}</li>
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => onStepChange(Math.max(currentStep - 1, 1))}
            className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-300"
            disabled={currentStep === 1}
          >
            Back
          </button>
          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={() => onStepChange(Math.min(currentStep + 1, steps.length))}
              className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-emerald-100"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-emerald-100"
              onClick={() => onStepComplete({})}
            >
              Confirm Escrow
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
