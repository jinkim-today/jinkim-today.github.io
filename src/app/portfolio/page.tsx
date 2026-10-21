import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { PrintButton } from "@/components/PrintButton";
import { Contact } from "@/components/home/Contact";
import { ExperienceRow } from "@/components/home/Experience";
import { Hero } from "@/components/home/Hero";
import { ProjectHeading, ProjectStat } from "@/components/home/ProjectList";
import { ProofRow } from "@/components/home/ProofRow";
import { SectionHead } from "@/components/home/SectionHead";
import { about, contact, contactStatus, siteUrl } from "@/content/site";
import { getProjects, type Project } from "@/lib/content";

export function generateMetadata(): Metadata {
  return {
    title: "Portfolio",
    description:
      "Jin Kim portfolio: fullstack and AI engineer. Eight projects with period, role, contribution, stack, and results.",
    alternates: { canonical: "/portfolio/" },
    robots: { index: true, follow: true },
  };
}

const TOTAL = 12;

function Slide({
  n,
  className = "",
  children,
}: {
  n: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`pf-slide ${className}`}>
      <div className="pf-in">{children}</div>
      <span className="pf-pageno">
        {String(n).padStart(2, "0")} / {TOTAL}
      </span>
    </section>
  );
}

function ProjectSlide({ p, i, n }: { p: Project; i: number; n: number }) {
  const teamShort = p.team.split(";")[0];
  const caseUrl = `${siteUrl}/projects/${p.slug}/`;
  return (
    <Slide n={n} className="pf-proj">
      <div className="-mx-[1.25em] -mb-[2.5em] -mt-[1.75em] flex flex-1 flex-col @5xl:-m-[3.5em] @5xl:flex-row">
        <div className="relative aspect-[16/10] bg-surface @5xl:aspect-auto @5xl:flex-[0_0_55%]">
          <Image
            src={p.cover}
            alt={`${p.title} cover`}
            fill
            sizes="(min-width: 1280px) 704px, 100vw"
            unoptimized
            className="object-contain p-[0.6em] @5xl:p-[2.5em]"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col px-[1.25em] pb-[2.5em] pt-[1.75em] @5xl:py-[3em] @5xl:pl-[3em] @5xl:pr-[3.25em]">
          <span className="text-[0.875em] font-semibold tabular-nums text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="mt-[0.5em]">
            <ProjectHeading p={p} compact />
          </div>
          <div className="mt-[1.5em] grid grid-cols-2 gap-[1em]">
            {p.stats.map((s) => (
              <ProjectStat key={s.value} stat={s} compact />
            ))}
          </div>
          <ul className="m-0 mt-[1.5em] list-none p-0 text-[0.95em] leading-[1.55]">
            {p.keywords.map((k) => (
              <li key={k} className="before:mr-[0.6em] before:text-accent before:content-['\2022']">
                {k}
              </li>
            ))}
          </ul>
          {p.problem_fix ? (
            <p className="m-0 mt-[1em] text-[0.75em] leading-normal">
              <span className="font-bold">Problem</span> {p.problem_fix.problem}{" "}
              <span className="font-bold text-accent">Fix</span> {p.problem_fix.fix}
            </p>
          ) : null}
          <div className="mt-auto pt-[1em] text-[0.75em] leading-normal text-mute">
            <p className="m-0">
              기간 {p.period}, 역할 {teamShort}
            </p>
            <p className="m-0 [overflow-wrap:anywhere]">스택 {p.tags.join(", ")}</p>
            {p.links.map((l) => (
              <p key={l.url} className="m-0 [overflow-wrap:anywhere]">
                {l.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </p>
            ))}
            <p className="m-0 mt-[0.4em]">
              <a href={`/projects/${p.slug}/`} className="pf-screen font-semibold text-fg hover:text-accent">
                Full case study →
              </a>
              <span className="pf-printurl">{caseUrl.replace(/^https?:\/\//, "")}</span>
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
}

export default function PortfolioPage() {
  const projects = getProjects();
  const host = siteUrl.replace(/^https?:\/\//, "");
  const sfu = about.education[0];

  const [lang, ai, web, cloud] = about.skills;
  const skillCols = [
    { group: lang.group, items: lang.items },
    { group: ai.group, items: ai.items },
    { group: "Web, mobile and cloud", items: `${web.items}, ${cloud.items}` },
  ];

  return (
    <div className="portfolio">
      <Slide n={1} className="pf-cover">
        <div className="pf-actions no-print">
          <PrintButton />
          <a href="/portfolio.pdf" className="hover:text-accent">
            Download PDF →
          </a>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <Hero compact />
          <p className="m-0 mt-[1em] max-w-[44em] text-[1.0625em] text-mute" lang="ko">
            고객사 현장에 직접 들어가 진짜 문제를 찾고, 그 문제를 해결하는 소프트웨어와 AI 시스템을 만들어
            현장에서 쓰이게 하는 풀스택 · AI 엔지니어입니다.
          </p>
          <p className="m-0 mt-[1em] flex flex-wrap gap-x-[1.75em] gap-y-[0.25em] text-[0.95em] text-mute">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.linkedin}>{contact.linkedinLabel}</a>
            <a href={contact.github}>{contact.githubLabel}</a>
          </p>
        </div>
        <ProofRow compact />
      </Slide>

      <Slide n={2} className="pf-overview">
        <SectionHead index="01" title="Projects" compact />
        <div className="grid flex-1 grid-cols-2 gap-x-[1.5em] gap-y-[1.25em] @5xl:grid-cols-4 @5xl:grid-rows-2">
          {projects.map((p, i) => {
            const s = p.stats[0];
            return (
              <a key={p.slug} href={`#${p.slug}`} className="flex min-h-0 flex-col">
                <span className="relative block aspect-[16/10] bg-surface @5xl:aspect-auto @5xl:min-h-0 @5xl:flex-1">
                  <Image
                    src={p.cover}
                    alt={`${p.title} cover`}
                    fill
                    sizes="280px"
                    unoptimized
                    className="object-contain p-[0.6em]"
                  />
                </span>
                <span className="mt-[0.6em] text-[0.8125em] font-semibold tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[1.0625em] font-bold leading-tight tracking-[-0.02em]">{p.title}</span>
                {s ? (
                  <span className="mt-[0.25em] text-[0.875em] font-bold text-accent">
                    {s.value} <span className="font-normal text-mute">{s.label}</span>
                  </span>
                ) : null}
              </a>
            );
          })}
        </div>
      </Slide>

      {projects.map((p, i) => (
        <div key={p.slug} id={p.slug} className="pf-anchor">
          <ProjectSlide p={p} i={i} n={i + 3} />
        </div>
      ))}

      <Slide n={11} className="pf-exp">
        <SectionHead index="02" title="Experience" compact />
        <div className="border-t border-rule">
          {about.timeline.map((t) => (
            <ExperienceRow key={t.org} t={t} compact />
          ))}
          {sfu ? <ExperienceRow t={{ ...sfu, short: sfu.place }} compact /> : null}
        </div>
        <div className="mt-auto grid grid-cols-1 gap-[1em] pt-[1.5em] @5xl:grid-cols-3 @5xl:gap-[2.5em]">
          {skillCols.map((c) => (
            <div key={c.group}>
              <h3 className="m-0 text-[1.0625em] font-bold">{c.group}</h3>
              <p className="m-0 mt-[0.4em] text-[0.8125em] leading-[1.6] text-mute">{c.items}</p>
            </div>
          ))}
        </div>
      </Slide>

      <Slide n={12} className="pf-close">
        <div className="flex flex-1 flex-col justify-center">
          <Contact compact index="03" />
          <p className="m-0 mt-[2em] text-[0.875em] text-mute">{contactStatus}</p>
        </div>
        <p className="m-0 text-[0.75em] text-mute">{host}/portfolio, 2026-10</p>
      </Slide>
    </div>
  );
}
