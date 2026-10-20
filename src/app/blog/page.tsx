import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  alternates: { canonical: "/blog/" },
  robots: { index: false },
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <div className="wrap gutter pb-20 pt-32 md:pb-28 md:pt-40">
      <p className="label text-muted">Blog</p>
      <h1 className="display h2-section mt-3">Notes</h1>
      <ul className="mt-12 max-w-3xl space-y-8">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}/`} className="group block">
              <span className="label text-muted">{p.date}</span>
              <span className="display mt-1 block text-2xl underline decoration-transparent decoration-2 underline-offset-2 transition-colors duration-200 group-hover:decoration-current md:text-3xl">
                {p.title}
              </span>
              {p.summary && <span className="mt-2 block text-muted">{p.summary}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
