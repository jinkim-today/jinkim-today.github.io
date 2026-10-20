import type { ReactNode } from "react";

export function Pill({
  children,
  tone = "onLight",
}: {
  children: ReactNode;
  tone?: "onBlue" | "onLight";
}) {
  const color =
    tone === "onBlue"
      ? "border-cream/60 text-cream"
      : "border-line text-muted";
  return (
    <span
      className={`label inline-flex items-center rounded-full border px-3 py-1 ${color}`}
    >
      {children}
    </span>
  );
}
