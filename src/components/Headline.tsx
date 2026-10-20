import { Fragment } from "react";

// Renders **bold** segments from frontmatter headlines.
export function Headline({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}
