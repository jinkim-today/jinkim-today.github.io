import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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
  tags: string[];
  order: number;
  featured: boolean;
  summary_kr: string;
  body: string;
};

const dir = path.join(process.cwd(), "content", "projects");

export function plainHeadline(h: string) {
  return h.replace(/\*\*/g, "");
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
        tags: data.tags ?? [],
        order: data.order ?? 999,
        featured: Boolean(data.featured),
        summary_kr: data.summary_kr ?? "",
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
