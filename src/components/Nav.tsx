"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { contact, siteTitle } from "@/content/site";

const link = "underline-offset-4 decoration-2 hover:underline";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-bg text-fg transition-colors duration-200 ${
        scrolled ? "border-rule" : "border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="wrap gutter flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          {siteTitle}
        </Link>
        <div className="flex items-center gap-3 text-sm font-medium sm:gap-6 sm:text-base">
          <Link href="/about/" className={`${link} max-[520px]:hidden`}>About</Link>
          <Link href="/#projects" className={link}>Projects</Link>
          <Link href="/#writing" className={link}>Writing</Link>
          <Link href="/portfolio/" className={link}>Portfolio</Link>
          <a href={contact.resume} className={`${link} max-[420px]:hidden`}>Resume</a>
        </div>
      </nav>
    </header>
  );
}
