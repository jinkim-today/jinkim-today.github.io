import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getPosts } from "@/lib/content";

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
    robots: { index: false },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  return (
    <article className="wrap gutter pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <Link href="/blog/" className="label underline-offset-4 hover:underline">
          ← All posts
        </Link>
        <p className="label mt-8 text-muted">{p.date}</p>
        <h1 className="display mt-3 text-[clamp(2rem,5vw,3.5rem)]">{p.title}</h1>
        <div className="case-body mt-10">
          <MDXRemote source={p.body} />
        </div>
      </div>
    </article>
  );
}
