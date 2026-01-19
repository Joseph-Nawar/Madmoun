import { SpotlightHero } from "@/components/spotlight-hero";
import { InfiniteUseCases } from "@/components/infinite-use-cases";
import { MerchantEdge } from "@/components/merchant-edge";
import { VaultWallet } from "@/components/vault-wallet";

export default function Home() {
  return (
    <main className="opacity-100 relative z-50 space-y-16 pt-10">
      <SpotlightHero />

      <InfiniteUseCases />

      <MerchantEdge />

      <section className="glass-container gradient-border rounded-3xl p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
          Vault Preview
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white font-display">
          The escrow core your buyers trust.
        </h2>
        <div className="mt-6">
          <VaultWallet />
        </div>
      </section>
    </main>
  );
}
