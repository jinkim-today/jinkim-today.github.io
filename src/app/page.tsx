import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Headline } from "@/components/Headline";
import { ProjectBento, bentoSize } from "@/components/ProjectBento";
import { Button, TextLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import {
  aboutSummary,
  badgeText,
  contact,
  heroSubline,
  heroTitle,
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
          <Reveal>
            <p className="label text-cream/80">{badgeText}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display h1-hero mt-8 max-w-[18ch]">{heroTitle}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-xl opacity-90">{heroSubline}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#projects">See projects ↓</Button>
            <TextLink href={contact.resume} className="px-2 py-3">
              Download resume
            </TextLink>
          </Reveal>
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
                  <strong className="block font-display text-base font-extrabold">{p.title}</strong>
                  <Headline text={p.headline} />
                </span>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      <section id="projects" className="bg-bg">
        <div className="wrap gutter py-20 md:py-28">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="label text-muted">Selected work</p>
                <h2 className="display h2-section mt-3">All projects</h2>
              </div>
              <p className="label shrink-0 text-muted">{projects.length} projects</p>
            </div>
            <p className="mt-4 max-w-2xl text-muted">{projectsSubline}</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
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
          <Reveal>
            <p className="label text-muted">Approach</p>
            <h2 className="display h2-section mt-3">How I work</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {howIWork.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08} >
                <p className="label text-muted">{s.step}</p>
                <h3 className="display mt-4 text-3xl">{s.title}</h3>
                <p className="mt-4 text-base text-muted">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-bg">
        <div className="wrap gutter grid gap-12 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <p className="label text-muted">About</p>
            <h2 className="display h2-section mt-3">Hi, I am Jin.</h2>
            <div className="mt-6 space-y-3">
              {aboutSummary.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
            <p className="mt-6">
              <Link href="/about/" className="underline underline-offset-4">
                More about me
              </Link>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="label text-muted">Contact</p>
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
