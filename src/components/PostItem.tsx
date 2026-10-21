import Link from "next/link";
import type { Post } from "@/lib/content";

/** Index row: date | title + summary. Hover underlines the title. */
export function PostItem({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group grid grid-cols-1 gap-2 border-b border-rule py-7 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8"
    >
      <span className="text-sm tabular-nums text-mute md:pt-2">{post.date}</span>
      <span>
        <span className="block text-2xl font-bold leading-tight tracking-[-0.02em] underline-offset-4 decoration-2 group-hover:underline">
          {post.title}
        </span>
        {post.summary && <span className="mt-2 block text-base text-mute">{post.summary}</span>}
      </span>
    </Link>
  );
}

