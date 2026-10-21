import { contact } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function Contact() {
  return (
    <section id="contact" className="pb-28 pt-24">
      <SectionHead index="05" title="Contact" />
      <Reveal>
        <a
          href={`mailto:${contact.email}`}
          className="inline-block break-all text-[clamp(1.75rem,6.2vw,4.5rem)] font-extrabold leading-tight tracking-[-0.03em] hover:text-accent"
        >
          {contact.email}
        </a>
        <div className="mt-6 flex flex-wrap gap-7 text-mute">
          <a className="hover:text-accent" href={contact.linkedin}>{contact.linkedinLabel}</a>
          <a className="hover:text-accent" href={contact.github}>{contact.githubLabel}</a>
          <a className="hover:text-accent" href={contact.resume}>Resume (PDF)</a>
        </div>
      </Reveal>
    </section>
  );
}
