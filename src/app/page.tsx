import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Headline } from "@/components/Headline";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import {
  aboutSummary,
  badgeText,
  contact,
  heroSubline,
  heroTitle,
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
            <Pill tone="onBlue">{badgeText}</Pill>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display h1-hero mt-8 max-w-[18ch]">{heroTitle}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-xl opacity-90">{heroSubline}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
            <Button href="#projects">See projects ↓</Button>
            <Button href={contact.resume} variant="outline">
              Download resume
            </Button>
          </Reveal>
        </div>

        <div className="border-t border-cream/30 py-6">
          <Marquee>
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}/`}
                className="group relative mr-4 block w-[72vw] max-w-[28rem] shrink-0 overflow-hidden border border-cream/30"
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
            <p className="label text-muted">Selected work</p>
            <h2 className="display h2-section mt-3">All projects</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-bg">
        <div className="wrap gutter py-20 md:py-28">
          <Reveal>
            <p className="label text-muted">Approach</p>
            <h2 className="display h2-section mt-3">How I work</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {howIWork.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08} className="bg-bg p-6 md:p-8">
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
