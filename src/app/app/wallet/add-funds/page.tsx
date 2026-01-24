import Link from "next/link";

const methods = [
  { title: "Card", description: "Instant debit or credit card top-up" },
  { title: "Bank Transfer", description: "Use your IBAN for transfer" },
  { title: "InstaPay", description: "Fast transfer via InstaPay" },
];

export default function AddFundsPage() {
  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-3xl p-6">
        <h1 className="text-2xl font-semibold text-white font-display">Add Funds</h1>
        <p className="mt-2 text-sm text-slate-300">
          Choose your preferred top-up method.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {methods.map((method) => (
          <div
            key={method.title}
            className="glass-container gradient-border rounded-3xl p-5"
          >
            <h3 className="text-lg font-semibold text-white">{method.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{method.description}</p>
            <button className="mt-4 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-100">
              Start Top-up
            </button>
          </div>
        ))}
      </section>

      <Link
        href="/app/wallet"
        className="text-xs uppercase tracking-[0.3em] text-slate-400"
      >
        Back to Wallet
      </Link>
    </div>
  );
}
