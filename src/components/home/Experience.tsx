import { about } from "@/content/site";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

type Row = { org: string; role: string; when: string; short: string; logo: string; logoTone: "dark" | "white" | "color" };

export function ExperienceRow({ t }: { t: Row }) {
  return (
    <div className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-1 border-b border-rule py-5 md:grid-cols-[7.5rem_minmax(0,1.2fr)_9.5rem_minmax(0,1.4fr)] md:gap-x-8">
      <div className="row-span-2 w-20 md:row-span-1 md:w-auto">
        <Logo src={t.logo} tone={t.logoTone} alt={`${t.org} logo`} />
      </div>
      <p className="m-0 leading-snug">
        <strong className="font-bold">{t.org}</strong>
        <span className="block text-mute">{t.role}</span>
      </p>
      <p className="col-start-2 m-0 text-sm tabular-nums text-mute md:col-start-3 md:text-right">{t.when}</p>
      <p className="col-span-2 m-0 text-sm text-mute md:col-span-1 md:col-start-4">{t.short}</p>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="pt-24">
      <SectionHead index="03" title="Experience" />
      <Reveal>
        <div className="border-t border-rule">
          {about.timeline.map((t) => (
            <ExperienceRow key={t.org} t={t} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
