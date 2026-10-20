"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";

const view = { once: true, margin: "-40px" } as const;
const props = (reduce: boolean | null) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: view,
        transition: { duration: 0.45, ease: "easeOut" as const },
      };

export function MotionH2(p: ComponentProps<"h2">) {
  const reduce = useReducedMotion();
  const { children, className, id } = p;
  return (
    <motion.h2 className={className} id={id} {...props(reduce)}>
      {children}
    </motion.h2>
  );
}

export function MotionP(p: ComponentProps<"p">) {
  const reduce = useReducedMotion();
  return (
    <motion.p className={p.className} {...props(reduce)}>
      {p.children}
    </motion.p>
  );
}

export function MotionUl(p: ComponentProps<"ul">) {
  const reduce = useReducedMotion();
  return (
    <motion.ul className={p.className} {...props(reduce)}>
      {p.children}
    </motion.ul>
  );
}
