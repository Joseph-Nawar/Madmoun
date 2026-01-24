"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const updates = [
  "Wallet #4829: Payment Secured in Escrow...",
  "System: Insurance Partnership Verified for Delivery #902...",
  "Risk Engine: Buyer Identity Confirmed — Vault Greenlit...",
];

export function LivePulseHub() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % updates.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[55] hidden md:block">
      <div className="glass-container gradient-border flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={updates[index]}
            className="text-[10px] uppercase tracking-[0.32em] text-emerald-100"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {updates[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
