import { about } from "@/content/site";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

type Row = { org: string; role: string; when: string; short: string; logo: string; logoTone: "dark" | "white" | "color" };

/** `compact` = slide variant: em sizing so eight rows fit one 16:9 slide. */
export function ExperienceRow({ t, compact = false }: { t: Row; compact?: boolean }) {
  if (compact) {
    return (
      <div className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-1 border-b border-rule py-3 @5xl:grid-cols-[6em_minmax(0,1fr)_12em_minmax(0,1.4fr)] @5xl:gap-x-[2em] @5xl:py-[0.55em]">
        <div className="row-span-2 w-20 @5xl:row-span-1 @5xl:w-auto">
          <Logo src={t.logo} tone={t.logoTone} alt={`${t.org} logo`} compact />
        </div>
        <p className="m-0 leading-snug">
          <strong className="font-bold">{t.org}</strong>
          <span className="block text-[0.875em] text-mute">{t.role}</span>
        </p>
        <p className="col-start-2 m-0 whitespace-nowrap text-[0.875em] tabular-nums text-mute @5xl:col-start-3 @5xl:text-right">{t.when}</p>
        <p className="col-span-2 m-0 text-[0.875em] text-mute @5xl:col-span-1 @5xl:col-start-4">{t.short}</p>
      </div>
    );
  }
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
