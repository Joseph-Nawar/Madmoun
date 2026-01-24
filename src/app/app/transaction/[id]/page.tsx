"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { TransactionStatus } from "@/components/app/TransactionStatus";
import { useAppStore } from "@/store/mockStore";

export default function AppTransactionDetailPage() {
  const params = useParams<{ id: string }>();
  const { transactions, updateTransactionStatus, releaseEscrow } = useAppStore();
  const [message, setMessage] = useState("");

  const transaction = useMemo(
    () => transactions.find((tx) => tx.id === params.id) ?? transactions[0],
    [params.id, transactions]
  );

  const messages = [
    { from: transaction.seller, text: "Shipment picked up and on the way." },
    { from: "You", text: "Received the package, checking condition." },
  ];

  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          {transaction.id}
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white font-display">
          Escrow Transaction - {transaction.product}
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Amount: EGP {transaction.amount}
        </p>
      </header>

      <TransactionStatus status={transaction.status} />

      <section className="glass-container gradient-border rounded-3xl p-6">
        <h2 className="text-lg font-semibold text-white">Transaction Chat</h2>
        <div className="mt-4 space-y-3">
          {messages.map((message, index) => (
            <div
              key={`${message.from}-${index}`}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
            >
              <p className="text-xs text-slate-400">{message.from}</p>
              <p className="mt-1">{message.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          />
          <button
            className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-emerald-100"
            type="button"
            onClick={() => {
              setMessage("");
              toast.success("Message sent");
            }}
          >
            Send
          </button>
        </div>
      </section>

      <section className="glass-container gradient-border rounded-3xl p-6">
        <h2 className="text-lg font-semibold text-white">Dispute Resolution</h2>
        <p className="mt-2 text-sm text-slate-300">
          If something goes wrong, open a dispute and our team will assist.
        </p>
        <button
          className="mt-4 rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-rose-100"
          type="button"
          onClick={() => {
            updateTransactionStatus(transaction.id, "disputed");
            toast.error("Dispute opened. Our team is reviewing.");
          }}
        >
          Open Dispute
        </button>
      </section>

      <section className="glass-container gradient-border rounded-3xl p-6">
        <h2 className="text-lg font-semibold text-white">Release Funds</h2>
        <p className="mt-2 text-sm text-slate-300">
          Confirm delivery to release escrow to the seller.
        </p>
        <button
          className="mt-4 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100"
          type="button"
          onClick={() => {
            if (transaction.status !== "delivered") {
              toast.message("Release is available after delivery confirmation.");
              return;
            }
            releaseEscrow(transaction.id);
            toast.success("Funds released to seller.");
          }}
        >
          Confirm Delivery & Release
        </button>
      </section>
    </div>
  );
}
