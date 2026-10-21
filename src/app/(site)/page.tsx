import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CopyEmail } from "@/components/CopyEmail";
import { ProjectBento } from "@/components/ProjectBento";
import { bentoSize } from "@/lib/bento";
import { Button, TextLink } from "@/components/ui/Button";
import { StatNumber } from "@/components/ui/StatNumber";
import { HairlineGrow, Reveal } from "@/components/ui/Reveal";
import {
  about,
  aboutSummary,
  contactStatus,
  proofStats,
  contact,
  projectsStrip,
  howIWork,
  siteDescription,
  siteTitle,
  siteUrl,
  writingSubline,
} from "@/content/site";
import { PostItem } from "@/components/PostItem";
import { getPosts, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: `${siteTitle} | Forward-deployed & AI engineer` },
  description: siteDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  const projects = getProjects();
  const posts = getPosts();
  const latest = posts.slice(0, 3);

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteTitle,
    url: siteUrl,
    email: contact.email,
    jobTitle: "AI & Forward Deployed Engineer",
    worksFor: { "@type": "Organization", name: "SDI Creative Technologies" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Simon Fraser University" },
    sameAs: [contact.linkedin, contact.github],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <section className="bg-blue text-cream">
        <div className="wrap gutter pb-20 pt-32 md:pb-28 md:pt-40">
          <Hero />
        </div>

        <div className="wrap gutter pb-16 md:pb-20">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-12">
            {proofStats.map((s, i) => (
              <Reveal key={s.label} y={24} delay={i * 0.1} className="min-w-0">
                <dt className="numeral text-[clamp(2.75rem,6vw,5rem)]">
                  <StatNumber value={s.value} />
                </dt>
                <dd className="label mt-3 max-w-[22ch] leading-relaxed text-cream/70">{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section id="projects" className="bg-blue text-cream">
        <div className="wrap gutter pb-20 pt-6 md:pb-28 md:pt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Reveal y={24}>
                <p className="label text-cream/70">{"// "}Selected work</p>
              </Reveal>
              <Reveal y={24} delay={0.08}>
                <h2 className="display h2-section mt-3">All projects</h2>
              </Reveal>
            </div>
            <Reveal y={0} delay={0.3} className="shrink-0">
              <p className="label text-cream/70">[{projects.length} projects]</p>
            </Reveal>
          </div>
          <Reveal y={16} delay={0.16}>
            <p className="mt-4 max-w-3xl font-mono text-sm text-cream/80">{projectsStrip}</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-12">
            {projects.map((p, i) => (
              <ProjectBento
                key={p.slug}
                project={p}
                index={i}
                size={bentoSize(i, projects.length)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="bg-bg">
        <div className="wrap gutter py-20 md:py-28">
          <Reveal y={24}>
            <p className="label text-muted">{"// "}Where I have worked</p>
          </Reveal>
          <Reveal y={24} delay={0.08}>
            <h2 className="display h2-section mt-3">Experience</h2>
          </Reveal>
          <ul className="mt-12">
            {about.timeline.map((t, i) => (
              <li key={t.org} className="min-w-0">
                <Reveal y={16} delay={Math.min(i, 5) * 0.06}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-1 py-5 transition-colors duration-150 hover:bg-fg hover:text-bg md:grid-cols-[13rem_1fr] md:px-3 lg:grid-cols-[13rem_minmax(0,22rem)_1fr]">
                  <p className="label opacity-70 md:pt-1.5">{t.when}</p>
                  <p className="font-display text-lg font-medium">
                    {t.org}
                    <span className="block text-base font-normal opacity-70">{t.role}</span>
                  </p>
                  <p className="opacity-80 md:col-start-2 lg:col-start-3">{t.short}</p>
                </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <TextLink href="/about/">Full background</TextLink>
          </p>
        </div>
      </section>

      {posts.length >= 2 && (
        <section id="writing" className="bg-bg">
          <div className="wrap gutter py-20 md:py-28">
            <div className="flex items-end justify-between gap-4">
              <div>
                <Reveal y={24}>
                  <p className="label text-muted">{"// "}Writing</p>
                </Reveal>
                <Reveal y={24} delay={0.08}>
                  <h2 className="display h2-section mt-3">Writing</h2>
                </Reveal>
              </div>
              <Reveal y={0} delay={0.3} className="shrink-0">
                <p className="label text-muted">
                  [{posts.length} {posts.length === 1 ? "article" : "articles"}]
                </p>
              </Reveal>
            </div>
            <Reveal y={16} delay={0.16}>
              <p className="mt-4 max-w-2xl text-muted">{writingSubline}</p>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-1 md:grid-cols-3">
              {latest.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.1} y={32} duration={0.5} className="min-w-0">
                  <PostItem post={p} />
                </Reveal>
              ))}
            </div>
            <p className="mt-10">
              <TextLink href="/blog/">All articles</TextLink>
            </p>
          </div>
        </section>
      )}

      <section className="bg-band">
        <div className="wrap gutter py-20 md:py-28">
          <Reveal y={24}>
            <p className="label text-muted">{"// "}Approach</p>
          </Reveal>
          <Reveal y={24} delay={0.08}>
            <h2 className="display h2-section mt-3">How I work</h2>
          </Reveal>
          <HairlineGrow className="mt-12" />
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {howIWork.map((s, i) => (
              <div key={s.step}>
                <Reveal y={40} delay={i * 0.14} duration={0.5}>
                  <p className="numeral text-[clamp(4rem,8vw,7rem)]">{s.step}/</p>
                </Reveal>
                <Reveal y={24} delay={i * 0.14 + 0.1}>
                  <h3 className="display mt-6 text-3xl">{s.title}</h3>
                </Reveal>
                <Reveal y={16} delay={i * 0.14 + 0.18}>
                  <p className="mt-4 text-base text-muted">{s.body}</p>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="mt-20">
            <Reveal y={24}>
              <p className="label text-muted">{"// "}Stack</p>
            </Reveal>
            <Reveal y={24} delay={0.08}>
              <h2 className="display h2-section mt-3">Skills</h2>
            </Reveal>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-12">
              {about.skills.map((g, i) => (
                <Reveal key={g.group} y={24} delay={i * 0.1} className="min-w-0">
                  <dt className="label">{g.group}</dt>
                  <dd className="mt-3 font-mono text-sm leading-relaxed text-muted">
                    {g.items.split(", ").join(" · ")}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="about" className="bg-bg">
        <div className="wrap gutter grid gap-12 py-20 md:grid-cols-2 md:py-28">
          <div>
          <Reveal y={24}>
            <p className="label text-muted">{"// "}About</p>
          </Reveal>
          <Reveal y={24} delay={0.08}>
            <h2 className="display h2-section mt-3">Hi, I am Jin.</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-6 space-y-3">
              {aboutSummary.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
            <p className="mt-6">
              <TextLink href="/about/">More about me</TextLink>
            </p>
          </Reveal>
          </div>
          <Reveal delay={0.08}>
            <p className="label text-muted">{"// "}Contact</p>
            <p className="mt-3 font-mono text-sm">
              <span className="label text-muted">{"// "}Status</span>
              {"  "}
              {contactStatus}
            </p>
            <ul className="mt-6 space-y-2 text-xl">
              <li><a className="underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a className="underline underline-offset-4" href={contact.linkedin}>{contact.linkedinLabel}</a></li>
              <li><a className="underline underline-offset-4" href={contact.github}>{contact.githubLabel}</a></li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CopyEmail email={contact.email} />
              <Button href={contact.resume} tone="onLight">
                Resume (PDF)
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
