"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { initGsap } from "@/lib/animations/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  locale?: string;
};

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  decimals = 0,
  locale = "en-EG",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals, locale]
  );

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    initGsap();

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Number(obj.val.toFixed(decimals)));
      },
      onComplete: () => {
        if (!counterRef.current) return;
        gsap.fromTo(
          counterRef.current,
          { scale: 1.08 },
          { scale: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
      },
    });

    return () => {
      tween.kill();
    };
  }, [inView, value, duration, decimals, prefersReducedMotion]);

  return (
    <span ref={ref} className="counter-container">
      <span ref={counterRef} className="counter-value">
        {prefix}
        {formatter.format(count)}
        {suffix}
      </span>
    </span>
  );
}
