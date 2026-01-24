import { useEffect, useState } from "react";

type AnimationSettings = {
  duration: number;
  ease: string;
  scale: number;
};

export const useResponsiveAnimation = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const animationSettings: AnimationSettings = isMobile
    ? { duration: 0.5, ease: "power1.out", scale: 1.02 }
    : { duration: 0.8, ease: "power2.out", scale: 1.05 };

  return { isMobile, animationSettings };
};
