"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type Blob = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
};

const COLORS = [
  "rgba(16, 185, 129, 0.42)",
  "rgba(30, 41, 59, 0.38)",
  "rgba(16, 185, 129, 0.28)",
  "rgba(30, 41, 59, 0.3)",
];

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const blobs: Blob[] = Array.from({ length: 7 }).map((_, index) => {
      const radius = 140 + index * 18;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: radius,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: COLORS[index % COLORS.length],
      };
    });

    const repulsionRadius = 220;
    const maxForce = 4.2;

    const draw = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      blobs.forEach((blob, index) => {
        const pointer = pointerRef.current;
        if (pointer.active) {
          const dx = blob.x - pointer.x;
          const dy = blob.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < repulsionRadius) {
            const force = ((repulsionRadius - distance) / repulsionRadius) * maxForce;
            blob.vx += (dx / distance) * force;
            blob.vy += (dy / distance) * force;
          }
        }

        const drift = Math.sin(gsap.ticker.time * 0.35 + index) * 0.03;
        blob.vx += drift;
        blob.vy -= drift;

        blob.x += blob.vx;
        blob.y += blob.vy;

        blob.vx *= 0.985;
        blob.vy *= 0.985;

        if (blob.x < -blob.r) blob.x = width + blob.r;
        if (blob.x > width + blob.r) blob.x = -blob.r;
        if (blob.y < -blob.r) blob.y = height + blob.r;
        if (blob.y > height + blob.r) blob.y = -blob.r;

        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(2, 6, 23, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = () => draw();
    gsap.ticker.add(tick);

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY, active: true };
    };

    const handlePointerLeave = () => {
      pointerRef.current = { ...pointerRef.current, active: false };
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
