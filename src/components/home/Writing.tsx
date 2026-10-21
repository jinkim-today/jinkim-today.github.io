import Link from "next/link";
import type { Post } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function Writing({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section id="writing" className="pt-24">
      <SectionHead index="02" title="Writing" />
      <Reveal>
        <div className="grid grid-cols-[minmax(0,1fr)] border-t border-rule md:grid-cols-3 md:gap-10">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="group block border-b border-rule py-6 md:border-b-0">
              <span className="label text-mute">{p.date}</span>
              <span className="mt-3 block text-xl font-bold leading-snug tracking-[-0.01em] group-hover:text-accent">
                {p.title}
              </span>
              {p.summary && <span className="mt-2 block text-base text-mute">{p.summary}</span>}
            </Link>
          ))}
        </div>
        <p className="mt-4">
          <Link href="/blog/" className="font-semibold underline-offset-4 hover:text-accent hover:underline">
            All articles →
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
