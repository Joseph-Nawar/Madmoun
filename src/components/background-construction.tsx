"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

const shieldPath =
  "M256 20 L452 92 V260 C452 380 364 470 256 508 C148 470 60 380 60 260 V92 L256 20 Z";

export function BackgroundConstruction() {
  const { scrollYProgress } = useScroll();
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

  const offsetX = useTransform(mouseX, [0, 1], [18, -18]);
  const offsetY = useTransform(mouseY, [0, 1], [14, -14]);

  const outerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1, 0.9]);
  const middleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 0.88, 0.8]);
  const innerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.76, 0.7]);

  const outerRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const middleRotate = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const innerRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const strokeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.85]);
  const strokeColor = useTransform(scrollYProgress, [0, 1], ["#10b981", "#f59e0b"]);

  const glow = useMotionTemplate`drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))`;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center"
      style={{ x: offsetX, y: offsetY, filter: glow }}
    >
      <svg viewBox="0 0 512 540" className="h-[80vh] w-[80vh]">
        <motion.g style={{ scale: outerScale, rotate: outerRotate, opacity: strokeOpacity }}>
          <motion.path
            d={shieldPath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
        <motion.g style={{ scale: middleScale, rotate: middleRotate, opacity: strokeOpacity }}>
          <motion.path
            d={shieldPath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
        <motion.g style={{ scale: innerScale, rotate: innerRotate, opacity: strokeOpacity }}>
          <motion.path
            d={shieldPath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
