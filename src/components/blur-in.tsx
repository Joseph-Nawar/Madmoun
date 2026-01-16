"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type BlurInProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function BlurIn({ children, className, delay = 0 }: BlurInProps) {
  return (
    <motion.div
      className={className ? `blur-in-ready ${className}` : "blur-in-ready"}
      initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
