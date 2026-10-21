import Link from "next/link";
import type { Project } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

/** Title + Korean one-liner, shared by the home rows and the deck. */
export function ProjectHeading({ p, compact = false }: { p: Project; compact?: boolean }) {
  return (
    <div>
      <h3
        className={`m-0 font-bold leading-tight tracking-[-0.02em] ${compact ? "text-[2.25em]" : "text-3xl md:text-[2rem]"}`}
      >
        {p.title}
      </h3>
      <p className={`mt-2 text-mute ${compact ? "text-[1.0625em]" : "text-base"}`} lang="ko">
        {p.one_liner_kr}
      </p>
    </div>
  );
}

/** Big accent stat + label, shared by the home rows and the deck. */
export function ProjectStat({ stat, compact = false }: { stat: { value: string; label: string }; compact?: boolean }) {
  return (
    <div>
      <div
        className={`font-extrabold leading-none tracking-[-0.03em] text-accent tabular-nums ${compact ? "text-[3em]" : "text-5xl"}`}
      >
        {stat.value}
      </div>
      <div className={`mt-2 text-mute ${compact ? "text-[0.8125em]" : "text-xs"}`}>{stat.label}</div>
    </div>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="pt-24">
      <SectionHead index="01" title="Projects" />
      <div className="border-t border-rule">
        {projects.map((p, i) => {
          const stat = p.stats[0];
          return (
            <Reveal key={p.slug}>
              <Link
                href={`/projects/${p.slug}/`}
                className="grid grid-cols-[minmax(0,1fr)] items-center gap-4 border-b border-rule py-6 transition-colors hover:bg-surface md:grid-cols-[3rem_minmax(0,1fr)_auto_320px] md:gap-8 md:py-7"
              >
                <span className="text-sm font-semibold tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-start-2">
                  <ProjectHeading p={p} />
                </div>
                <div className="md:min-w-36 md:text-right">{stat && <ProjectStat stat={stat} />}</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="block aspect-[8/5] w-full bg-surface object-cover max-md:order-first md:h-[200px] md:w-[320px]"
                  src={p.cover}
                  alt={`${p.title} cover`}
                  width={320}
                  height={200}
                  loading="lazy"
                />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
