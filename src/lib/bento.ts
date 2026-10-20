export type BentoSize = "feature" | "wide" | "small" | "full";

/**
 * Derive the card size from its index so any project count degrades gracefully:
 * feature, then repeating [wide, small, small] / [small, small, wide], last one full-low.
 */
export function bentoSize(index: number, total: number): BentoSize {
  if (index === 0) return "feature";
  if (total > 2 && index === total - 1) return "full";
  const j = index - 1;
  const g = Math.floor(j / 3);
  const k = j % 3;
  const wideAt = g % 2 === 0 ? 0 : 2;
  return k === wideAt ? "wide" : "small";
}
