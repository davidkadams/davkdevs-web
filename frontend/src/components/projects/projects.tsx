import { ArrowUpRight, User, Users } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

const IMAGE_RATIO = 4 / 5;

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  imageAlt: string;
  link?: string;
};

const PROJECTS: Project[] = [
  {
    id: "personal-1",
    icon: User,
    iconLabel: "Personal Content",
    title: "@davkdevs",
    description: "Sharing athletics through videography. Unique Edits, Athlete Stories, and Fitness Content. Highlighting the journey of athletes and their stories through the lens of track and field.",
    meta: " Videographer · 2025 - Present",
    image: "/personal.jpg",
    imageAlt: "Personal content",
    link: "https://www.instagram.com/reel/DTGGsDckdtF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: "client-1",
    icon: Users,
    iconLabel: "Client Work",
    title: "KnicksNation",
    description: "Freelance video editor for KnicksNation. Creating short-form content for their Instagram and YouTube channels. Generated over 10 million views through game highlights, discussions, and high quality edits.",
    meta: "Video Editor · 2025 - Present",
    image: "/client-knicksnation.jpg",
    imageAlt: "Knicks Nation content",
    link: "https://www.instagram.com/reel/DZA8aJ-MR64/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
};

export function Projects({ withHeadline = false }: ProjectsProps): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              Work
            </h2>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="flex flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
            <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.iconLabel}
          </span>
        </header>

        <div
          className="relative w-full overflow-hidden rounded-2xl bg-foreground/5"
          style={{ aspectRatio: IMAGE_RATIO }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading={index < 2 ? "eager" : "lazy"}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[13px] tracking-tight text-foreground/30">
                Add image
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.title}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between px-1 pb-2">
          <p className="text-[12px] tracking-tight text-foreground/50">
            {project.meta}
          </p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-foreground/8 bg-foreground/4 px-3 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:bg-foreground/8"
            >
              View Content
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </article>
    </FadeIn>
  );
}
