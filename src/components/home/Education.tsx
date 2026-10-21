import { about } from "@/content/site";
import { ExperienceRow } from "./Experience";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function Education() {
  return (
    <section id="education" className="pt-24">
      <SectionHead index="04" title="Education" />
      <Reveal>
        <div className="border-t border-rule">
          {about.education.map((e) => (
            <ExperienceRow key={e.org} t={{ ...e, short: e.place }} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
