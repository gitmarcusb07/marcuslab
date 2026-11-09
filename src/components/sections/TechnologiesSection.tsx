"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Marquee } from "@/components/ui/Marquee";
import { technologyCategories, getAllTechnologies } from "@/data/technologies";
import { OrbitalMark } from "@/components/ui/OrbitalMark";
import { cn } from "@/lib/utils";

const ACCENT_COLORS: Record<string, string> = {
  orange: "#FF791F",
  blue: "#168BFF",
  red: "#EF4148",
  navy: "#101C2D",
};

export default function TechnologiesSection() {
  const allTech = getAllTechnologies();

  return (
    <section
      id="technologies"
      className="section-pad relative overflow-hidden bg-navy"
    >
      <div
        aria-hidden="true"
        className="grid-lines-light absolute inset-0 z-0 opacity-25"
      />
      <div
        aria-hidden="true"
        className="dot-grid-light absolute inset-0 z-0 opacity-20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(255,121,31,0.12),transparent_45%),radial-gradient(ellipse_at_85%_75%,rgba(22,139,255,0.12),transparent_45%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 z-0 hidden h-[720px] w-[720px] -translate-x-1/2 rounded-full border border-dashed border-blue/10 spin-slow md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 z-0 hidden h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-orange/10 spin-slow md:block"
        style={{ animationDirection: "reverse", animationDuration: "48s" }}
      />

      <div className="shell relative z-10">
        <SectionHeading
          index="04"
          eyebrow="Toolbox"
          title="MY DIGITAL TOOLBOX."
          description={
            <>
              The tools behind the work — from the stack that runs this site to
              the ones shaping live projects. No vanity scores, just the
              technologies I actually reach for.
            </>
          }
          tone="dark"
          align="center"
        />

        <Reveal delay={0.08} className="mt-10 sm:mt-12">
          <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/[0.035] py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <Marquee
              items={allTech.map((tech) => tech.name)}
              duration={72}
              itemClassName="mono text-[0.56rem] font-semibold tracking-[0.24em] text-paper/35"
            />
          </div>
        </Reveal>

        <Reveal className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:gap-7">
          {technologyCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Reveal>

        <Reveal delay={0.22} className="mt-12 lg:mt-16">
          <div className="group rounded-[2rem] border border-white/60 bg-white p-8 text-center shadow-card hover-lift md:p-10">
            <div className="mb-4 inline-flex items-center gap-2">
              <OrbitalMark className="h-7 w-7" />
              <p className="mono text-[0.62rem] tracking-[0.18em] text-navy/55">
                {allTech.length} tools in rotation
              </p>
            </div>
            <p className="mx-auto max-w-xl text-base leading-7 text-navy/85 sm:text-lg">
              Every item above is part of this portfolio&apos;s stack or a real
              project&apos;s toolchain. I add to this list as I ship with
              something new.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
}: {
  category: (typeof technologyCategories)[number];
}) {
  const accent = ACCENT_COLORS[category.accent] ?? "#168BFF";

  return (
    <TiltCard
      max={2.2}
      className={cn(
        "h-full rounded-[1.75rem]",
        category.span === "full" && "md:col-span-2",
      )}
    >
      <div className="group h-full rounded-[1.75rem] border border-white/50 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-[0_26px_60px_-28px_rgba(0,0,0,0.45)] md:p-9">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <OrbitalMark className="h-9 w-9" />
            <div>
              <p className="mono mb-1 text-[0.58rem] font-bold tracking-[0.16em] text-navy/45">
                {category.eyebrow}
              </p>
              <h3 className="text-2xl font-bold leading-tight text-navy">
                {category.title}
              </h3>
            </div>
          </div>
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.1rem] border border-navy/10"
            style={{ backgroundColor: `${accent}10` }}
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: accent }}
            />
          </div>
        </div>

        <p className="mb-7 text-sm leading-6 text-muted sm:text-base">
          {category.description}
        </p>

        <div
          className={cn(
            "grid grid-cols-4 gap-2.5 sm:grid-cols-5",
            category.span === "full" ? "lg:grid-cols-8" : "lg:grid-cols-6",
          )}
        >
          {category.technologies.map((tech) => {
            const techAccent =
              ACCENT_COLORS[tech.accent ?? category.accent] ?? "#168BFF";

            return (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                title={tech.name}
                aria-label={`${tech.name} — opens in a new tab`}
                className="group/tech relative flex min-h-[50px] items-center justify-center rounded-xl border px-2 py-2.5 text-[0.74rem] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm focus-visible:-translate-y-0.5"
                style={{
                  borderColor: `${techAccent}38`,
                  backgroundColor: `${techAccent}0d`,
                  color: techAccent,
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-navy px-2.5 py-1.5 text-[0.5rem] font-semibold tracking-[0.08em] text-paper opacity-0 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover/tech:-translate-y-0.5 group-hover/tech:opacity-100 group-focus-visible/tech:-translate-y-0.5 group-focus-visible/tech:opacity-100"
                >
                  {tech.name}
                </span>
                {tech.mark}
              </a>
            );
          })}
        </div>
      </div>
    </TiltCard>
  );
}
