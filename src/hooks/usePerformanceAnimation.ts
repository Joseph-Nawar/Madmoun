"use client";

import { useCallback, useEffect, useRef } from "react";

type DebouncedFn<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

export const usePerformanceAnimation = () => {
  const rafId = useRef<number | null>(null);

  const debounce = useCallback(<T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    const debounced: DebouncedFn<T> = (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
    return debounced;
  }, []);

  const animateWithRAF = useCallback((callback: FrameRequestCallback) => {
    const animate = (time: number) => {
      callback(time);
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { debounce, animateWithRAF };
};
