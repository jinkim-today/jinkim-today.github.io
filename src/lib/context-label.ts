const contextTags: Record<string, string> = {
  photobyme: "FOUNDED & SOLD",
  "happyhour-map": "PERSONAL",
  "chatgpt-followup-assistant": "PERSONAL",
  "intelliworks-factory-erp": "MY CONSULTANCY",
  "client-ai-implementation": "SDI · CLIENT WORK",
  "hermes-slack-agents": "SDI · CLIENT WORK",
  "realtor-ai-platform": "SDI · SOLE BUILDER",
  "ai-chat-interior-app": "SDI · SOLE BUILDER",
};

/** Mono context line, e.g. `[01] 2026 · SDI · SOLE BUILDER`. `order` is 1-based position. */
export function contextLabel(p: { slug: string; year: number }, order: number) {
  return `[${String(order).padStart(2, "0")}] ${p.year} · ${contextTags[p.slug] ?? "PROJECT"}`;
}
