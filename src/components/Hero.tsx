"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useState } from "react";
import { Button, TextLink } from "@/components/ui/Button";
import {
  badgeText,
  contact,
  heroIdentity,
  heroSubline,
  heroTitle,
  typewriter,
} from "@/content/site";

export function Hero() {
  const reduce = useReducedMotion();
  // null = not started (SSR / no-JS / reduced motion): full text shown as plain H1 text.
  const [count, setCount] = useState<number | null>(null);
  const [done, setDone] = useState(true);

  useLayoutEffect(() => {
    if (reduce) return;
    const total = heroTitle.length;
    const t0 = performance.now();
    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    /* eslint-disable react-hooks/set-state-in-effect */
    setCount(0);
    setDone(false);
    /* eslint-enable react-hooks/set-state-in-effect */
    const tick = () => {
      const n = Math.min(
        total,
        Math.floor((performance.now() - t0) / typewriter.msPerChar),
      );
      setCount(n);
      if (n < total) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const typedMs = total * typewriter.msPerChar;
      timers.push(
        setTimeout(() => setDone(true), Math.max(0, typewriter.minRevealMs - typedMs)),
      );
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  const typing = count !== null;
  const finished = typing && count === heroTitle.length;
  const fade = (i: number) => ({
    initial: false as const,
    animate: { opacity: done ? 1 : 0, y: done ? 0 : 24 },
    transition: {
      duration: done ? 0.4 : 0,
      delay: done ? i * 0.08 : 0,
      ease: "easeOut" as const,
    },
  });

  return (
    <>
      <p className="label text-cream/80">{badgeText}</p>
      <p className="mt-3 font-mono text-sm text-cream/90 md:text-base">{heroIdentity}</p>
      <h1 className="h1-term relative mt-8 max-w-[26ch]">
        <span className={typing ? "invisible" : undefined}>{heroTitle}</span>
        {typing && (
          <span aria-hidden className="absolute inset-0">
            {heroTitle.slice(0, count)}
            <span
              className="ml-[0.08em] inline-block translate-y-[0.12em] bg-cream"
              style={{
                width: `${typewriter.caretWidthEm}em`,
                height: `${typewriter.caretHeightEm}em`,
                animation: finished
                  ? `caret-blink ${typewriter.caretBlinkMs}ms steps(1) infinite`
                  : undefined,
              }}
            />
          </span>
        )}
      </h1>
      <motion.p {...fade(0)} className="mt-8 max-w-2xl text-xl opacity-90">
        {heroSubline}
      </motion.p>
      <motion.div {...fade(1)} className="mt-10 flex flex-wrap items-center gap-3">
        <Button href="#projects">See projects</Button>
        <TextLink tone="onBlue" href={contact.resume} className="px-2 py-3">
          Download resume
        </TextLink>
      </motion.div>
    </>
  );
}
