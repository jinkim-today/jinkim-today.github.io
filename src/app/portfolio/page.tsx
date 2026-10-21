import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { PrintButton } from "@/components/PrintButton";
import { about, contact, contactStatus, footerTitle, proofStats, siteUrl } from "@/content/site";
import { contextLabel } from "@/lib/context-label";
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
      <div className="pf-media">
        <Image
          src={p.cover}
          alt={`${p.title} cover`}
          fill
          sizes="(min-width: 1280px) 704px, 100vw"
          unoptimized
          className="pf-img"
        />
      </div>
      <div className="pf-text">
        <p className="pf-ctx">{contextLabel(p, i + 1)}</p>
        <h2 className="pf-h">{p.title}</h2>
        <p className="pf-kr" lang="ko">
          {p.one_liner_kr}
        </p>
        <div className="pf-pstats">
          {p.stats.map((s) => (
            <div key={s.value}>
              <span className="pf-big">{s.value}</span>
              <span className="pf-cap">{s.label}</span>
            </div>
          ))}
        </div>
        <ul className="pf-kw">
          {p.keywords.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
        <p className="pf-facts">
          기간 {p.period} · 역할 {teamShort} · 스택 {p.tags.join(", ")}
          {p.links.map((l) => (
            <span key={l.url}> · {l.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
          ))}
        </p>
        {p.problem_fix ? (
          <p className="pf-pf">
            Problem: {p.problem_fix.problem} -&gt; Fix: {p.problem_fix.fix}
          </p>
        ) : null}
        <p className="pf-case">
          <a href={`/projects/${p.slug}/`} className="pf-screen">
            Full case study -&gt;
          </a>
          <span className="pf-printurl">{caseUrl.replace(/^https?:\/\//, "")}</span>
        </p>
      </div>
    </Slide>
  );
}

export default function PortfolioPage() {
  const projects = getProjects();
  const host = siteUrl.replace(/^https?:\/\//, "");
  const timeline = [...about.timeline]
    .filter((t) => !t.org.startsWith("Simon Fraser"))
    .sort((a, b) => dateKey(a.when) - dateKey(b.when));
  const sfu = about.timeline.find((t) => t.org.startsWith("Simon Fraser"));
  if (sfu) timeline.push(sfu);

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
          <a href="/portfolio.pdf">Download PDF -&gt;</a>
        </div>
        <div className="pf-cover-main">
          <h1>Jin Kim (김진)</h1>
          <p className="pf-sub">Fullstack &amp; AI Engineer · Forward Deployed</p>
          <p className="pf-kr pf-intro" lang="ko">
            고객사 현장에 직접 들어가 진짜 문제를 찾고, 그 문제를 해결하는 소프트웨어와 AI 시스템을 만들어
            현장에서 쓰이게 하는 풀스택 · AI 엔지니어입니다.
          </p>
          <p className="pf-contact">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.linkedin}>{contact.linkedinLabel}</a>
            <a href={contact.github}>{contact.githubLabel}</a>
            <a href={siteUrl}>{host}</a>
          </p>
        </div>
        <div className="pf-stats">
          {proofStats.map((s) => (
            <div key={s.label}>
              <span className="pf-big pf-huge">{s.value}</span>
              <span className="pf-cap">{s.label}</span>
            </div>
          ))}
        </div>
      </Slide>

      <Slide n={2} className="pf-overview">
        <p className="pf-label">{`// PROJECTS · ${projects.length}`}</p>
        <div className="pf-grid">
          {projects.map((p, i) => {
            const s = p.stats[0];
            return (
              <a key={p.slug} href={`#${p.slug}`} className="pf-thumb">
                <span className="pf-mat">
                  <Image
                    src={p.cover}
                    alt={`${p.title} cover`}
                    fill
                    sizes="280px"
                    unoptimized
                    className="pf-img"
                  />
                </span>
                <span className="pf-idx">[{String(i + 1).padStart(2, "0")}]</span>
                <span className="pf-t">{p.title}</span>
                {s ? (
                  <span className="pf-num">
                    {s.value} {s.label}
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
        <p className="pf-label">{"// EXPERIENCE"}</p>
        <ol className="pf-timeline">
          {timeline.map((t) => (
            <li key={t.org}>
              <span className="pf-dot" />
              <span className="pf-when">{t.when}</span>
              <span className="pf-org">{t.org}</span>
              <span className="pf-role">{t.role}</span>
            </li>
          ))}
        </ol>
        <p className="pf-label pf-label2">{"// SKILLS"}</p>
        <div className="pf-skills">
          {skillCols.map((c) => (
            <div key={c.group}>
              <h3>{c.group}</h3>
              <p>{c.items.split(", ").join(" · ")}</p>
            </div>
          ))}
        </div>
      </Slide>

      <Slide n={12} className="pf-close">
        <div className="pf-close-main">
          <h2 className="pf-closeh">{footerTitle}</h2>
          <a href={`mailto:${contact.email}`} className="pf-email">
            {contact.email}
          </a>
          <p className="pf-links">
            <a href={contact.linkedin}>{contact.linkedinLabel}</a>
            <a href={contact.github}>{contact.githubLabel}</a>
            <a href={siteUrl}>{host}</a>
          </p>
          <p className="pf-status">{`// STATUS  ${contactStatus}`}</p>
        </div>
        <p className="pf-foot">{host}/portfolio · 2026-10</p>
      </Slide>
    </div>
  );
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function dateKey(when: string) {
  const m = when.match(/([A-Z][a-z]{2}) (\d{4})/);
  return m ? Number(m[2]) * 12 + months.indexOf(m[1]) : 0;
}
