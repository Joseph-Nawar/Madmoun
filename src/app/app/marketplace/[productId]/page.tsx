"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { CheckCircle } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/mockStore";

export default function MarketplaceDetailPage() {
  const params = useParams<{ productId: string }>();
  const { products, balance, currentUser, createTransaction } = useAppStore();
  const product = products.find((item) => item.id === params.productId) ?? products[0];
  const [showDeclined, setShowDeclined] = useState(false);
  const [declinedKey, setDeclinedKey] = useState(0);
  const [isSecured, setIsSecured] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const particleLayerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!showDeclined) return;
    const timer = setTimeout(() => setShowDeclined(false), 2400);
    return () => clearTimeout(timer);
  }, [showDeclined]);


  useLayoutEffect(() => {
    if (!isSecured || !buttonRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(buttonRef.current, {
        scale: 1.03,
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        delay: 0.2,
        ease: "power2.out",
      });
    }, buttonRef);

    return () => ctx.revert();
  }, [isSecured]);

  const launchParticles = () => {
    if (!buttonRef.current || !particleLayerRef.current) return;
    const target = document.getElementById("vault-wallet-icon");
    if (!target) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    const particles = Array.from({ length: 8 }).map(() => {
      const particle = document.createElement("span");
      particle.className =
        "pointer-events-none fixed h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]";
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particleLayerRef.current?.appendChild(particle);
      return particle;
    });

    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: endX - startX + gsap.utils.random(-12, 12),
        y: endY - startY + gsap.utils.random(-12, 12),
        opacity: 0,
        scale: 0.3,
        duration: 0.8,
        delay: index * 0.04,
        ease: "power3.inOut",
        onComplete: () => particle.remove(),
      });
    });
  };

  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-3xl p-6">
        <h1 className="text-2xl font-semibold text-white font-display">Product Details</h1>
        <p className="mt-2 text-sm text-slate-300">
          Verified item protected by Madmoun escrow.
        </p>
      </header>

      <section className="glass-container gradient-border rounded-3xl p-6">
        <h2 className="text-lg font-semibold text-white">{product.title}</h2>
        <p className="mt-2 text-sm text-slate-300">Seller: {product.seller}</p>
        <p className="mt-2 text-sm text-emerald-200">Rating {product.rating}⭐</p>
        <p className="mt-4 text-2xl font-semibold text-white">EGP {product.price}</p>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => {
            if (balance < product.price) {
              setDeclinedKey((prev) => prev + 1);
              setShowDeclined(true);
              return;
            }

            createTransaction({
              amount: product.price,
              status: "pending",
              buyer: currentUser.name,
              seller: product.seller,
              product: product.title,
            });

            setIsSecured(true);
            launchParticles();
          }}
          className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
            isSecured
              ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.35)]"
              : "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
          }`}
        >
          {isSecured ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Funds Secured
            </>
          ) : (
            "Start Escrow"
          )}
        </button>
        <AnimatePresence>
          {showDeclined && (
            <motion.div
              key={declinedKey}
              className="mt-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-rose-100 shadow-[0_0_25px_rgba(244,63,94,0.45)]"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              Transaction Declined: Insufficient Funds. Please top up your Vault.
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div ref={particleLayerRef} className="pointer-events-none fixed inset-0 z-[60]" />

      <Link href="/app/marketplace" className="text-xs uppercase tracking-[0.3em] text-slate-400">
        Back to Marketplace
      </Link>
    </div>
  );
}
