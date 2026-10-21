import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Reveal } from "@/components/home/Reveal";
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
  const index = String(getProjects().findIndex((x) => x.slug === p.slug) + 1).padStart(2, "0");

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

  const facts: [string, string][] = [
    ["Period", p.period],
    ["Org", p.org],
    ["Role & team", p.team],
    ["Contribution", p.contribution],
    ["Stack", p.tags.join(", ")],
    ["Status", p.status],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <div className="wrap-home gutter pb-24 pt-28 md:pt-36">
        <div className="flex items-baseline gap-4">
          <span className="text-sm font-semibold tabular-nums text-accent">{index}</span>
          <Link href="/#projects" className="text-sm font-medium text-mute hover:text-accent">
            &larr; Projects
          </Link>
        </div>
        <h1 className="m-0 mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-none tracking-[-0.03em]">
          {p.title}
        </h1>
        {p.one_liner_kr && (
          <p className="mt-5 max-w-[48rem] text-[1.25rem] leading-snug text-mute" lang="ko">
            {p.one_liner_kr}
          </p>
        )}

        {p.stats.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-x-16 gap-y-8">
            {p.stats.map((s) => (
              <div key={s.value}>
                <div className="text-5xl font-extrabold leading-none tracking-[-0.03em] text-accent tabular-nums">
                  {s.value}
                </div>
                <p className="mt-2 max-w-[24ch] text-sm leading-snug text-mute">
                  {s.label_long ?? s.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <dl className="mt-14 grid grid-cols-1 border-t border-rule md:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
          {facts.map(([k, v]) => (
            <div key={k} className="border-b border-rule py-5">
              <dt className="label text-mute">{k}</dt>
              <dd className="m-0 mt-2 text-base">{v}</dd>
            </div>
          ))}
          {(p.links.length > 0 || p.link) && (
            <div className="border-b border-rule py-5">
              <dt className="label text-mute">Links</dt>
              <dd className="m-0 mt-2 flex flex-col gap-1 text-base">
                {(p.links.length > 0 ? p.links : [{ label: p.link!.replace(/^https?:\/\//, ""), url: p.link! }]).map(
                  (l) => (
                    <a key={l.url} href={l.url} className="underline underline-offset-4 hover:text-accent">
                      {l.label}
                    </a>
                  ),
                )}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-14 rounded-2xl bg-surface p-4 md:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.cover}
            alt={`${p.title} cover`}
            width={1600}
            height={1000}
            className="block h-auto w-full rounded-lg"
          />
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          {p.summary_kr && (
            <Reveal>
              <aside className="rounded-2xl bg-surface p-6 md:p-8" lang="ko">
                <p className="label m-0 text-mute">요약</p>
                <p className="mt-3 text-base">{p.summary_kr}</p>
              </aside>
            </Reveal>
          )}
          <div className="case-body mt-10">
            <MDXRemote source={p.body} />
          </div>
        </div>

        {p.gallery && p.gallery.length > 0 && (
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
            {p.gallery.map((src, i) => (
              <Reveal key={src}>
                <Image
                  src={src}
                  alt={`${p.title} screenshot ${i + 1}`}
                  width={1600}
                  height={1000}
                  unoptimized
                  className="h-auto w-full rounded-lg bg-surface"
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <nav aria-label="More projects" className="wrap-home gutter pb-24">
        <div className="grid grid-cols-1 border-t border-rule md:grid-cols-2 md:gap-8">
          {[
            { label: "Previous", project: prev, align: "" },
            { label: "Next", project: next, align: "md:text-right" },
          ].map(({ label, project, align }) => (
            <Link
              key={label}
              href={`/projects/${project.slug}/`}
              className={`group block py-8 md:py-12 ${align}`}
            >
              <span className="label text-mute">{label}</span>
              <span className="mt-2 block text-3xl font-extrabold leading-tight tracking-[-0.02em] group-hover:text-accent md:text-4xl">
                {project.title}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}
