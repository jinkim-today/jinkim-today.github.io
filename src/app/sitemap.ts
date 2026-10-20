import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { getPosts, getProjects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about/`, changeFrequency: "monthly", priority: 0.6 },
    ...getPosts().map((p) => ({
      url: `${siteUrl}/blog/${p.slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
    ...getProjects().map((p) => ({
      url: `${siteUrl}/projects/${p.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
