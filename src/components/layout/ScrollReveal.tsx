"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { initGsap } from "@/lib/animations/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
  threshold?: number;
  once?: boolean;
};

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  threshold = 0.2,
  once = true,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!elementRef.current) return;
    if (typeof window === "undefined" || prefersReducedMotion) return;

    initGsap();

    const directionMap = {
      left: { x: -50, y: 0 },
      right: { x: 50, y: 0 },
      up: { x: 0, y: 50 },
      down: { x: 0, y: -50 },
    } as const;

    const from = directionMap[direction];

    const tween = gsap.fromTo(
      elementRef.current,
      { opacity: 0, ...from },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: `top ${Math.round(100 - threshold * 100)}%`,
          end: "bottom 20%",
          toggleActions: once ? "play none none none" : "play none none reverse",
          markers: false,
        },
      }
    );

    const trigger = tween.scrollTrigger;
    return () => {
      trigger?.kill();
      tween.kill();
    };
  }, [delay, direction, threshold, once, prefersReducedMotion]);

  return (
    <div ref={elementRef} className="scroll-reveal">
      {children}
    </div>
  );
}
