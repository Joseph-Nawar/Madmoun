"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { initGsap } from "@/lib/animations/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const statusSteps = [
  { id: "initiated", label: "Initiated", icon: "📝" },
  { id: "funded", label: "Funded", icon: "💰" },
  { id: "escrow", label: "In Escrow", icon: "🔒" },
  { id: "shipped", label: "Shipped", icon: "🚚" },
  { id: "delivered", label: "Delivered", icon: "📦" },
  { id: "completed", label: "Completed", icon: "✅" },
];

type StatusTimelineProps = {
  currentStep: number;
  transactionId?: string;
};

export function StatusTimeline({ currentStep }: StatusTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const progressPercent = ((currentStep + 1) / statusSteps.length) * 100;

  useEffect(() => {
    if (!timelineRef.current || !progressRef.current) return;
    if (typeof window === "undefined" || prefersReducedMotion) return;

    initGsap();

    gsap.to(progressRef.current, {
      width: `${progressPercent}%`,
      duration: 1,
      ease: "power2.out",
    });

    const currentStepEl = timelineRef.current.querySelector(
      `[data-step="${currentStep}"]`
    );
    if (currentStepEl) {
      gsap.fromTo(
        currentStepEl,
        { scale: 0.9 },
        {
          scale: 1.08,
          duration: 0.6,
          ease: "back.out(1.7)",
          repeat: 1,
          yoyo: true,
        }
      );
    }
  }, [currentStep, prefersReducedMotion]);

  return (
    <div ref={timelineRef} className="status-timeline">
      <div className="timeline-track">
        <div
          ref={progressRef}
          className="timeline-progress"
          style={prefersReducedMotion ? { width: `${progressPercent}%` } : undefined}
        />
        <div className="timeline-steps">
          {statusSteps.map((step, index) => (
            <div
              key={step.id}
              data-step={index}
              className={`timeline-step ${
                index <= currentStep ? "active" : ""
              } ${index === currentStep ? "current" : ""}`}
            >
              <div className="step-icon" aria-hidden>
                {step.icon}
              </div>
              <div className="step-label">{step.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
