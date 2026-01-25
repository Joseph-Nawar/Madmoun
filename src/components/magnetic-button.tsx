"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  forwardRef,
  useMemo,
  useRef,
  type AnchorHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";

type MagneticButtonProps = {
  href: string;
  className?: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type PossibleRef<T> = Ref<T> | undefined;

const mergeRefs = <T,>(refs: PossibleRef<T>[]) => {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(value);
      } else {
        (ref as { current: T | null }).current = value;
      }
    });
  };
};

export const MagneticButton = forwardRef<HTMLAnchorElement, MagneticButtonProps>(
  ({ href, className, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const mergedRef = useMemo(
      () => mergeRefs<HTMLAnchorElement>([ref, buttonRef]),
      [ref]
    );
    const MotionLink = useMemo(() => motion.create(Link) as any, []);

    return (
      <MotionLink
        ref={mergedRef}
        href={href}
        data-magnetic
        className={className}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={(event: React.MouseEvent) => {
          const element = buttonRef.current;
          if (!element) return;
          const rect = element.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;
          element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        }}
        onMouseLeave={() => {
          const element = buttonRef.current;
          if (!element) return;
          element.style.transform = "translate(0px, 0px)";
        }}
        {...props}
      >
        {children}
      </MotionLink>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
