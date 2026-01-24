"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const statusSteps = ["Pending", "Secured", "Released"] as const;

export function EnhancedVault() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);

  const playClick = () => {
    if (typeof window === "undefined") return;
    const AudioContext = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 520;
    gain.gain.value = 0.06;

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);
    oscillator.stop(context.currentTime + 0.08);
  };

  const legend = useMemo(
    () => [
      {
        label: "Vault Doors",
        description: "Opens when escrow receives funds.",
      },
      {
        label: "Security Rings",
        description: "Pulse to confirm funds are secured.",
      },
      {
        label: "Money Flow",
        description: "EGP symbols flow into escrow, then release on delivery.",
      },
    ],
    []
  );

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const leftDoor = containerRef.current?.querySelector(
        ".enhanced-vault-door-left"
      ) as SVGRectElement | null;
      const rightDoor = containerRef.current?.querySelector(
        ".enhanced-vault-door-right"
      ) as SVGRectElement | null;
      const lock = containerRef.current?.querySelector(
        ".enhanced-vault-lock"
      ) as SVGCircleElement | null;
      const rings = Array.from(
        containerRef.current?.querySelectorAll(".enhanced-vault-ring") ?? []
      );
      const particles = Array.from(
        containerRef.current?.querySelectorAll(".enhanced-money-particle") ?? []
      );
      const trails = Array.from(
        containerRef.current?.querySelectorAll(".enhanced-money-trail") ?? []
      );

      if (!leftDoor || !rightDoor || !lock) return;

      gsap.set([leftDoor, rightDoor], { x: 0 });
      gsap.set([...particles, ...trails], { opacity: 0, x: -40 });
      gsap.set(rings, { scale: 1, opacity: 0.4, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({ paused: true });

      tl.addLabel("pending", 0);
      tl.to(leftDoor, { x: -28, duration: 0.7, ease: "power2.out" }, "open");
      tl.to(rightDoor, { x: 28, duration: 0.7, ease: "power2.out" }, "open");

      if (particles.length) {
        tl.to(
          particles,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          "open+=0.1"
        );
      }

      if (trails.length) {
        tl.to(
          trails,
          {
            opacity: 0.6,
            x: 10,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          "open+=0.15"
        );
      }

      tl.to(lock, { scale: 1.15, duration: 0.2, ease: "power2.out" }, "lock");
      tl.to(lock, { scale: 1, duration: 0.2, ease: "power2.in" }, "lock+=0.2");

      if (rings.length) {
        tl.to(
          rings,
          {
            scale: 1.15,
            opacity: 0.8,
            duration: 0.3,
            ease: "sine.inOut",
            stagger: 0.12,
            yoyo: true,
            repeat: 1,
          },
          "lock+=0.1"
        );
      }

      tl.addLabel("secured");

      if (particles.length) {
        tl.to(
          particles,
          {
            opacity: 0.2,
            x: 30,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.in",
          },
          "release"
        );
      }

      if (trails.length) {
        tl.to(
          trails,
          {
            opacity: 0,
            x: 30,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.in",
          },
          "release"
        );
      }

      tl.addLabel("released");

      timelineRef.current = tl;
      tl.tweenTo("secured");
      setStepIndex(1);
    }, containerRef);

    return () => {
      ctx.revert();
      timelineRef.current = null;
    };
  }, [prefersReducedMotion]);

  const handleStep = () => {
    if (prefersReducedMotion) {
      setStepIndex((prev) => (prev + 1) % statusSteps.length);
      return;
    }

    const nextStep = (stepIndex + 1) % statusSteps.length;
    setStepIndex(nextStep);

    playClick();

    const label = statusSteps[nextStep].toLowerCase();
    timelineRef.current?.tweenTo(label);
  };

  return (
    <div ref={containerRef} className="enhanced-vault" onClick={handleStep}>
      <div className="enhanced-vault-svg">
        <svg viewBox="0 0 420 320" role="img" aria-label="Madmoun escrow vault">
          <defs>
            <radialGradient id="vaultGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.35)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0)" />
            </radialGradient>
          </defs>

          <circle cx="210" cy="160" r="120" fill="url(#vaultGlow)" />
          <circle className="enhanced-vault-ring" cx="210" cy="160" r="88" />
          <circle className="enhanced-vault-ring" cx="210" cy="160" r="108" />

          <rect x="130" y="95" width="160" height="140" rx="14" className="enhanced-vault-shell" />
          <rect x="130" y="95" width="80" height="140" rx="14" className="enhanced-vault-door-left" />
          <rect x="210" y="95" width="80" height="140" rx="14" className="enhanced-vault-door-right" />

          <circle cx="210" cy="165" r="16" className="enhanced-vault-lock" />
          <rect x="203" y="165" width="14" height="28" className="enhanced-vault-lock" />

          {Array.from({ length: 6 }).map((_, index) => (
            <text
              key={`particle-${index}`}
              className="enhanced-money-particle"
              x={70 + index * 14}
              y={150 + (index % 2) * 12}
            >
              EGP
            </text>
          ))}
          {Array.from({ length: 6 }).map((_, index) => (
            <rect
              key={`trail-${index}`}
              className="enhanced-money-trail"
              x={70 + index * 12}
              y={148 + (index % 2) * 12}
              width={16}
              height={4}
              rx={2}
            />
          ))}

          <text x="210" y="265" textAnchor="middle" className="enhanced-vault-status">
            {statusSteps[stepIndex]}
          </text>
        </svg>
      </div>

      <div className="enhanced-vault-overlay">
        <div className="enhanced-vault-counter">
          <p>Secured Today</p>
          <span>
            <AnimatedCounter value={1250000} prefix="EGP " duration={2.2} />
          </span>
        </div>
        <div className="enhanced-vault-indicators">
          {statusSteps.map((status, index) => (
            <span
              key={status}
              className={index === stepIndex ? "active" : ""}
            >
              {status}
            </span>
          ))}
        </div>
        <div className="enhanced-vault-legend">
          {legend.map((item) => (
            <div key={item.label}>
              <h4>{item.label}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <button type="button" className="enhanced-vault-cta">
          Tap to advance escrow flow
        </button>
      </div>
    </div>
  );
}
