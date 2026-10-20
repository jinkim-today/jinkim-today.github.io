import Image from "next/image";
import Link from "next/link";
import { Headline } from "@/components/Headline";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/content";

export type BentoSize = "feature" | "wide" | "small" | "full";

/**
 * Derive the card size from its index so any project count degrades gracefully:
 * feature, then repeating [wide, small, small] / [small, small, wide], last one full-low.
 */
export function bentoSize(index: number, total: number): BentoSize {
  if (index === 0) return "feature";
  if (total > 2 && index === total - 1) return "full";
  const j = index - 1;
  const g = Math.floor(j / 3);
  const k = j % 3;
  const wideAt = g % 2 === 0 ? 0 : 2;
  return k === wideAt ? "wide" : "small";
}

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
  const num = String(index + 1).padStart(2, "0");

  const layout = horizontal
    ? size === "feature"
      ? "sm:flex-row lg:h-[420px]"
      : "sm:flex-row lg:h-[200px]"
    : "";
  const coverBox = horizontal
    ? size === "feature"
      ? "aspect-[16/10] sm:aspect-auto sm:w-[55%] sm:shrink-0"
      : "aspect-[16/10] sm:aspect-auto sm:w-[40%] sm:shrink-0"
    : "aspect-[16/10]";
  const numeral =
    size === "feature"
      ? "text-8xl"
      : size === "full"
        ? "text-5xl"
        : "text-6xl";
  const title =
    size === "feature"
      ? "text-3xl lg:text-[2.5rem]"
      : size === "full"
        ? "text-2xl lg:text-3xl"
        : size === "wide"
          ? "text-2xl"
          : "text-xl";

  return (
    <Reveal delay={(index % 3) * 0.06} className={`${SPAN[size]} min-w-0`}>
      <Link
        href={`/projects/${project.slug}/`}
        style={{ "--accent": project.accent } as React.CSSProperties}
        className={`group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-card transition-colors duration-200 hover:border-[var(--accent)] focus-visible:border-[var(--accent)] ${layout}`}
      >
        <div
          className={`relative overflow-hidden ${coverBox}`}
          style={{ backgroundColor: project.accent }}
        >
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            width={1600}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          <span
            aria-hidden
            className={`display pointer-events-none absolute left-4 top-3 leading-none text-cream/90 ${numeral}`}
          >
            {num}
          </span>
        </div>

        <div
          className={`flex min-w-0 flex-1 flex-col p-5 md:p-6 ${
            size === "feature" ? "lg:p-10" : ""
          } ${size === "full" ? "justify-center lg:px-8" : "justify-between"}`}
        >
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <span className="label text-muted">
                {num} · {project.year}
              </span>
              {rich && (
                <span className="label rounded-full border border-line px-2.5 py-0.5 text-muted">
                  {project.status}
                </span>
              )}
            </div>
            <h3
              className={`mt-3 font-display font-extrabold leading-tight tracking-tight ${title}`}
            >
              {project.title}
            </h3>
            <p
              className={`mt-3 text-base text-muted ${
                rich ? (size === "full" ? "lg:line-clamp-2" : "") : "truncate"
              }`}
            >
              <Headline text={project.headline} />
            </p>
          </div>
          <div className="mt-5 flex items-end justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, rich ? 3 : 2).map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
            <Arrow />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
