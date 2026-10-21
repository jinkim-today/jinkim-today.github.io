"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { contact, siteTitle } from "@/content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > (pathname === "/" ? window.innerHeight * 0.6 : 24));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const tone = scrolled
    ? "bg-bg text-fg"
    : "bg-transparent text-cream";

  const link = `px-0.5 transition-colors duration-150 ${
    scrolled ? "hover:bg-fg hover:text-bg" : "hover:bg-cream hover:text-blue"
  }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${tone}`}
    >
      <nav
        aria-label="Primary"
        className="wrap gutter flex h-16 items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-medium tracking-tight">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <rect x="1" y="1" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="5" y="5" width="8" height="8" fill="currentColor" />
          </svg>
          {siteTitle}
        </Link>
        <div className="flex items-center gap-3 font-mono text-sm sm:gap-5 sm:text-base">
          <Link href="/about/" className={link}>About</Link>
          <Link href="/#projects" className={link}>Projects</Link>
          <a
            href={contact.resume}
            className={`${link} max-[420px]:hidden`}
          >
            Resume
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
