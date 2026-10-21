import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";
import { PrintButton } from "@/components/PrintButton";
import { about, contact, proofStats, siteUrl } from "@/content/site";
import { getProjects, plainHeadline, type Project } from "@/lib/content";

export function generateMetadata(): Metadata {
  return {
    title: "Portfolio",
    description:
      "Jin Kim portfolio: fullstack and AI engineer. Eight projects with period, role, contribution, stack, and results.",
    alternates: { canonical: "/portfolio/" },
    robots: { index: true, follow: true },
  };
}

const headingMap: Record<string, string> = {
  Problem: "문제 / Problem",
  "What I built": "구현 / What I built",
  Architecture: "구조 / Architecture",
  Result: "결과 / Result",
  Troubleshooting: "트러블슈팅 / Troubleshooting",
  Next: "다음 / Next",
};

function PfH2({ children }: ComponentProps<"h2">) {
  const text = typeof children === "string" ? children : "";
  return <h4 className="pf-sub">{headingMap[text] ?? children}</h4>;
}

const mdxComponents = { h2: PfH2 };

function Bold({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="pf-num">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function keyResult(p: Project) {
  const s = p.stats[0];
  return s ? `${s.value} ${s.label}` : plainHeadline(p.headline);
}

function Facts({ p }: { p: Project }) {
  const rows: [string, React.ReactNode][] = [
    ["기간 / Period", p.period],
    ["소속 / Org", p.org],
    ["역할·인원 / Role & team", `${p.role}. ${p.team}`],
    ["기여도 / Contribution", p.contribution],
    ["스택 / Stack", p.tags.join(", ")],
    [
      "링크 / Links",
      p.links.length ? (
        p.links.map((l, i) => (
          <span key={l.url}>
            {i > 0 && ", "}
            <a href={l.url}>
              {l.label}: {l.url.replace(/^https?:\/\//, "")}
            </a>
          </span>
        ))
      ) : (
        "비공개 (회사 및 클라이언트 작업) / Private"
      ),
    ],
    ["상태 / Status", p.status],
  ];
  return (
    <dl className="pf-facts">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function PortfolioPage() {
  const projects = getProjects();
  const today = new Date().toISOString().slice(0, 10);
  const host = siteUrl.replace(/^https?:\/\//, "");

  return (
    <div className="portfolio">
      <div className="pf-wrap">
        <header className="pf-header">
          <h1>Jin Kim (김진)</h1>
          <p className="pf-title">Fullstack &amp; AI Engineer · Forward Deployed</p>
          <p className="pf-intro" lang="ko">
            고객사 현장에 직접 들어가 진짜 문제를 찾고, 그 문제를 해결하는 소프트웨어와 AI 시스템을
            만들어 현장에서 쓰이게 하는 풀스택 · AI 엔지니어입니다.
          </p>
          <p className="pf-contact">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span>·</span>
            <a href={contact.linkedin}>{contact.linkedinLabel}</a>
            <span>·</span>
            <a href={contact.github}>{contact.githubLabel}</a>
            <span>·</span>
            <a href={siteUrl}>{host}</a>
          </p>
          <p className="pf-actions no-print">
            <PrintButton />
            <a href="/portfolio.pdf">Download PDF -&gt;</a>
          </p>
        </header>

        <section>
          <h2 className="pf-label">핵심 숫자 / Highlights</h2>
          <div className="pf-stats">
            {proofStats.map((s) => (
              <div key={s.label}>
                <span className="pf-bignum">{s.value}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pf-avoid">
          <h2 className="pf-label">프로젝트 목차 / Projects at a glance</h2>
          <div className="pf-tablewrap">
            <table className="pf-table pf-glance">
              <thead>
                <tr>
                  <th>#</th>
                  <th>프로젝트 / Project</th>
                  <th>기간 / Period</th>
                  <th>역할·기여도 / Role</th>
                  <th>스택 / Stack</th>
                  <th>핵심 성과 / Key result</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={p.slug}>
                    <td className="pf-num">{i + 1}</td>
                    <td>
                      <a href={`#${p.slug}`}>{p.title}</a>
                    </td>
                    <td>{p.period}</td>
                    <td>
                      {p.role}
                      <br />
                      <span className="pf-meta">{p.contribution}</span>
                    </td>
                    <td>{p.tags.join(", ")}</td>
                    <td className="pf-num">{keyResult(p)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="pf-break">
          <h2 className="pf-label">프로젝트 상세 / Project details</h2>
          {projects.map((p, i) => (
            <article key={p.slug} id={p.slug} className="pf-project">
              <Image
                src={p.cover}
                alt={`${p.title} cover`}
                width={640}
                height={400}
                unoptimized
                className="pf-cover"
              />
              <p className="pf-index">{String(i + 1).padStart(2, "0")}</p>
              <h3>{p.title}</h3>
              <p className="pf-headline">
                <Bold text={p.headline} />
              </p>
              <Facts p={p} />
              <p className="pf-summary" lang="ko">
                {p.summary_kr}
              </p>
              <div className="pf-body">
                <MDXRemote source={p.body} components={mdxComponents} />
              </div>
            </article>
          ))}
        </section>

        <section className="pf-break">
          <h2 className="pf-label">경력 / Experience</h2>
          <div className="pf-tablewrap">
            <table className="pf-table">
              <thead>
                <tr>
                  <th>기간 / Period</th>
                  <th>회사 / Company</th>
                  <th>직함 / Title</th>
                  <th>요약 / Summary</th>
                </tr>
              </thead>
              <tbody>
                {about.timeline
                  .filter((t) => !t.org.startsWith("Simon Fraser"))
                  .map((t) => (
                    <tr key={t.org}>
                      <td className="pf-nowrap">{t.when}</td>
                      <td>{t.org}</td>
                      <td>{t.role}</td>
                      <td>{t.line}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="pf-avoid">
          <h2 className="pf-label">기술 / Skills</h2>
          <dl className="pf-skills">
            {about.skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="pf-avoid">
          <h2 className="pf-label">학력 / Education</h2>
          <p>Simon Fraser University · Bachelor of Computer Science · Sep 2020 – Oct 2025 · Burnaby, BC</p>
        </section>

        <footer className="pf-footer">
          Generated from {host} · 2026-10 · {today}
        </footer>
      </div>
    </div>
  );
}
