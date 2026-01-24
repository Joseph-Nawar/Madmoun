import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { initGsap } from "@/lib/animations/gsap-config";

type UseScrollAnimationOptions = {
  deps?: unknown[];
  scope?: RefObject<HTMLElement>;
};

export const useScrollAnimation = (
  animation: () => void,
  options: UseScrollAnimationOptions = {}
) => {
  const { deps = [], scope } = options;

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    initGsap();

    const ctx = gsap.context(animation, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
