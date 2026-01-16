"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

export function BackgroundBeams() {
  const { scrollYProgress } = useScroll();
  const duration = useTransform(scrollYProgress, [0, 1], [18, 6]);
  const animationDuration = useMotionTemplate`${duration}s`;

  return (
    <motion.span
      className="beams"
      style={{ animationDuration }}
    />
  );
}
