"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { contact, siteTitle } from "@/content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tone = scrolled
    ? "bg-bg text-fg"
    : "bg-transparent text-cream";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${tone}`}
    >
      <nav
        aria-label="Primary"
        className="wrap gutter flex h-16 items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <rect x="1" y="1" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="5" y="5" width="8" height="8" fill="currentColor" />
          </svg>
          {siteTitle}
        </Link>
        <div className="flex items-center gap-4 text-base sm:gap-6">
          <Link href="/about/" className="hover:underline underline-offset-4">About</Link>
          <Link href="/#projects" className="hover:underline underline-offset-4">Projects</Link>
          <a
            href={contact.resume}
            className="hover:underline underline-offset-4 max-[420px]:hidden"
          >
            Resume
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
