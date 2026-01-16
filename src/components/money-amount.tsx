"use client";

import { AnimatePresence, motion } from "framer-motion";

type MoneyAmountProps = {
  value: number;
  className?: string;
  type?: "currency" | "percentage" | "number";
};

const currencyFormatter = new Intl.NumberFormat("en-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
});
const numberFormatter = new Intl.NumberFormat("en-EG", {
  maximumFractionDigits: 1,
});

export function MoneyAmount({ value, className, type = "currency" }: MoneyAmountProps) {
  const formatted =
    type === "percentage"
      ? `${numberFormatter.format(value)}%`
      : type === "number"
        ? numberFormatter.format(value)
        : currencyFormatter.format(value);

  return (
    <span className={`inline-flex items-center gap-[1px] ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        {Array.from(formatted).map((char, index) => {
          const isDigit = /\d/.test(char);
          if (!isDigit) {
            return (
              <span key={`${char}-${index}`} className="inline-block">
                {char}
              </span>
            );
          }

          return (
            <motion.span
              key={`${value}-${index}-${char}`}
              className="inline-block tabular-nums"
              initial={{ y: 16, opacity: 0, rotateX: -60 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -16, opacity: 0, rotateX: 60 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {char}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </span>
  );
}
