import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Headline } from "@/components/Headline";
import { ProjectBento } from "@/components/ProjectBento";
import { bentoSize } from "@/lib/bento";
import { Button, TextLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { HairlineGrow, Reveal } from "@/components/ui/Reveal";
import {
  aboutSummary,
  contact,
  projectsSubline,
  howIWork,
  siteDescription,
  siteTitle,
  siteUrl,
} from "@/content/site";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: `${siteTitle} | Forward-deployed & AI engineer` },
  description: siteDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  const projects = getProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 5);

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteTitle,
    url: siteUrl,
    email: contact.email,
    jobTitle: "Forward-deployed and AI engineer",
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

        <div className="py-6">
          <Marquee>
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}/`}
                className="group relative mr-4 block w-[72vw] max-w-[28rem] shrink-0 overflow-hidden"
              >
                <Image
                  src={p.cover}
                  alt={`${p.title} cover`}
                  width={1600}
                  height={1000}
                  className="aspect-[16/10] w-full object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-cream p-3 text-sm text-ink transition-transform duration-200 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  <strong className="block font-display text-base font-medium">{p.title}</strong>
                  <Headline text={p.headline} />
                </span>
              </Link>
            ))}
          </Marquee>
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
            <p className="mt-4 max-w-2xl text-cream/70">{projectsSubline}</p>
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
            <ul className="mt-3 space-y-2 text-xl">
              <li><a className="underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a className="underline underline-offset-4" href={contact.linkedin}>{contact.linkedinLabel}</a></li>
              <li><a className="underline underline-offset-4" href={contact.github}>{contact.githubLabel}</a></li>
            </ul>
            <div className="mt-8">
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
