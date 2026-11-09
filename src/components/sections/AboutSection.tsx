"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { profile } from "@/data/profile";
import { OrbitalMark } from "@/components/ui/OrbitalMark";

export default function AboutSection() {
  const facts = profile.facts;

  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-lines absolute inset-0 z-0 opacity-35"
      />
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 z-0 opacity-30"
      />

      <div className="shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait column */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="group relative">
              <div className="absolute inset-0 rounded-[2rem] border border-white/70 bg-white shadow-card" />
              <TiltCard
                max={5}
                className="relative h-[400px] w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-card sm:h-[460px]"
              >
                <Image
                  src={profile.portrait}
                  alt={profile.portraitAlt}
                  width={720}
                  height={720}
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />
                <div className="mono absolute left-5 top-5 rounded-full border border-white/30 bg-navy/55 px-3 py-1.5 text-[0.56rem] font-semibold tracking-[0.16em] text-paper shadow-sm backdrop-blur-sm">
                  {profile.portraitNote}
                </div>
              </TiltCard>
              <div
                aria-hidden="true"
                className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,121,31,0.2),transparent_68%)]"
              />
              <div
                aria-hidden="true"
                className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(22,139,255,0.18),transparent_68%)]"
              />
            </div>
          </div>

          {/* Content column */}
          <div className="order-1 space-y-9 lg:order-2 lg:col-span-7">
            <SectionHeading
              index="02"
              eyebrow="About me"
              title="THE PERSON BEHIND THE BUILDS."
              description="The story, the philosophy, and the things that keep the ideas moving."
              tone="light"
              align="left"
            />

            <Reveal className="space-y-6">
              <p className="pretty text-base leading-7 text-navy/90 sm:text-lg">
                {profile.intro}
              </p>
              {profile.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className="pretty text-base leading-7 text-navy/90 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-3 grid gap-5 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-navy/10 bg-white/70 p-6 shadow-card transition-colors duration-300 hover:border-orange/30">
                  <div className="mb-3 flex items-center gap-3">
                    <OrbitalMark className="h-6 w-6" />
                    <h3 className="mono text-[0.66rem] font-bold tracking-[0.18em] text-navy">
                      Philosophy
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-muted">
                    {profile.philosophy}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-navy/10 bg-white/70 p-6 shadow-card transition-colors duration-300 hover:border-blue/30">
                  <div className="mb-3 flex items-center gap-3">
                    <OrbitalMark className="h-6 w-6" />
                    <h3 className="mono text-[0.66rem] font-bold tracking-[0.18em] text-navy">
                      Current focus
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-muted">
                    {profile.currentFocus}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="mono text-[0.66rem] font-bold tracking-[0.18em] text-navy">
                    Highlights
                  </h3>
                  <span className="h-px w-8 bg-navy/10" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-navy/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-navy/70 transition-colors duration-200 hover:border-orange/40 hover:text-orange"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="grid gap-4 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-[1.25rem] border border-navy/10 bg-white/70 p-5 shadow-card transition-colors duration-300 hover:border-orange/30"
                  >
                    <p className="mono mb-2 text-[0.56rem] tracking-[0.16em] text-muted/70">
                      {fact.label}
                    </p>
                    <p className="text-sm font-semibold leading-6 text-navy">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
