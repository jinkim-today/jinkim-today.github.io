import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Reveal } from "@/components/home/Reveal";
import { siteTitle } from "@/content/site";
import { getAdjacentPost, getPost, getPosts } from "@/lib/content";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: {
      type: "article",
      title: `${p.title} | ${siteTitle}`,
      description: p.summary,
      url: `/blog/${p.slug}/`,
      publishedTime: p.date,
      images: [{ url: "/og/default.png", width: 1200, height: 630 }],
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const { prev, next } = getAdjacentPost(p.slug);
  const links = [
    { label: "Previous", post: prev, align: "" },
    { label: "Next", post: next, align: "md:text-right" },
  ];

  return (
    <article className="wrap-home gutter pb-24 pt-28 md:pt-36">
      <Link href="/blog/" className="text-sm font-medium text-mute hover:text-accent">
        &larr; Writing
      </Link>
      <p className="mt-8 text-sm tabular-nums text-mute">{p.date}</p>
      <h1 className="m-0 mt-3 max-w-[22ch] text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
        {p.title}
      </h1>
      {p.summary && <p className="mt-5 max-w-3xl text-[1.25rem] text-mute">{p.summary}</p>}

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

      {(prev || next) && (
        <nav aria-label="More articles" className="mt-20">
          <div className="grid grid-cols-1 border-t border-rule md:grid-cols-2 md:gap-8">
            {links.map(({ label, post, align }) =>
              post ? (
                <Link
                  key={label}
                  href={`/blog/${post.slug}/`}
                  className={`group block py-8 md:py-12 ${align}`}
                >
                  <span className="label text-mute">{label}</span>
                  <span className="mt-2 block text-2xl font-extrabold leading-tight tracking-[-0.02em] group-hover:text-accent md:text-3xl">
                    {post.title}
                  </span>
                </Link>
              ) : (
                <span key={label} aria-hidden className="hidden md:block" />
              ),
            )}
          </div>
        </nav>
      )}
    </article>
  );
}
