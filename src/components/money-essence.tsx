"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const symbols = [
  { x: 12, y: 18 },
  { x: 32, y: 28 },
  { x: 58, y: 16 },
  { x: 76, y: 22 },
  { x: 18, y: 52 },
  { x: 42, y: 60 },
  { x: 70, y: 55 },
  { x: 85, y: 66 },
  { x: 10, y: 78 },
  { x: 36, y: 82 },
  { x: 62, y: 74 },
  { x: 80, y: 84 },
];

export function MoneyEssence() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth);
      mouseY.set(event.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const offsetX = useTransform(mouseX, [0, 1], [-12, 12]);
  const offsetY = useTransform(mouseY, [0, 1], [-10, 10]);

  return (
    <motion.section
      aria-hidden="true"
      className="money-essence pointer-events-none absolute inset-0 -z-10"
      style={{ x: offsetX, y: offsetY }}
    >
      {symbols.map((symbol, index) => (
        <motion.span
          key={`egp-${index}`}
          className="money-essence-symbol"
          style={{ left: `${symbol.x}%`, top: `${symbol.y}%` }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          EGP
        </motion.span>
      ))}
    </motion.section>
  );
}
