import type { Metadata } from "next";
import Image from "next/image";
import { ExperienceRow } from "@/components/home/Experience";
import { Reveal } from "@/components/home/Reveal";
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

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pt-20">
      <Reveal>
        <h2 className="m-0 mb-8 text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold tracking-[-0.03em]">{title}</h2>
        {children}
      </Reveal>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="wrap-home gutter pb-28 pt-28 md:pt-36">
      <h1 className="h1-hero m-0">{about.title}</h1>
      <div className="mt-10 overflow-hidden">
        <div className="mb-6 w-60 rounded-2xl bg-surface p-3 md:float-right md:mb-4 md:ml-12">
          <Image
            src="/images/profile.jpg"
            alt="Illustration of Jin Kim"
            width={480}
            height={480}
            unoptimized
            className="block h-auto w-full rounded-lg"
          />
        </div>
        <div className="flex max-w-[68ch] flex-col gap-5 text-[1.125rem]">
          {about.intro.map((s) => (
            <p key={s} className="m-0">
              {s}
            </p>
          ))}
          <p className="m-0 text-mute">{about.now}</p>
        </div>
      </div>

      <Block title="Experience">
        <div className="border-t border-rule">
          {about.timeline.map((t) => (
            <ExperienceRow key={t.org} t={t} />
          ))}
        </div>
      </Block>

      <Block title="Education">
        <div className="border-t border-rule">
          {about.education.map((e) => (
            <ExperienceRow key={e.org} t={{ ...e, short: e.place }} />
          ))}
        </div>
      </Block>

      <Block title={about.skillsTitle}>
        <dl className="m-0 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {about.skills.map((s) => (
            <div key={s.group}>
              <dt className="label text-mute">{s.group}</dt>
              <dd className="m-0 mt-2">{s.items}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <section className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-20">
        <Button href={contact.resume}>{about.resumeLabel}</Button>
        <TextLink href={`mailto:${contact.email}`}>{about.emailLabel}</TextLink>
        <TextLink href={contact.linkedin} target="_blank" rel="noopener noreferrer">
          {about.linkedinLabel}
        </TextLink>
        <TextLink href={contact.github} target="_blank" rel="noopener noreferrer">
          {about.githubLabel}
        </TextLink>
      </section>
    </div>
  );
}
