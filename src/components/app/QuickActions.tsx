import Link from "next/link";

type QuickActionsProps = {
  onQuickAdd?: (amount: number) => void;
  quickAmounts?: number[];
};

const actions = [
  { label: "Add Funds", icon: "➕", href: "/app/wallet/add-funds" },
  { label: "New Escrow", icon: "🔒", href: "/app/transaction/new" },
  { label: "Marketplace", icon: "🛒", href: "/app/marketplace" },
  { label: "Profile", icon: "👤", href: "/app/profile" },
];

export function QuickActions({ onQuickAdd, quickAmounts }: QuickActionsProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="glass-container gradient-border flex items-center justify-between rounded-2xl px-4 py-4 text-sm text-slate-100"
        >
          <span>{action.label}</span>
          <span className="text-lg">{action.icon}</span>
        </Link>
      ))}
      {onQuickAdd && quickAmounts && (
        <div className="glass-container gradient-border rounded-2xl px-4 py-4 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Quick Top-up
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => onQuickAdd(amount)}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200"
              >
                EGP {amount}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
