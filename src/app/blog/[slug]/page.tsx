import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MotionH2, MotionP, MotionUl } from "@/components/ui/MotionProse";
import { Reveal } from "@/components/ui/Reveal";
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
    { label: "< Prev", post: prev, align: "" },
    { label: "Next >", post: next, align: "md:text-right" },
  ];

  return (
    <article>
      <header className="bg-blue text-cream">
        <div className="wrap gutter pb-14 pt-32 md:pb-20 md:pt-40">
          <Reveal onMount>
            <Link href="/blog/" className="label px-0.5 transition-colors duration-150 hover:bg-cream hover:text-ink">
              &lt; All articles
            </Link>
          </Reveal>
          <Reveal onMount delay={0.08} y={24}>
            <p className="label mt-8 opacity-70">{p.date}</p>
          </Reveal>
          <Reveal onMount delay={0.12} y={24}>
            <h1 className="display mt-3 max-w-[22ch] text-[clamp(2.25rem,6vw,5rem)]">{p.title}</h1>
          </Reveal>
          {p.summary && (
            <Reveal onMount delay={0.2} y={24}>
              <p className="mt-6 max-w-3xl text-xl text-cream/80 md:text-2xl">{p.summary}</p>
            </Reveal>
          )}
        </div>
      </header>

      <div className="wrap gutter py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          {p.summary_kr && (
            <Reveal>
              <aside className="rounded-lg bg-card p-5 md:p-6" lang="ko">
                <p className="label text-muted">요약</p>
                <p className="mt-2 text-base">{p.summary_kr}</p>
              </aside>
            </Reveal>
          )}
          <div className="case-body mt-6">
            <MDXRemote
              source={p.body}
              components={{ h2: MotionH2, p: MotionP, ul: MotionUl }}
            />
          </div>
        </div>
      </div>

      {(prev || next) && (
        <nav aria-label="More articles" className="bg-card">
          <div className="wrap gutter grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-8">
            {links.map(({ label, post, align }) =>
              post ? (
                <Link
                  key={label}
                  href={`/blog/${post.slug}/`}
                  className={`group block py-8 md:py-12 ${align}`}
                >
                  <span className="label text-muted">{label}</span>
                  <span className="mt-2 block text-2xl font-medium tracking-tight md:text-4xl">
                    <span className="-mx-1 px-1 transition-colors duration-150 group-hover:bg-fg group-hover:text-bg">
                      {post.title}
                    </span>
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
