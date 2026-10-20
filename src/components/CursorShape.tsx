"use client";

import { useEffect, useRef } from "react";

// A small square that eases toward the pointer inside the footer. Skipped for touch and reduced motion.
export function CursorShape() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate(${x}px, ${y}px) rotate(${(tx - x) * 0.4}deg)`;
      raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      tx = e.clientX - r.left - 14;
      ty = e.clientY - r.top - 14;
      el.style.opacity = "1";
    };
    const leave = () => { el.style.opacity = "0"; };
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-2 border-cream opacity-0 transition-opacity duration-300"
    />
  );
}
