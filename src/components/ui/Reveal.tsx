"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 16,
  scale = 1,
  duration = 0.4,
  onMount = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  duration?: number;
  /** Animate on mount instead of when scrolled into view. */
  onMount?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const initial = { opacity: 0, y, scale };
  const shown = { opacity: 1, y: 0, scale: 1 };
  const transition = { duration, ease: "easeOut" as const, delay };
  return (
    <motion.div
      className={className}
      initial={initial}
      {...(onMount
        ? { animate: shown }
        : {
            whileInView: shown,
            viewport: { once: true, margin: "-40px" },
          })}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

/** The one allowed rule on the home page: a hairline that grows across as it enters. */
export function HairlineGrow({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={`h-px w-full bg-current opacity-30 ${className}`} />;
  return (
    <motion.div
      aria-hidden
      className={`h-px w-full origin-left bg-current opacity-30 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}
