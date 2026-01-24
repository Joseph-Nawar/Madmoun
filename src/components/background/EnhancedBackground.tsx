"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
};

const palette = [
  "rgba(0, 102, 179, 0.18)",
  "rgba(255, 140, 0, 0.14)",
  "rgba(16, 185, 129, 0.16)",
];

export function EnhancedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const particleCount = useMemo(() => {
    if (typeof window === "undefined") return 30;
    return Math.min(Math.floor(window.innerWidth / 28), 50);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mesh = meshRef.current;
    if (mesh) {
      gsap.to(mesh, {
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        "--mesh-a": palette[0],
        "--mesh-b": palette[1],
        "--mesh-c": palette[2],
      });
    }

    const shapes = shapesRef.current;
    shapes.forEach((shape, index) => {
      gsap.to(shape, {
        rotation: 360,
        duration: 40 + index * 8,
        repeat: -1,
        ease: "none",
      });
      gsap.to(shape, {
        scale: 1.08,
        duration: 16 + index * 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 8,
      speed: Math.random() * 0.3 + 0.15,
      opacity: Math.random() * 0.2 + 0.05,
      drift: Math.random() * 0.2 + 0.05,
    }));

    let animationId = 0;
    let lastTime = 0;

    const animate = (time: number) => {
      if (time - lastTime < 16) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += Math.sin(time * 0.0006) * particle.drift;

        if (particle.y < -20) {
          particle.y = window.innerHeight + 20;
          particle.x = Math.random() * window.innerWidth;
        }

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(0, 201, 167, 0.45)";
        ctx.fillStyle = "rgba(0, 201, 167, 0.7)";
        ctx.font = `${particle.size}px "Inter", sans-serif`;
        ctx.fillText("₦", particle.x, particle.y);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [particleCount, prefersReducedMotion]);

  return (
    <>
      <div ref={meshRef} className="enhanced-mesh" aria-hidden />
      <canvas ref={canvasRef} className="enhanced-particle-canvas" aria-hidden />
      <div className="enhanced-geometry" aria-hidden>
        {[0, 1, 2].map((index) => (
          <div
            key={`shape-${index}`}
            ref={(el) => {
              if (el) shapesRef.current[index] = el;
            }}
            className={`enhanced-shape shape-${index}`}
          />
        ))}
      </div>
    </>
  );
}
