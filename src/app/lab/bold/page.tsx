import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/content";
import { about, contact, proofStats } from "@/content/site";
import { Reveal } from "@/components/lab/bold/Reveal";
import styles from "@/components/lab/bold/bold.module.css";

export const metadata: Metadata = {
  title: "Lab: Editorial bold",
  robots: { index: false },
};

export default function BoldLab() {
  const projects = getProjects();
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <section className={styles.hero}>
          <Reveal>
            <h1 className={styles.h1}>Software and AI, built where the work happens.</h1>
            <p className={styles.sub}>Jin Kim · Fullstack &amp; AI engineer · Seongnam → Vancouver 2027</p>
            <div className={styles.ctas}>
              <a className={styles.btn} href="#projects">See projects</a>
              <a className={styles.link} href={contact.resume}>Resume ↓</a>
            </div>
          </Reveal>
        </section>

        <Reveal>
          <div className={styles.proof}>
            {proofStats.map((s) => (
              <div key={s.label}>
                <div className={styles.num}>{s.value}</div>
                <div className={styles.lab}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <section className={styles.sec} id="projects">
          <Reveal>
            <div className={styles.secHead}>
              <span className={styles.mark}>01</span>
              <h2 className={styles.h2}>Projects</h2>
            </div>
          </Reveal>
          <div className={styles.list}>
            {projects.map((p, i) => {
              const stat = p.stats[0];
              return (
                <Reveal key={p.slug}>
                  <Link href={`/projects/${p.slug}/`} className={styles.row}>
                    <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className={styles.title}>{p.title}</h3>
                      <p className={styles.one}>{p.one_liner_kr}</p>
                    </div>
                    <div className={styles.stat}>
                      {stat && (
                        <>
                          <div className={styles.statV}>{stat.value}</div>
                          <div className={styles.statL}>{stat.label}</div>
                        </>
                      )}
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.cover} src={p.cover} alt={`${p.title} cover`} width={320} height={200} loading="lazy" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className={styles.sec}>
          <Reveal>
            <div className={styles.secHead}>
              <span className={styles.mark}>02</span>
              <h2 className={styles.h2}>Experience</h2>
            </div>
            <div className={styles.table}>
              {about.timeline.map((t) => (
                <div className={styles.tr} key={t.org}>
                  <span className={styles.when}>{t.when}</span>
                  <span>
                    <strong>{t.org}</strong> <span className={styles.role}>· {t.role}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className={`${styles.sec} ${styles.contact}`}>
          <Reveal>
            <div className={styles.secHead}>
              <span className={styles.mark}>03</span>
              <h2 className={styles.h2}>Contact</h2>
            </div>
            <a className={styles.email} href={`mailto:${contact.email}`}>{contact.email}</a>
            <div className={styles.links}>
              <a href={contact.linkedin}>{contact.linkedinLabel}</a>
              <a href={contact.github}>{contact.githubLabel}</a>
              <a href={contact.resume}>Resume (PDF)</a>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
