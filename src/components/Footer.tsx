import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { contact, footerTitle } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-blue text-cream">
      <div className="wrap gutter relative py-20 md:py-28">
        <p className="display text-[clamp(2.5rem,9vw,8rem)]">
          <SplitText text={footerTitle} stagger={0.12} />
        </p>
        <Reveal delay={0.55} y={16}>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-lg">
          <li><a className="underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a></li>
          <li><a className="underline underline-offset-4" href={contact.linkedin}>LinkedIn</a></li>
          <li><a className="underline underline-offset-4" href={contact.github}>GitHub</a></li>
          <li><a className="underline underline-offset-4" href={contact.resume}>Resume</a></li>
        </ul>
        </Reveal>
        <p className="label mt-16 opacity-70">© {new Date().getFullYear()} Jin Kim</p>
      </div>
    </footer>
  );
}
