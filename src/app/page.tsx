import { BentoGrid } from "@/components/bento-grid";
import { InfiniteUseCases } from "@/components/infinite-use-cases";
import { MerchantEdge } from "@/components/merchant-edge";
import { MoneyAmount } from "@/components/money-amount";
import { MoneyEssence } from "@/components/money-essence";
import { SpotlightHero } from "@/components/spotlight-hero";

export default function Home() {
  return (
    <main className="relative space-y-16 pt-10">
      <MoneyEssence />
      <SpotlightHero />

      <section className="glass-container gradient-border space-y-6 rounded-3xl p-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">
              Escrow Flow
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl font-display">
              Buyer → Madmoun → Seller
            </h2>
          </div>
          <span className="glass-container gradient-border hidden rounded-full px-4 py-2 text-xs text-slate-300 md:block">
            Cairo · Giza · Alexandria
          </span>
        </header>
        <BentoGrid />
      </section>

      <InfiniteUseCases />

      <MerchantEdge />

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <article className="glass-container gradient-border rounded-3xl p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">
            Competition ready
          </p>
          <h3 className="mt-4 text-2xl font-semibold text-white font-display">
            Secure payments for every marketplace handover.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Madmoun delivers premium escrow with instant verification, insured
            handovers, and a transparent timeline that earns trust on both sides
            of the deal.
          </p>
        </article>
        <article className="glass-container gradient-border rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/20 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
            Trust score
          </p>
          <MoneyAmount
            value={98.7}
            type="percentage"
            className="mt-3 text-4xl font-semibold text-white font-display"
          />
          <p className="mt-2 text-sm text-slate-300">
            Transaction success rate across high-value electronics and auto
            listings.
          </p>
        </article>
      </section>
    </main>
  );
}
