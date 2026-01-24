"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ShieldCheck, User, Wallet } from "lucide-react";
import { BlurIn } from "@/components/blur-in";

export function HowItWorks() {
  const laserRef = useRef<HTMLDivElement>(null);
  const sellerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      tl.set(sellerRef.current, { boxShadow: "0 0 0 rgba(16,185,129,0)" });
      tl.fromTo(
        laserRef.current,
        { x: "-10%", opacity: 0 },
        { x: "110%", opacity: 1, duration: 1.4, ease: "power2.inOut" }
      );
      tl.to(laserRef.current, { opacity: 0, duration: 0.2 }, "-=0.2");
      tl.to(
        sellerRef.current,
        {
          boxShadow: "0 0 30px rgba(16,185,129,0.6)",
          backgroundColor: "rgba(16,185,129,0.25)",
          duration: 0.3,
        },
        "-=0.1"
      );
      tl.to(
        sellerRef.current,
        {
          boxShadow: "0 0 0 rgba(16,185,129,0)",
          backgroundColor: "rgba(2,6,23,0.6)",
          duration: 0.6,
        },
        "+=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="glass-container gradient-border rounded-3xl p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <BlurIn>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white font-display">
              Verification scanning, escrow locked, seller green-lit.
            </h2>
          </div>
        </BlurIn>
        <BlurIn delay={0.1}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-200">
            <ShieldCheck className="h-4 w-4" />
            Secure Escrow Flow
          </div>
        </BlurIn>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="glass-container gradient-border rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Step 1
            </p>
            <p className="mt-2 text-base text-slate-200">
              Buyer funds are locked in the Madmoun vault while identity is verified.
            </p>
          </div>
          <div className="glass-container gradient-border rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Step 2
            </p>
            <p className="mt-2 text-base text-slate-200">
              The protocol scans delivery proof, green-lighting release on confirmation.
            </p>
          </div>
        </div>

        <div className="glass-container gradient-border relative overflow-hidden rounded-3xl p-6">
          <div className="relative flex items-center justify-between">
            <div className="flex flex-col items-center gap-2" data-magnetic>
              <div className="glass-container gradient-border flex h-16 w-16 items-center justify-center rounded-2xl">
                <User className="h-8 w-8 text-emerald-200" />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Buyer
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="glass-container gradient-border flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                <Wallet className="h-8 w-8 text-emerald-200" />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Vault
              </span>
            </div>
            <div className="flex flex-col items-center gap-2" data-magnetic>
              <div
                ref={sellerRef}
                className="glass-container gradient-border flex h-16 w-16 items-center justify-center rounded-2xl bg-[#020617]/60"
              >
                <ShieldCheck className="h-8 w-8 text-emerald-200" />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Seller
              </span>
            </div>
          </div>

          <div className="mt-6 h-2 rounded-full bg-emerald-500/10 relative overflow-hidden">
            <div ref={laserRef} className="verification-laser" />
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-emerald-200/70">
            Verification scanning in progress
          </p>
        </div>
      </div>
    </section>
  );
}
