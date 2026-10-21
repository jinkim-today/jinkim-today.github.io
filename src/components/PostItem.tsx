import Link from "next/link";
import type { Post } from "@/lib/content";

/** Whole-item link; hover inverts to blue bg with cream text. */
export function PostItem({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group flex h-full flex-col rounded-lg bg-card p-5 transition-colors duration-150 hover:bg-blue hover:text-cream focus-visible:bg-blue focus-visible:text-cream md:p-6"
    >
      <span className="label opacity-70">{post.date}</span>
      <span className="mt-4 block text-2xl font-normal leading-tight tracking-tight">
        {post.title}
      </span>
      {post.summary && <span className="mt-3 block text-base opacity-70">{post.summary}</span>}
      <span className="mt-6 inline-flex items-center gap-2 pt-2 font-mono text-base font-medium">
        Read
        <span
          aria-hidden
          className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5"
        >
          -&gt;
        </span>
      </span>
    </Link>
  );
}
