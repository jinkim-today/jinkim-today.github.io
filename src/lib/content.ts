import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Stat = { value: string; label: string; label_long?: string };

export type Project = {
  slug: string;
  title: string;
  year: number;
  role: string;
  org: string;
  status: string;
  link?: string;
  cover: string;
  accent: string;
  /** Contains **bold** markers around numbers. Use plainHeadline() for metadata. */
  headline: string;
  stats: Stat[];
  tags: string[];
  order: number;
  featured: boolean;
  summary_kr: string;
  keywords: string[];
  one_liner_kr: string;
  problem_fix?: { problem: string; fix: string };
  gallery?: string[];
  period: string;
  team: string;
  contribution: string;
  links: { label: string; url: string }[];
  body: string;
};

const dir = path.join(process.cwd(), "content", "projects");

export function plainHeadline(h: string) {
  return h.replace(/\*\*/g, "");
}

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
export function contextLabel(p: Pick<Project, "slug" | "year">, order: number) {
  return `[${String(order).padStart(2, "0")}] ${p.year} · ${contextTags[p.slug] ?? "PROJECT"}`;
}

export function getProjects(): Project[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      // confidential_notes is intentionally dropped here and never reaches the build output.
      return {
        slug: data.slug ?? file.replace(/\.mdx$/, ""),
        title: data.title,
        year: data.year,
        role: data.role,
        org: data.org,
        status: data.status,
        link: data.link,
        cover: data.cover,
        accent: data.accent ?? "#0A1FFF",
        headline: data.headline,
        stats: ((data.stats ?? []) as Stat[]).slice(0, 2),
        tags: data.tags ?? [],
        order: data.order ?? 999,
        featured: Boolean(data.featured),
        summary_kr: data.summary_kr ?? "",
        keywords: (data.keywords as string[] | undefined) ?? [],
        one_liner_kr: data.one_liner_kr ?? "",
        problem_fix: data.problem_fix as { problem: string; fix: string } | undefined,
        gallery: (data.gallery as string[] | undefined) ?? [],
        period: data.period ?? String(data.year),
        team: data.team ?? data.role,
        contribution: data.contribution ?? "",
        links: (data.links as { label: string; url: string }[] | undefined) ?? [],
        body: content,
      } satisfies Project;
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}

export function getAdjacent(slug: string) {
  const all = getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    prev: all[(i - 1 + all.length) % all.length],
    next: all[(i + 1) % all.length],
  };
}

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  summary_kr: string;
  tags: string[];
  draft: boolean;
  body: string;
};

const postsDir = path.join(process.cwd(), "content", "posts");

export function getPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
      const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
      return {
        slug: data.slug ?? file.replace(/\.mdx$/, ""),
        title: data.title,
        date,
        summary: data.summary ?? "",
        summary_kr: data.summary_kr ?? "",
        tags: data.tags ?? [],
        draft: data.draft === true,
        body: content,
      } satisfies Post;
    })
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

export function getAdjacentPost(slug: string) {
  const all = getPosts();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? all[i - 1] : undefined,
    next: i < all.length - 1 ? all[i + 1] : undefined,
  };
}
