"use client";

import { useEffect, useRef } from "react";

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const targetCenter = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const updateTarget = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
    };

    const handleEnter = (event: Event) => {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      targetCenter.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      cursorRef.current?.classList.add("cursor-snap");
    };

    const handleLeave = () => {
      targetCenter.current = null;
      cursorRef.current?.classList.remove("cursor-snap");
    };

    const interactiveElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]")
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("pointerenter", handleEnter);
      element.addEventListener("pointerleave", handleLeave);
    });

    window.addEventListener("pointermove", updateTarget, { passive: true });

    let rafId = 0;
    const animate = () => {
      const target = targetCenter.current ?? pointer.current;
      position.current.x = lerp(position.current.x, target.x, 0.15);
      position.current.y = lerp(position.current.y, target.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.setProperty("--cursor-x", `${position.current.x}px`);
        cursorRef.current.style.setProperty("--cursor-y", `${position.current.y}px`);
      }
      if (dotRef.current) {
        dotRef.current.style.setProperty("--cursor-x", `${target.x}px`);
        dotRef.current.style.setProperty("--cursor-y", `${target.y}px`);
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", updateTarget);
      interactiveElements.forEach((element) => {
        element.removeEventListener("pointerenter", handleEnter);
        element.removeEventListener("pointerleave", handleLeave);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <div ref={cursorRef} className="lux-cursor">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="rgba(16,185,129,0.8)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div ref={dotRef} className="lux-cursor-dot" />
    </div>
  );
}
