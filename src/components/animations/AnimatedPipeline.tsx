"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { initGsap } from "@/lib/animations/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useResponsiveAnimation } from "@/hooks/useResponsiveAnimation";

const segments = [
  { label: "Buyer", icon: "👤" },
  { label: "Escrow", icon: "🔒" },
  { label: "Seller", icon: "🏪" },
  { label: "Delivery", icon: "🚚" },
];

export function AnimatedPipeline() {
  const pipelineRef = useRef<HTMLDivElement>(null);
  const moneyRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isMobile } = useResponsiveAnimation();

  useLayoutEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) return;
    if (!pipelineRef.current || !moneyRef.current) return;

    initGsap();

    const ctx = gsap.context(() => {
      const pipelineWidth = pipelineRef.current?.offsetWidth ?? 0;
      const travelDistance = Math.max(120, pipelineWidth - 120);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pipelineRef.current,
          start: "top 80%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        moneyRef.current,
        { x: 0, opacity: 0 },
        {
          x: travelDistance,
          opacity: 1,
          duration: isMobile ? 0.9 : 1.2,
          ease: "power2.out",
        }
      );

      const segmentEls = pipelineRef.current?.querySelectorAll(
        ".pipeline-segment"
      );
      segmentEls?.forEach((segment, index) => {
        tl.to(
          segment,
          {
            scale: isMobile ? 1.03 : 1.08,
            duration: 0.25,
            ease: "back.out(1.7)",
          },
          index * 0.15
        ).to(
          segment,
          {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          index * 0.15 + 0.2
        );
      });
    }, pipelineRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion, isMobile]);

  return (
    <div ref={pipelineRef} className="pipeline-container">
      <div className="pipeline-track">
        {segments.map((segment, index) => (
          <div key={segment.label} className="pipeline-segment">
            <span className="pipeline-icon" aria-hidden>
              {segment.icon}
            </span>
            <span>{segment.label}</span>
            {index < segments.length - 1 && (
              <span className="pipeline-arrow" aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <div ref={moneyRef} className="money-flow" aria-hidden>
        💰
      </div>
    </div>
  );
}
