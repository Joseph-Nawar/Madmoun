"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Code2, ShieldCheck, Shirt, Tv } from "lucide-react";

const steps = [
  {
    title: "Buying a 65' TV from Amazon?",
    subtitle: "Money Locked",
    description:
      "Madmoun locks the payment instantly and releases it only when delivery is verified.",
    icon: Tv,
  },
  {
    title: "A custom hoodie from an Instagram Brand?",
    subtitle: "Secured by Madmoun",
    description:
      "Every social commerce transaction gains escrow protection that buyers trust.",
    icon: Shirt,
  },
  {
    title: "Hiring a freelance developer?",
    subtitle: "Funds released only on delivery",
    description:
      "Milestones are confirmed before payouts, keeping both sides protected.",
    icon: Code2,
  },
];

export function SecuringWorldSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      steps.length - 1,
      Math.floor(latest * steps.length)
    );
    setActiveIndex(nextIndex);
  });

  return (
    <section
      ref={containerRef}
      className="glass-container gradient-border relative min-h-[180vh] rounded-3xl p-8"
    >
      <header>
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">
          Securing the world
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white font-display">
          Whatever you buy, Madmoun secures it.
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Scroll to watch escrow protection shift across commerce, social shopping,
          and professional services.
        </p>
      </header>

      <section className="sticky top-24 mt-12">
        <div className="relative h-[60vh]">
          <AnimatePresence mode="wait">
            {steps.map((step, index) =>
              index === activeIndex ? (
                <motion.article
                  key={step.title}
                  className="glass-container gradient-border absolute inset-0 flex flex-col justify-between rounded-3xl p-10"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                        Use Case {index + 1}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-white font-display">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300">
                        {step.description}
                      </p>
                    </div>
                    <motion.div
                      layoutId="usecase-icon"
                      className="glass-container gradient-border flex h-12 w-12 items-center justify-center rounded-2xl"
                    >
                      <step.icon className="h-6 w-6 text-emerald-200" />
                    </motion.div>
                  </div>
                  <div className="glass-container gradient-border relative flex items-center justify-between rounded-3xl p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                        Overlay
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white font-display">
                        {step.subtitle}
                      </p>
                    </div>
                    <motion.div
                      className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600/20"
                      animate={{ rotate: [0, 6, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ShieldCheck className="h-8 w-8 text-emerald-200" />
                    </motion.div>
                  </div>
                  <figure className="glass-container gradient-border mt-6 flex items-center justify-between rounded-3xl p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                        Visual
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        {step.subtitle}
                      </p>
                    </div>
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-950/70">
                      <step.icon className="h-10 w-10 text-emerald-200" />
                      <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600/30">
                        <ShieldCheck className="h-4 w-4 text-emerald-100" />
                      </span>
                    </div>
                  </figure>
                </motion.article>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </section>
    </section>
  );
}
