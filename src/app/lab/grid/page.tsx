import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getProjects, plainHeadline } from "@/lib/content";
import { about, contact } from "@/content/site";
import GridCard from "@/components/lab/grid/GridCard";
import styles from "@/components/lab/grid/grid.module.css";

export const metadata: Metadata = {
  title: "Lab: image-first grid",
  robots: { index: false },
};

const realShots = new Set(["photobyme", "happyhour-map", "chatgpt-followup-assistant"]);

export default function GridLab() {
  const projects = getProjects();
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <div>
            <span className={styles.name}>Jin Kim</span>
            <span className={styles.role}>Fullstack &amp; AI engineer</span>
          </div>
          <nav className={styles.links}>
            <a className="ln" href={`mailto:${contact.email}`}>{contact.email}</a>
            <a className="ln" href={contact.linkedin}>LinkedIn</a>
            <a className="ln" href={contact.github}>GitHub</a>
            <a className="ln" href={contact.resume}>Resume</a>
          </nav>
        </header>
        <p className={styles.statement}>
          I go on-site, find the real problem, and ship the software that fixes it.
        </p>

        <div className={styles.grid}>
          {projects.map((p, i) => {
            const shot = p.gallery?.[0];
            const hasShot = shot && fs.existsSync(path.join(process.cwd(), "public", shot));
            const image = realShots.has(p.slug) && hasShot ? shot : p.cover;
            const stat = p.stats[0];
            const key = stat ? `${stat.value} ${stat.label}` : plainHeadline(p.headline);
            return (
              <GridCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                image={image}
                index={i}
                meta={[p.year, p.org, key].join(" · ")}
              />
            );
          })}
        </div>

        <section className={styles.section}>
          <h2 className={styles.h2}>About</h2>
          <div className={styles.about}>
            {about.intro.map((t) => (
              <p key={t} style={{ margin: 0 }}>{t}</p>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Experience</h2>
          <ul className={styles.exp}>
            {about.timeline.map((t) => (
              <li key={t.org}>
                <span className={styles.when}>{t.when}</span>
                <span>{t.org}, {t.role}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Contact</h2>
          <a className={`${styles.contact} ln`} href={`mailto:${contact.email}`}>{contact.email}</a>
        </section>
      </div>
    </main>
  );
}
