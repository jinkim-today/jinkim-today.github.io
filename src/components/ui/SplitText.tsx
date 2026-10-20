"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Staggered text reveal. Units slide up from behind an overflow mask.
 * by="word" splits on spaces; by="clause" splits after commas (natural lines).
 */
export function SplitText({
  text,
  by = "word",
  delay = 0,
  stagger = 0.06,
  onMount = false,
  className,
}: {
  text: string;
  by?: "word" | "clause";
  delay?: number;
  stagger?: number;
  onMount?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  const units = by === "clause" ? text.split(/(?<=,)\s+/) : text.split(" ");
  const block = by === "clause";
  return (
    <span className={className} aria-label={text}>
      {units.map((u, i) => (
        <span
          key={i}
          aria-hidden
          className={`${block ? "block" : "inline-block"} overflow-hidden pb-[0.14em] -mb-[0.14em] align-top`}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            {...(onMount
              ? { animate: { y: 0 } }
              : {
                  whileInView: { y: 0 },
                  viewport: { once: true, margin: "-40px" },
                })}
            transition={{ duration: 0.5, ease: "easeOut", delay: delay + i * stagger }}
          >
            {u}
            {!block && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
