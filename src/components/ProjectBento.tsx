"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Status, Tags } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { StatNumber } from "@/components/ui/StatNumber";
import type { BentoSize } from "@/lib/bento";
import { contextLabel } from "@/lib/context-label";
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
      className="inline-block shrink-0 whitespace-nowrap font-mono text-lg transition-transform duration-200 ease-out group-hover:translate-x-1.5 group-hover:text-accent"
    >
      -&gt;
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
        className={`numeral block whitespace-nowrap text-accent ${
          big ? "text-[clamp(2.75rem,5vw,5.5rem)]" : "text-[clamp(2rem,3.5vw,3.25rem)]"
        }`}
      />
      {stat.label && (
        <p className="mt-2 max-w-[22ch] font-mono text-[0.75rem] leading-snug opacity-70">
          {stat.label.split(" ").slice(0, 3).join(" ")}
        </p>
      )}
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
  const keyLine = project.keywords.slice(0, 3).join(" · ");
  const title =
    size === "feature"
      ? "text-3xl lg:text-[2.5rem]"
      : size === "full"
        ? "text-2xl lg:text-3xl"
        : size === "wide"
          ? "text-2xl"
          : "text-xl";

  const layout = horizontal
    ? size === "feature"
      ? "sm:flex-row lg:min-h-[420px]"
      : "sm:flex-row lg:h-[200px]"
    : "";
  const coverBox = horizontal
    ? size === "feature"
      ? "aspect-[16/10] sm:aspect-auto sm:w-[60%] sm:shrink-0"
      : "aspect-[16/10] sm:aspect-auto sm:w-[40%] sm:shrink-0"
    : "aspect-[16/11]";

  return (
    <Reveal delay={(index % 3) * 0.06} y={32} scale={0.98} duration={0.5} className={`${SPAN[size]} min-w-0`}>
      <Link
        href={`/projects/${project.slug}/`}
        className={`group flex h-full flex-col overflow-hidden rounded-lg bg-[#1A30FF] text-cream ${layout}`}
      >
        <div className={`relative p-2 ${coverBox}`}>
          <div
            className="relative h-full w-full overflow-hidden rounded-[4px]"
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
        </div>

        <div
          className={`flex min-w-0 flex-1 flex-col p-5 transition-colors duration-150 group-hover:bg-blue-deep group-focus-visible:bg-blue-deep md:p-6 ${
            size === "feature" ? "lg:p-10" : ""
          } ${size === "full" ? "justify-center lg:px-8" : "justify-between"}`}
        >
          <div className="min-w-0">
            {rich && size !== "full" && (
              <div className="flex items-center justify-between gap-3">
                <span className="label opacity-70">{contextLabel(project, index + 1)}</span>
                <Status tone="onBlue">{project.status}</Status>
              </div>
            )}
            <h3
              className={`${rich && size !== "full" ? "mt-3" : ""} font-display font-semibold leading-tight tracking-tight ${title}`}
            >
              {project.title}
            </h3>
            {size === "full" && (
              <p className="mt-3 max-w-[60ch] text-[0.95rem] text-cream/85">
                {project.headline.replace(/\*\*/g, "")}
              </p>
            )}
          </div>
          {size !== "full" && hasStats && (
            <div className="mt-5">
              <Stat stat={stats[0]} big={bigStat} />
            </div>
          )}
          {size !== "full" && (
            <div className="mt-5 flex items-end justify-between gap-3">
              {rich ? (
                <span className="tile-meta min-w-0">
                  <span className="tile-tags">
                    <Tags tone="onBlue" items={project.tags.slice(0, 3)} />
                  </span>
                  <span className="tile-kw">
                    <span className="label opacity-70">{keyLine}</span>
                  </span>
                </span>
              ) : (
                <span />
              )}
              <Arrow />
            </div>
          )}
          {size === "full" && (
            <div className="mt-4 flex justify-end">
              <Arrow />
            </div>
          )}
        </div>
      </Link>
    </Reveal>
  );
}
