import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { aboutSummary, contact } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jin Kim: fullstack and AI engineer based between Seoul and Vancouver.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <header className="bg-blue text-cream">
        <div className="wrap gutter pb-14 pt-32 md:pb-20 md:pt-40">
          <h1 className="display h1-hero">About</h1>
        </div>
      </header>
      <div className="wrap gutter py-14 md:py-20">
        <div className="max-w-2xl space-y-4">
          {aboutSummary.map((s) => (
            <p key={s}>{s}</p>
          ))}
          <p className="text-muted">Full resume summary and timeline coming soon.</p>
          <div className="pt-4">
            <Button href={contact.resume} tone="onLight">
              Resume (PDF)
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
