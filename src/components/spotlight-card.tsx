"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

type SpotlightCardProps = {
  title: string;
  description: string;
  details?: string;
  colorClassName?: string;
  icon?: ReactNode;
};

export function SpotlightCard({
  title,
  description,
  details,
  colorClassName,
  icon,
}: SpotlightCardProps) {
  return (
    <motion.article
      data-magnetic
      className={`spotlight-card glass-container gradient-border rounded-3xl p-6 ${
        colorClassName ?? ""
      }`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ y: -5, scale: 1.02 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        event.currentTarget.style.setProperty("--spotlight-x", `${x}px`);
        event.currentTarget.style.setProperty("--spotlight-y", `${y}px`);
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.setProperty("--spotlight-x", `50%`);
        event.currentTarget.style.setProperty("--spotlight-y", `50%`);
      }}
    >
      {icon && <span className="spotlight-card-icon">{icon}</span>}
      <h4 className="mt-4 text-lg font-semibold text-white font-display">
        {title}
      </h4>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      {details && (
        <p className="spotlight-card-details mt-3 text-xs text-slate-200">
          {details}
        </p>
      )}
    </motion.article>
  );
}
