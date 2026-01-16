"use client";

import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function TrustVisualizer() {
  return (
    <div className="glass-container gradient-border relative flex items-center gap-3 rounded-2xl px-4 py-3">
      <motion.div
        className="absolute inset-0 rounded-2xl border border-emerald-400/40"
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.03, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShieldCheck className="h-5 w-5 text-emerald-300" />
      </motion.div>
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
          Madmoun Protected
        </p>
        <p className="text-sm text-emerald-100">Shield status: Active</p>
      </div>
    </div>
  );
}
