"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const COLORS = [
  "rgba(0, 102, 179, 0.12)",
  "rgba(255, 140, 0, 0.1)",
  "rgba(46, 139, 87, 0.08)",
];

export function SimpleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const elements: HTMLDivElement[] = [];
    const count = 10;

    for (let i = 0; i < count; i += 1) {
      const element = document.createElement("div");
      element.className = "simple-float";

      const size = 40 + Math.random() * 60;
      const duration = 18 + Math.random() * 18;
      const delay = Math.random() * 6;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.background = color;
      element.style.animationDuration = `${duration}s`;
      element.style.animationDelay = `${delay}s`;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;

      containerRef.current.appendChild(element);
      elements.push(element);
    }

    return () => {
      elements.forEach((el) => el.remove());
    };
  }, [prefersReducedMotion]);

  return <div ref={containerRef} className="simple-background" aria-hidden />;
}
