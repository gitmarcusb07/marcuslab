"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github, Play } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";
import {
  projectFilters,
  getProjectsByCategory,
  getProjectCount,
  type Project,
  type ProjectPreviewPhone,
} from "@/data/projects";

type FilterValue = (typeof projectFilters)[number]["value"];

const STATUS_CONFIG: Record<
  Project["status"],
  { label: string; accent: string; surface: string }
> = {
  live: {
    label: "Live",
    accent: "#ff791f",
    surface: "border-orange/25 bg-orange/[0.07] text-orange",
  },
  published: {
    label: "Published",
    accent: "#168bff",
    surface: "border-blue/25 bg-blue/[0.07] text-blue",
  },
  "in-progress": {
    label: "In Progress",
    accent: "#ef4148",
    surface: "border-red/25 bg-red/[0.07] text-red",
  },
};

const ACCENTS: Record<string, string> = {
  orange: "#ff791f",
  blue: "#168bff",
  red: "#ef4148",
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const filtered = getProjectsByCategory(activeFilter);

  const handleFilter = useCallback((value: FilterValue) => {
    setActiveFilter(value);
  }, []);

  return (
    <section id="projects" className="section-pad relative overflow-hidden">
      <div aria-hidden="true" className="grid-lines absolute inset-0 z-0 opacity-30" />
      <div aria-hidden="true" className="dot-grid absolute inset-0 z-0 opacity-30" />

      <div className="shell relative z-10">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title="THINGS I'VE BUILT."
          description={
            <>
              A curated collection of ideas, experiments and digital products
              brought to life — with real project screenshots and the actual
              stacks behind each build.
            </>
          }
          tone="light"
          align="left"
        />

        <Reveal className="mt-10 sm:mt-12">
          <div className="animated-separator" />
        </Reveal>

        {/* Filters — a tidy 2×2 grid on phones, a single row from sm up. */}
        <Reveal className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {projectFilters.map((filter) => {
            const isActive = activeFilter === filter.value;
            const count = getProjectCount(filter.value);

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => handleFilter(filter.value)}
                aria-pressed={isActive}
                className={`
                  flex touch-manipulation items-center justify-center gap-2 rounded-full border px-4 py-2.5
                  text-[0.78rem] font-semibold transition-all duration-300 sm:px-5
                  ${
                    isActive
                      ? "border-orange bg-orange text-navy shadow-[0_14px_32px_-16px_rgba(255,121,31,0.65)]"
                      : "border-navy/12 bg-white/60 text-muted hover:border-orange/40 hover:text-orange"
                  }
                `}
              >
                {filter.label}
                <span
                  className={`mono text-[0.52rem] ${
                    isActive ? "text-navy/55" : "text-navy/30"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-7">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}

          {filtered.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-navy/10 bg-white text-2xl text-navy/20">
                ·
              </div>
              <p className="mt-5 text-sm text-muted">
                No projects in this category yet.
              </p>
            </div>
          ) : null}
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
}) {
  const status = STATUS_CONFIG[project.status];
  const accent = ACCENTS[project.accent] ?? ACCENTS.blue;
  const isWide = project.layout !== "standard";
  const categoryLabel =
    project.category === "websites"
      ? "Website"
      : project.category === "applications"
        ? "Application"
        : "In progress";

  return (
    <Reveal
      delay={Math.min(index * 0.06, 0.18)}
      className={cn("group relative h-full", isWide && "lg:col-span-2")}
    >
      <TiltCard
        max={4.5}
        className="h-full rounded-[1.6rem] border border-navy/[0.07] bg-white shadow-[0_20px_50px_-32px_rgba(16,28,45,0.35)] transition-colors duration-300 group-hover:border-orange/30"
      >
        <div
          className={cn(
            "project-card flex h-full flex-col",
            isWide && "lg:grid lg:grid-cols-[1.08fr_0.92fr]",
          )}
        >
          {/* Preview */}
          <div
            className={cn(
              "relative aspect-[16/11] overflow-hidden bg-navy/[0.04]",
              isWide && "lg:aspect-auto lg:h-full lg:min-h-[360px]",
            )}
            data-cursor-label={
              project.links.length > 0 ? "Open project" : "Preview"
            }
          >
            {project.preview.kind === "image" ? (
              <div className="image-reveal h-full">
                <Image
                  src={project.preview.src}
                  alt={project.preview.alt}
                  width={960}
                  height={660}
                  sizes={
                    isWide
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 54vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}

            {project.preview.kind === "phone" ? (
              <PhoneMockup preview={project.preview} accent={accent} />
            ) : null}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent opacity-60"
            />

            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/50 bg-white/85 px-2.5 py-1 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                {project.status === "live" ? (
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ backgroundColor: status.accent }}
                  />
                ) : null}
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: status.accent }}
                />
              </span>
              <span className="mono text-[0.5rem] font-bold tracking-[0.14em] text-navy">
                {status.label}
              </span>
            </div>

            {project.links.length > 0 ? (
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-white/40 text-navy shadow-sm backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white"
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
            ) : null}

            <span className="project-shine" aria-hidden="true" />
          </div>

          {/* Content */}
          <div
            className={cn(
              "flex flex-1 flex-col p-5 sm:p-6",
              isWide && "lg:justify-center lg:p-8 xl:p-9",
            )}
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="mono text-[0.48rem] font-semibold tracking-[0.16em] text-navy/35">
                {String(index + 1).padStart(2, "0")} / {categoryLabel}
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-navy/[0.08]"
              />
            </div>

            <h3 className="font-display text-[1.18rem] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[1.3rem]">
              {project.title}
            </h3>

            <p className="pretty mt-2.5 text-[0.84rem] leading-6 text-muted">
              {project.description}
            </p>

            {project.technologies && project.technologies.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-navy/[0.07] bg-navy/[0.035] px-2 py-1 text-[0.58rem] font-medium text-navy/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}

            {project.note ? (
              <p className="mt-3 text-[0.68rem] italic leading-5 text-muted/65">
                {project.note}
              </p>
            ) : null}

            <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-5">
              {project.links.length > 0 ? (
                project.links.map((link) => {
                  const isExternal = link.type !== "github";
                  const Icon =
                    link.type === "github"
                      ? Github
                      : link.type === "playstore"
                        ? Play
                        : ExternalLink;

                  return (
                    <a
                      key={`${link.type}-${link.href}`}
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex touch-manipulation items-center justify-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.68rem] font-bold transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        borderColor: `${accent}40`,
                        color: accent,
                        backgroundColor: `${accent}0d`,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.label}
                    </a>
                  );
                })
              ) : (
                <span className="inline-flex items-center rounded-full border border-navy/10 bg-navy/[0.03] px-3.5 py-2 text-[0.64rem] font-medium text-muted">
                  Coming soon
                </span>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function PhoneMockup({
  preview,
  accent,
}: {
  preview: ProjectPreviewPhone;
  accent: string;
}) {
  return (
    <div className="phone-stage relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#1c3450_0%,#0a1420_75%)] px-5 py-5">
      <div
        aria-hidden="true"
        className="absolute -left-10 top-6 h-32 w-32 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle, ${accent}66, transparent 70%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 -right-6 h-36 w-36 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(255,121,31,0.55), transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="phone-device relative flex h-[86%] max-h-[330px] aspect-[9/18.5] flex-col overflow-hidden rounded-[1.55rem] border border-white/20 bg-navy p-[3px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)]">
          <div className="relative flex-1 overflow-hidden rounded-[1.32rem] bg-navy-deep">
            <Image
              src={preview.src}
              alt={preview.alt}
              fill
              sizes="(max-width: 640px) 34vw, 170px"
              className="object-cover object-top"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[1.32rem] bg-gradient-to-t from-navy/25 via-transparent to-white/[0.06] ring-1 ring-inset ring-white/10"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute -left-3 -top-3 flex h-11 w-11 items-center justify-center overflow-hidden rounded-[0.9rem] border border-white/25 bg-navy shadow-[0_14px_30px_-10px_rgba(0,0,0,0.87)]"
        >
          <Image
            src={preview.icon}
            alt=""
            width={44}
            height={44}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {preview.note ? (
        <span className="mono absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-navy/50 px-2.5 py-1 text-[0.42rem] tracking-[0.12em] text-paper/45 backdrop-blur-sm">
          {preview.note}
        </span>
      ) : null}
    </div>
  );
}
