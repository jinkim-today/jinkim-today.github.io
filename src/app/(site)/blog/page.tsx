import type { Metadata } from "next";
import { PostItem } from "@/components/PostItem";
import { Reveal } from "@/components/home/Reveal";
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
    <div className="wrap-home gutter pb-28 pt-28 md:pt-36">
      <h1 className="h1-hero m-0">Writing</h1>
      <p className="mt-5 max-w-2xl text-[1.25rem] text-mute">{writingSubline}</p>
      <div className="mt-14 border-t border-rule">
        {posts.map((p) => (
          <Reveal key={p.slug}>
            <PostItem post={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
