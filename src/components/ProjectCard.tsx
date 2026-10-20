import Image from "next/image";
import Link from "next/link";
import { Headline } from "@/components/Headline";
import { Pill } from "@/components/ui/Pill";
import type { Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="group block h-full overflow-hidden rounded-lg border border-line bg-card"
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-line">
        <Image
          src={project.cover}
          alt={`${project.title} cover`}
          width={1600}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight underline-offset-4 decoration-2 group-hover:underline">
            {project.title}
          </h3>
          <span className="label text-muted">{project.year}</span>
        </div>
        <p className="mt-3 text-base text-muted">
          <Headline text={project.headline} />
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>
    </Link>
  );
}
