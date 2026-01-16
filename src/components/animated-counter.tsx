"use client";

import { animate } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  currency?: string;
};

export function AnimatedCounter({
  value,
  duration = 1.4,
  currency = "EGP",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }),
    [currency]
  );

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [value, duration]);

  return <span>{formatter.format(displayValue)}</span>;
}
