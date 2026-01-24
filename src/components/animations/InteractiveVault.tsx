"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { initGsap } from "@/lib/animations/gsap-config";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const moneySymbols = Array.from({ length: 8 }).map((_, index) => ({
  id: `money-${index}`,
  delay: index * 0.18,
}));

export function InteractiveVault() {
  const vaultRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [showBreakdown, setShowBreakdown] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) return;
    if (!vaultRef.current) return;

    initGsap();

    const ctx = gsap.context(() => {
      const leftDoor = vaultRef.current?.querySelector(
        ".vault-door-left"
      ) as HTMLDivElement | null;
      const rightDoor = vaultRef.current?.querySelector(
        ".vault-door-right"
      ) as HTMLDivElement | null;
      const lock = vaultRef.current?.querySelector(
        ".vault-lock"
      ) as HTMLDivElement | null;
      const moneyIn = Array.from(
        vaultRef.current?.querySelectorAll(".vault-money-in span") ?? []
      );
      const moneyOut = Array.from(
        vaultRef.current?.querySelectorAll(".vault-money-out span") ?? []
      );

      if (!leftDoor || !rightDoor || !lock) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.set(moneyOut, { opacity: 0, x: 0 });
      tl.to([leftDoor, rightDoor], { x: 0, duration: 0.2 });
      tl.to(leftDoor, { x: -18, duration: 0.6 }, "start");
      tl.to(rightDoor, { x: 18, duration: 0.6 }, "start");
      if (moneyIn.length) {
        tl.fromTo(
          moneyIn,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 40, duration: 0.9, stagger: 0.12 },
          "-0.1"
        );
      }
      tl.to(lock, { scale: 1.1, rotate: -6, duration: 0.25 }, "lock");
      tl.to(lock, { scale: 1, rotate: 0, duration: 0.25 }, "lock+=0.2");
      tl.to([leftDoor, rightDoor], { x: 0, duration: 0.5 }, "lock+=0.2");
      if (moneyOut.length) {
        tl.to(
          moneyOut,
          { opacity: 1, x: 50, duration: 0.8, stagger: 0.1 },
          "+=0.2"
        );
      }
      tl.to(lock, { scale: 0.9, opacity: 0.6, duration: 0.3 }, "release");
      tl.to(lock, { scale: 1, opacity: 1, duration: 0.3 }, "release+=0.2");

      tlRef.current = tl;
    }, vaultRef);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={vaultRef}
      className="vault-visual"
      onMouseEnter={() => setShowBreakdown(true)}
      onMouseLeave={() => setShowBreakdown(false)}
    >
      <div className="vault-canvas" aria-hidden>
        <div className="vault-money vault-money-in">
          {moneySymbols.map((item) => (
            <span key={item.id} style={{ animationDelay: `${item.delay}s` }}>
              £
            </span>
          ))}
        </div>
        <div className="vault-money vault-money-out">
          {moneySymbols.map((item) => (
            <span key={`${item.id}-out`} style={{ animationDelay: `${item.delay}s` }}>
              £
            </span>
          ))}
        </div>
        <div className="vault-shell">
          <div className="vault-door vault-door-left" />
          <div className="vault-door vault-door-right" />
          <div className="vault-core">
            <div className="vault-lock">🔒</div>
            <div className="vault-label">Madmoun Vault</div>
          </div>
        </div>
      </div>

      <div className={`vault-breakdown ${showBreakdown ? "show" : ""}`}>
        <div>
          <p className="vault-breakdown-title">Live escrow split</p>
          <div className="vault-breakdown-grid">
            <span>Buyers</span>
            <span>62%</span>
            <span>Sellers</span>
            <span>28%</span>
            <span>Delivery</span>
            <span>10%</span>
          </div>
        </div>
      </div>

      <div className="vault-stats">
        <div className="vault-stat">
          <span className="vault-stat-label">Secured Today</span>
          <span className="vault-stat-value">
            <AnimatedCounter value={1250000} prefix="EGP " duration={2.4} />
          </span>
        </div>
        <div className="vault-stat">
          <span className="vault-stat-label">Transactions</span>
          <span className="vault-stat-value">
            <AnimatedCounter value={342} duration={1.6} />
          </span>
        </div>
      </div>

      <div className="vault-controls">
        <Link href="/app/wallet" className="vault-action">
          Try Demo Now
        </Link>
        <Link href="/app/wallet" className="vault-action secondary">
          Try Demo Now
        </Link>
      </div>
    </div>
  );
}
