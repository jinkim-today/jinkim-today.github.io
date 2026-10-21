import { contact } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

/** `compact` = slide variant: em sizing, no section padding or scroll reveal. */
export function Contact({ compact = false, index = "05" }: { compact?: boolean; index?: string }) {
  if (compact) {
    return (
      <div>
        <SectionHead index={index} title="Contact" compact />
        <a
          href={`mailto:${contact.email}`}
          className="inline-block break-all text-[2.25em] font-extrabold leading-tight @5xl:text-[4.5em] tracking-[-0.03em]"
        >
          {contact.email}
        </a>
        <div className="mt-[1.5em] flex flex-wrap gap-[1.75em] text-[1.125em] text-mute">
          <a href={contact.linkedin}>{contact.linkedinLabel}</a>
          <a href={contact.github}>{contact.githubLabel}</a>
          <a href={contact.resume}>Resume (PDF)</a>
        </div>
      </div>
    );
  }
  return (
    <section id="contact" className="pb-28 pt-24">
      <SectionHead index={index} title="Contact" />
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
