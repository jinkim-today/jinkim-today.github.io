import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/ui/Reveal";
import { siteTitle, siteUrl } from "@/content/site";
import { getAdjacent, getProject, getProjects, plainHeadline } from "@/lib/content";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const description = plainHeadline(p.headline);
  return {
    title: p.title,
    description,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: {
      type: "article",
      title: `${p.title} | ${siteTitle}`,
      description,
      url: `/projects/${p.slug}/`,
      images: [{ url: p.cover }],
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const { prev, next } = getAdjacent(p.slug);

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: plainHeadline(p.headline),
    url: `${siteUrl}/projects/${p.slug}/`,
    dateCreated: String(p.year),
    author: { "@type": "Person", name: siteTitle, url: siteUrl },
    image: `${siteUrl}${p.cover}`,
  };

  const meta: [string, string][] = [
    ["Role", p.role],
    ["Org", p.org],
    ["Stack", p.tags.join(", ")],
    ["Year", String(p.year)],
    ["Status", p.status],
  ];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <header style={{ backgroundColor: p.accent }} className="text-cream">
        <div className="wrap gutter pb-14 pt-32 md:pb-20 md:pt-40">
          <Link href="/#projects" className="label underline-offset-4 hover:underline">
            ← All projects
          </Link>
          <h1 className="display mt-8 max-w-[20ch] text-[clamp(2.25rem,6.5vw,6rem)]">
            {p.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl md:text-2xl">
            <Headline text={p.headline} />
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-5">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="label opacity-70">{k}</dt>
                <dd className="mt-1 text-base">{v}</dd>
              </div>
            ))}
          </dl>
          {p.link && (
            <p className="mt-6">
              <a href={p.link} className="underline underline-offset-4">
                Visit {p.link.replace(/^https?:\/\//, "")} ↗
              </a>
            </p>
          )}
        </div>
      </header>

      <div className="wrap gutter py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <aside className="rounded-lg bg-card p-5 md:p-6" lang="ko">
              <p className="label text-muted">요약</p>
              <p className="mt-2 text-base">{p.summary_kr}</p>
            </aside>
          </Reveal>
          <div className="case-body mt-6">
            <MDXRemote source={p.body} />
          </div>
        </div>
      </div>

      <nav aria-label="More projects" className="bg-card">
        <div className="wrap gutter grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-8">
          {[
            { label: "Previous", project: prev, align: "" },
            { label: "Next", project: next, align: "md:text-right" },
          ].map(({ label, project, align }) => (
            <Link
              key={label}
              href={`/projects/${project.slug}/`}
              className={`group block py-8 md:py-12 ${align}`}
            >
              <span className="label text-muted">{label}</span>
              <span className="display mt-2 block text-2xl underline decoration-transparent decoration-2 underline-offset-2 transition-colors duration-200 group-hover:decoration-current md:text-4xl">
                {project.title}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}
