"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { interests } from "@/data/interests";
import { OrbitalMark } from "@/components/ui/OrbitalMark";

const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  sparkles: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 3l1 9 9 1-6 7-7-6-7 6 7-7 1-9-9-1 6-7z" />
    </svg>
  ),
  gamepad: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 2c4 0 6 3 6 3s-2 3-6 3-6-3-6-3 2-3 6-3z" />
      <circle cx="7" cy="15" r="1" />
      <circle cx="17" cy="15" r="1" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="16" x2="16" y1="10" y2="14" />
    </svg>
  ),
  headphones: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M3 18v-6a9 9 0 0 1 9-9v0a9 9 0 0 1 9 9v6" />
      <path d="M3 21v-1a9 9 0 0 1 9-9v0a9 9 0 0 1 9 9v1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  ),
  compass: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <circle cx="12" cy="12" r="4" />
      <polygon points="12 2 8 12 12 22 16 12 12 2" />
    </svg>
  ),
};

const ACCENT_COLORS: Record<string, string> = {
  orange: "#FF791F",
  blue: "#168BFF",
  red: "#EF4148",
  navy: "#101C2D",
};

export default function BeyondSection() {
  return (
    <section id="beyond" className="section-pad relative overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0 grid-lines-light opacity-25" />
      <div className="absolute inset-0 z-0 dot-grid-light opacity-20" />

      <div className="shell relative z-10">
        <SectionHeading
          index="05"
          eyebrow="Beyond code"
          title="A LITTLE BEYOND TECHNOLOGY."
          description={
            <>
              Anime interests, hobbies, and the creative inspiration that feeds
              the builds.
            </>
          }
          tone="dark"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-18">
          {interests.map((interest) => (
            <InterestCard key={interest.id} interest={interest} />
          ))}
        </div>

        <Reveal delay={0.22} className="mt-16">
          <div className="p-9 rounded-[2rem] border border-white/60 bg-white text-center shadow-card hover-lift group">
            <div className="inline-flex items-center gap-2 mb-4">
              <OrbitalMark className="h-7 w-7 text-orange" />
              <p className="text-sm font-mono text-navy/60 tracking-widest uppercase mb-0">
                Fan note
              </p>
            </div>
            <p className="text-base sm:text-lg text-navy/90 leading-7 max-w-xl mx-auto">
              One Piece is the north star here — grand adventures, a crew worth
              believing in, and world-building that makes you want to build your
              own. <span className="block mt-3 text-orange font-medium">MarcusLab is not affiliated with One Piece or its rights holders.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InterestCard({ interest }: { interest: (typeof interests)[number] }) {
  const Icon = ICON_MAP[interest.icon];
  const accent = ACCENT_COLORS[interest.accent] ?? "#168BFF";

  return (
    <Reveal className="group p-7 rounded-[1.5rem] border border-white/50 bg-white shadow-card hover-lift hover:border-orange/50 transition-all duration-400">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="w-11 h-11 rounded-[1rem] flex items-center justify-center border border-white/60" style={{ backgroundColor: `${accent}10` }}>
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
        {interest.link && (
          <a
            href={interest.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-orange transition-colors duration-300"
            aria-label={`Open ${interest.link.label}`}
          >
            ↗
          </a>
        )}
      </div>
      <h3 className="text-lg font-bold text-navy mb-2 leading-tight">{interest.title}</h3>
      <p className="text-sm text-muted/80 leading-6">{interest.description}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {interest.tags.map((tag, index) => (
          <span key={index} className="px-2.5 py-1 rounded text-[0.6rem] font-medium border border-navy/8 bg-navy/4 text-navy/60">
            {tag}
          </span>
        ))}
      </div>
      {interest.disclaimer && (
        <p className="mt-4 text-[0.62rem] text-orange/70 mono italic leading-5">
          {interest.disclaimer}
        </p>
      )}
    </Reveal>
  );
}
