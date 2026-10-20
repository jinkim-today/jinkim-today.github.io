"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const RUN = /\d[\d,]*/;

/** Counts the first integer run up from 0 once in view; the rest stays static. */
export function StatNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const m = RUN.exec(value);
  const target = m ? Number(m[0].replace(/,/g, "")) : 0;
  const comma = m ? m[0].includes(",") : false;
  // null = show final value (SSR, reduced motion, no number)
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    if (!m || reduce) return;
    if (!inView) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setN(0);
      return;
    }
    const c = animate(0, target, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setN(null),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  let out = value;
  if (m && n !== null) {
    const s = comma ? n.toLocaleString("en-US") : String(n);
    out = value.replace(RUN, s);
  }
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }} aria-label={value}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
