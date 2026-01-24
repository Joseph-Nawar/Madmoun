"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePerformanceAnimation } from "@/hooks/usePerformanceAnimation";

const COLORS = [
  "rgba(16,185,129,0.18)",
  "rgba(56,189,248,0.15)",
  "rgba(245,158,11,0.12)",
  "rgba(99,102,241,0.12)",
];

type MeshItem = {
  el: HTMLDivElement;
  speedX: number;
  speedY: number;
  phase: number;
  baseX: number;
  baseY: number;
};

export function DynamicMeshBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshesRef = useRef<MeshItem[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const { debounce } = usePerformanceAnimation();

  const meshCount = useMemo(() => (typeof window !== "undefined" && window.innerWidth < 768 ? 6 : 12), []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const meshes: MeshItem[] = [];

    for (let i = 0; i < meshCount; i += 1) {
      const mesh = document.createElement("div");
      mesh.className = "mesh-blob gpu-accelerated";
      container.appendChild(mesh);

      const size = 120 + Math.random() * 140;
      const baseX = Math.random() * 100;
      const baseY = Math.random() * 100;

      gsap.set(mesh, {
        width: size,
        height: size,
        xPercent: baseX,
        yPercent: baseY,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 30%, ${COLORS[i % COLORS.length]}, transparent 70%)`,
        opacity: 0.35,
        filter: "blur(24px)",
      });

      meshes.push({
        el: mesh,
        speedX: 0.08 + Math.random() * 0.12,
        speedY: 0.06 + Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2,
        baseX,
        baseY,
      });
    }

    meshesRef.current = meshes;

    const colorTween = gsap.to(meshes.map((m) => m.el), {
      background:
        "radial-gradient(circle at 70% 70%, rgba(16,185,129,0.2), transparent 70%)",
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const ticker = (time: number) => {
      meshesRef.current.forEach((mesh, index) => {
        const x = mesh.baseX + Math.sin(time * mesh.speedX + mesh.phase) * 12;
        const y = mesh.baseY + Math.cos(time * mesh.speedY + mesh.phase) * 10;
        mesh.el.style.transform = `translate3d(${x}%, ${y}%, 0)`;
      });
    };

    gsap.ticker.add(ticker);

    const handleVisibility = () => {
      if (document.hidden) {
        gsap.ticker.remove(ticker);
      } else {
        gsap.ticker.add(ticker);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    const onScroll = debounce(() => {
      const shift = Math.min(40, window.scrollY * 0.04);
      container.style.opacity = `${Math.max(0.15, 0.5 - shift / 100)}`;
    }, 16);

    const handleScroll = () => {
      requestAnimationFrame(() => onScroll());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      gsap.ticker.remove(ticker);
      colorTween.kill();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handleScroll);
      meshes.forEach((mesh) => mesh.el.remove());
      meshesRef.current = [];
    };
  }, [debounce, meshCount, prefersReducedMotion]);

  return <div ref={containerRef} className="dynamic-mesh-background" aria-hidden />;
}
