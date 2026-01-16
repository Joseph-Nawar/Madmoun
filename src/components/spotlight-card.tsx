"use client";

import { type ReactNode } from "react";

type SpotlightCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export function SpotlightCard({ title, description, icon }: SpotlightCardProps) {
  return (
    <article
      className="spotlight-card glass-container gradient-border rounded-3xl p-6"
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
      {icon && <span className="text-emerald-200">{icon}</span>}
      <h4 className="mt-4 text-lg font-semibold text-white font-display">
        {title}
      </h4>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
    </article>
  );
}
