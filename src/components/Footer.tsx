import { contact, footerTitle } from "@/content/site";

export function Footer() {
  const l = "underline underline-offset-4 decoration-1 hover:decoration-2 hover:text-accent";
  return (
    <footer className="bg-fg text-bg">
      <div className="wrap gutter py-20 md:py-28">
        <p className="display text-[clamp(2.5rem,8vw,7rem)]">{footerTitle}</p>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-base font-medium">
          <li><a className={l} href={`mailto:${contact.email}`}>{contact.email}</a></li>
          <li><a className={l} href={contact.linkedin}>LinkedIn</a></li>
          <li><a className={l} href={contact.github}>GitHub</a></li>
        </ul>
        <p className="label mt-16 opacity-60">© 2026 Jin Kim</p>
      </div>
    </footer>
  );
}
