"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Headline } from "@/components/Headline";
import { Status, Tags } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { StatNumber } from "@/components/ui/StatNumber";
import type { BentoSize } from "@/lib/bento";
import type { Project } from "@/lib/content";

// 12-col grid on lg; 2 cols on sm; 1 col on mobile. Literal strings for Tailwind.
const SPAN: Record<BentoSize, string> = {
  feature: "sm:col-span-2 lg:col-span-12",
  full: "sm:col-span-2 lg:col-span-12",
  wide: "lg:col-span-6",
  small: "lg:col-span-3",
};

function Arrow() {
  return (
    <span
      aria-hidden
      className="inline-block text-xl transition-transform duration-200 ease-out group-hover:translate-x-1.5"
    >
      →
    </span>
  );
}

function Stat({
  stat,
  big,
}: {
  stat: { value: string; label: string };
  big: boolean;
}) {
  return (
    <div className="min-w-0">
      <StatNumber
        value={stat.value}
        className={`numeral block whitespace-nowrap ${
          big ? "text-[clamp(2.75rem,5vw,5.5rem)]" : "text-[clamp(2rem,3.5vw,3.25rem)]"
        }`}
      />
      <p className="mt-2 max-w-[22ch] text-[0.8rem] leading-snug text-cream/70">
        {stat.label}
      </p>
    </div>
  );
}

/** Cover image with a subtle scroll parallax (desktop only, not under reduced motion). */
function ParallaxCover({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const active = desktop && !reduce;
  return (
    <div ref={ref} className="h-full w-full">
      <motion.div
        className="h-full w-full"
        style={active ? { y, scale: 1.08 } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ProjectBento({
  project,
  index,
  size,
}: {
  project: Project;
  index: number;
  size: BentoSize;
}) {
  const horizontal = size === "feature" || size === "full";
  const rich = size !== "small";
  const stats = project.stats;
  const hasStats = stats.length > 0;
  const bigStat = size === "feature" || size === "wide";
  const isBlue = project.accent.toLowerCase() === "#0a1fff";

  const layout = horizontal
    ? size === "feature"
      ? "sm:flex-row lg:min-h-[420px]"
      : "sm:flex-row lg:h-[200px]"
    : "";
  const coverBox = horizontal
    ? size === "feature"
      ? "aspect-[16/10] sm:aspect-auto sm:w-[55%] sm:shrink-0"
      : "aspect-[16/10] sm:aspect-auto sm:w-[40%] sm:shrink-0"
    : "aspect-[16/10]";

  return (
    <Reveal delay={(index % 3) * 0.06} y={32} scale={0.98} duration={0.5} className={`${SPAN[size]} min-w-0`}>
      <Link
        href={`/projects/${project.slug}/`}
        style={{ "--accent": project.accent } as React.CSSProperties}
        className={`group flex h-full flex-col overflow-hidden rounded-lg bg-[#1A30FF] text-cream ${layout}`}
      >
        <div
          className={`relative overflow-hidden ${coverBox}`}
          style={{ backgroundColor: isBlue ? "#F3EEE3" : project.accent }}
        >
          <ParallaxCover>
            <Image
              src={project.cover}
              alt={`${project.title} cover`}
              width={1600}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          </ParallaxCover>
        </div>

        <div
          className={`flex min-w-0 flex-1 flex-col p-5 md:p-6 ${
            size === "feature" ? "lg:p-10" : ""
          } ${size === "full" ? "justify-center lg:px-8" : "justify-between"}`}
        >
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <span className="label text-cream/70">
                {num} · {project.year}
              </span>
              {rich && (
                <Status tone="onBlue">{project.status}</Status>
              )}
            </div>
            <h3
              className={`mt-3 font-display underline decoration-transparent decoration-2 underline-offset-2 transition-colors duration-200 group-hover:decoration-current group-focus-visible:decoration-current font-medium leading-tight tracking-tight ${title}`}
            >
              {project.title}
            </h3>
            {size === "small" && hasStats ? (
              <div className="mt-6">
                <Stat stat={stats[0]} big={false} />
              </div>
            ) : (
              <p
                className={`mt-3 text-cream/70 ${
                  bigStat && hasStats ? "text-[0.95rem]" : "text-base"
                } ${size === "full" ? "lg:line-clamp-2" : ""} ${
                  size === "small" ? "truncate" : ""
                }`}
              >
                <Headline text={project.headline} />
              </p>
            )}
          </div>
          {bigStat && hasStats && (
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-5">
              {stats.map((s) => (
                <Stat key={s.value} stat={s} big />
              ))}
            </div>
          )}
          <div className="mt-5 flex items-end justify-between gap-3">
            <Tags tone="onBlue" items={project.tags.slice(0, rich ? 3 : 2)} />
            <Arrow />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
