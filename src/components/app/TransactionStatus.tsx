const statusConfig = {
  pending: {
    label: "Pending",
    color: "text-amber-200",
    icon: "⏳",
    description: "Awaiting payment confirmation",
  },
  escrow: {
    label: "In Escrow",
    color: "text-emerald-200",
    icon: "🔒",
    description: "Funds are secured by Madmoun",
  },
  shipped: {
    label: "Shipped",
    color: "text-sky-200",
    icon: "🚚",
    description: "Package is on the way",
  },
  delivered: {
    label: "Delivered",
    color: "text-emerald-200",
    icon: "📦",
    description: "Awaiting delivery confirmation",
  },
  completed: {
    label: "Completed",
    color: "text-emerald-200",
    icon: "✅",
    description: "Funds released to seller",
  },
  disputed: {
    label: "Disputed",
    color: "text-rose-200",
    icon: "⚖️",
    description: "Dispute resolution in progress",
  },
} as const;

type StatusKey = keyof typeof statusConfig;

export function TransactionStatus({ status }: { status: StatusKey }) {
  const config = statusConfig[status];

  return (
    <section className="glass-container gradient-border rounded-3xl p-6">
      <div className="flex items-center gap-3">
        <span className="text-xl">{config.icon}</span>
        <div>
          <p className={`text-sm font-semibold ${config.color}`}>
            Status: {config.label}
          </p>
          <p className="text-xs text-slate-400">{config.description}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {Object.entries(statusConfig).map(([key, item]) => (
          <div
            key={key}
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-xs uppercase tracking-[0.2em] ${
              key === status
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                : "border-white/10 bg-white/5 text-slate-400"
            }`}
          >
            <span>{item.label}</span>
            <span>{item.icon}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
