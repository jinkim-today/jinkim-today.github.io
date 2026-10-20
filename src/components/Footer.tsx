import { CursorShape } from "@/components/CursorShape";
import { contact, footerTitle } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-blue text-cream">
      <CursorShape />
      <div className="wrap gutter relative py-20 md:py-28">
        <p className="display text-[clamp(2.5rem,9vw,8rem)]">{footerTitle}</p>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-lg">
          <li><a className="underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a></li>
          <li><a className="underline underline-offset-4" href={contact.linkedin}>LinkedIn</a></li>
          <li><a className="underline underline-offset-4" href={contact.github}>GitHub</a></li>
          <li><a className="underline underline-offset-4" href={contact.resume}>Resume</a></li>
        </ul>
        <p className="label mt-16 opacity-70">© {new Date().getFullYear()} Jin Kim</p>
      </div>
    </footer>
  );
}
