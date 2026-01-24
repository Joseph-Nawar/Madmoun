import { SpotlightHero } from "@/components/spotlight-hero";
import { InfiniteUseCases } from "@/components/infinite-use-cases";
import { MerchantEdge } from "@/components/merchant-edge";

export default function Home() {
  return (
    <main className="opacity-100 relative z-50 space-y-16 pt-10">
      <SpotlightHero />
      <section id="features">
        <InfiniteUseCases />
      </section>
      <section>
        <MerchantEdge />
      </section>
    </main>
  );
}
