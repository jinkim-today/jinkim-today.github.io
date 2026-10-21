"use client";

import { useEffect, useRef, useState } from "react";

/** Copies the email address; label flips to "Copied ->" for 1.5s. Falls back to mailto if clipboard is unavailable. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-blue px-5 py-3 font-mono text-base font-medium text-cream transition-colors duration-200 hover:bg-fg hover:text-bg"
    >
      <span aria-live="polite">{copied ? "Copied ->" : "Copy email"}</span>
    </button>
  );
}
