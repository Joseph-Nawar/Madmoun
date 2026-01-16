import { ArrowRightLeft, HandCoins, ShieldCheck } from "lucide-react";

const flowItems = [
  {
    title: "Buyer Deposit",
    description:
      "EGP is locked the moment Ahmed confirms the deal. No risk, no last-minute surprises.",
    icon: HandCoins,
    accent: "from-emerald-500/30",
  },
  {
    title: "Madmoun Escrow",
    description:
      "We verify delivery and release funds only when both sides are satisfied.",
    icon: ShieldCheck,
    accent: "from-amber-500/30",
  },
  {
    title: "Seller Payout",
    description:
      "Omar receives a guaranteed payout the minute the handover is complete.",
    icon: ArrowRightLeft,
    accent: "from-emerald-500/30",
  },
];

export function BentoGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {flowItems.map((item) => (
        <div
          key={item.title}
          className="glass-container gradient-border group relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_25px_60px_rgba(5,150,105,0.15)]"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.accent} via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100`}
          />
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
            <item.icon className="h-5 w-5 text-emerald-200" />
          </div>
          <div className="relative z-10 mt-5 space-y-2">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm leading-relaxed text-slate-300">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
