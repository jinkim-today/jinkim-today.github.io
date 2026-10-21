import type { Metadata } from "next";
import { PostItem } from "@/components/PostItem";
import { Reveal } from "@/components/ui/Reveal";
import { writingSubline } from "@/content/site";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: writingSubline,
  alternates: { canonical: "/blog/" },
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <header className="bg-blue text-cream">
        <div className="wrap gutter pb-14 pt-32 md:pb-20 md:pt-40">
          <Reveal onMount>
            <p className="label text-cream/70">{"// "}Writing</p>
          </Reveal>
          <Reveal onMount delay={0.08} y={24}>
            <h1 className="display mt-3 text-[clamp(2.5rem,7vw,6rem)]">Writing</h1>
          </Reveal>
          <Reveal onMount delay={0.16} y={16}>
            <p className="mt-6 max-w-2xl text-cream/70">{writingSubline}</p>
          </Reveal>
        </div>
      </header>
      <div className="wrap gutter py-14 md:py-20">
        <ul className="grid grid-cols-1 gap-1">
          {posts.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 0.06} y={24}>
                <PostItem post={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
