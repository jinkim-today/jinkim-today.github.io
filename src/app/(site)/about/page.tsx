import type { Metadata } from "next";
import { Button, TextLink } from "@/components/ui/Button";
import { about, contact } from "@/content/site";

export function generateMetadata(): Metadata {
  return {
    title: about.title,
    description: about.metaDescription,
    alternates: { canonical: "/about/" },
    openGraph: {
      type: "profile",
      title: `${about.title} | Jin Kim`,
      description: about.metaDescription,
      url: "/about/",
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <header className="bg-blue text-cream">
        <div className="wrap gutter pb-14 pt-32 md:pb-20 md:pt-40">
          <h1 className="display h1-hero">{about.title}</h1>
        </div>
      </header>
      <div className="wrap gutter space-y-16 py-14 md:space-y-20 md:py-20">
        <section className="max-w-2xl space-y-4">
          {about.intro.map((s) => (
            <p key={s}>{s}</p>
          ))}
        </section>

        <section>
          <h2 className="mb-6 text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal">
            {about.timelineTitle}
          </h2>
          <ul className="max-w-3xl space-y-6">
            {about.timeline.map((t) => (
              <li key={t.org}>
                <p className="label text-muted">{t.when}</p>
                <p className="mt-1 text-lg">
                  {t.org}
                  <span className="text-muted">, {t.role}</span>
                </p>
                <p className="mt-1">{t.line}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-2xl">
          <h2 className="mb-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal">
            {about.nowTitle}
          </h2>
          <p>{about.now}</p>
        </section>

        <section>
          <h2 className="mb-6 text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal">
            {about.skillsTitle}
          </h2>
          <dl className="max-w-3xl space-y-4">
            {about.skills.map((s) => (
              <div key={s.group}>
                <dt className="label text-muted">{s.group}</dt>
                <dd className="mt-1">{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={contact.resume} tone="onLight">
            {about.resumeLabel}
          </Button>
          <TextLink href={`mailto:${contact.email}`}>{about.emailLabel}</TextLink>
          <TextLink href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            {about.linkedinLabel}
          </TextLink>
          <TextLink href={contact.github} target="_blank" rel="noopener noreferrer">
            {about.githubLabel}
          </TextLink>
        </section>
      </div>
    </>
  );
}
