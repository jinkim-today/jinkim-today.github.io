import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ProofRow } from "@/components/home/ProofRow";
import { ProjectList } from "@/components/home/ProjectList";
import { Writing } from "@/components/home/Writing";
import { Experience } from "@/components/home/Experience";
import { Education } from "@/components/home/Education";
import { Contact } from "@/components/home/Contact";
import { contact, siteDescription, siteTitle, siteUrl } from "@/content/site";
import { getPosts, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: `${siteTitle} | Forward-deployed & AI engineer` },
  description: siteDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  const projects = getProjects();
  const latest = getPosts().slice(0, 3);

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteTitle,
    url: siteUrl,
    email: contact.email,
    jobTitle: "AI & Forward Deployed Engineer",
    worksFor: { "@type": "Organization", name: "SDI Creative Technologies" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Simon Fraser University" },
    sameAs: [contact.linkedin, contact.github],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <div className="wrap-home gutter">
        <Hero />
        <ProofRow />
        <ProjectList projects={projects} />
        <Writing posts={latest} />
        <Experience />
        <Education />
        <Contact />
      </div>
    </>
  );
}
