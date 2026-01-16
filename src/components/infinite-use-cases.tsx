"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Code2, KeyRound, ShieldCheck, Tv, Footprints } from "lucide-react";
import { BlurIn } from "@/components/blur-in";

const cards = [
  {
    title: "Electronics",
    description: "4K TV",
    badge: "Verification Pending",
    icon: Tv,
  },
  {
    title: "Fashion",
    description: "Designer Sneaker",
    badge: "Authenticity Guaranteed",
    icon: Footprints,
  },
  {
    title: "Freelance",
    description: "Code Editor",
    badge: "Milestone Payment Locked",
    icon: Code2,
  },
  {
    title: "Real Estate",
    description: "House Key",
    badge: "Deposit Escrowed",
    icon: KeyRound,
  },
];

export function InfiniteUseCases() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: [0, -1000],
      transition: { duration: 35, ease: "linear", repeat: Infinity },
    });
  }, [controls]);

  return (
    <section className="glass-container gradient-border rounded-3xl p-8">
      <header className="flex items-center justify-between">
        <BlurIn>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
              Infinite Trust
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white font-display">
              The escrow loop that never stops.
            </h2>
          </div>
        </BlurIn>
        <BlurIn delay={0.15}>
          <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-200 md:flex">
            <ShieldCheck className="h-4 w-4" />
            Protected at every mile
          </div>
        </BlurIn>
      </header>

      <div className="mt-8 overflow-hidden">
        <motion.div
          className="flex gap-6"
          style={{ willChange: "transform" }}
          animate={controls}
          onHoverStart={() => controls.stop()}
          onHoverEnd={() =>
            controls.start({
              x: [0, -1000],
              transition: { duration: 35, ease: "linear", repeat: Infinity },
            })
          }
        >
          {[...cards, ...cards].map((card, index) => (
            <article
              key={`${card.title}-${index}`}
              className="group glass-container gradient-border relative flex h-[240px] w-[360px] flex-col justify-between rounded-3xl p-6 transition duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                    {card.title}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white font-display">
                    {card.description}
                  </h3>
                </div>
                <div className="glass-container gradient-border flex h-12 w-12 items-center justify-center rounded-2xl">
                  <card.icon className="h-6 w-6 text-emerald-200" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-200">
                  {card.badge}
                </span>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Live escrow
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
