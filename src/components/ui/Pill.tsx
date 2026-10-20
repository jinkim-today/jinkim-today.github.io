import type { ReactNode } from "react";

type Tone = "onBlue" | "onLight";

/** Plain uppercase tags joined with " · ". No pill, no outline. */
export function Tags({
  items,
  tone = "onLight",
}: {
  items: string[];
  tone?: Tone;
}) {
  return (
    <span
      className={`label ${tone === "onBlue" ? "text-cream/70" : "text-muted"}`}
    >
      {items.join(" · ")}
    </span>
  );
}

/** Small colored dot + text status. No pill. */
export function Status({
  children,
  tone = "onLight",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`label inline-flex items-center gap-2 ${
        tone === "onBlue" ? "text-cream/70" : "text-muted"
      }`}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-current"
        style={{ color: tone === "onBlue" ? "#7CFFB2" : "#16a34a" }}
      />
      {children}
    </span>
  );
}
