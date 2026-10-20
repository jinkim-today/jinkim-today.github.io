import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { getProjects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about/`, changeFrequency: "monthly", priority: 0.6 },
    ...getProjects().map((p) => ({
      url: `${siteUrl}/projects/${p.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
