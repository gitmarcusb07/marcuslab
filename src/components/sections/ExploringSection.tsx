"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  currentlyExploring,
  explorationStatusLabels,
  explorationStatusColors,
} from "@/data/interests";
import { Package, Brain, Rocket, Hammer, Mouse, Gamepad2 } from "lucide-react";

const EXPLORATION_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  cube: Package,
  brain: Brain,
  rocket: Rocket,
  hammer: Hammer,
  mouse: Mouse,
  gamepad: Gamepad2,
};

export default function ExploringSection() {
  return (
    <section id="exploring" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 z-0 grid-lines opacity-30" />

      <div className="shell relative z-10">
        <SectionHeading
          index="04b"
          eyebrow="Currently exploring"
          title="ALWAYS LEARNING. ALWAYS BUILDING."
          description={
            <>
              A living list of what has my attention right now — what I&apos;m
              learning, building and poking at next.
            </>
          }
          tone="light"
          align="left"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-18">
          {currentlyExploring.map((exploration) => (
            <ExplorationCard key={exploration.id} exploration={exploration} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExplorationCard({ exploration }: { exploration: (typeof currentlyExploring)[number] }) {
  const Icon = EXPLORATION_ICONS[exploration.icon] ?? Package;
  const color = explorationStatusColors[exploration.status];
  const label = explorationStatusLabels[exploration.status];

  return (
    <Reveal className="group p-6 md:p-7 rounded-[1.5rem] border border-navy/10 bg-white shadow-card hover-lift hover:border-orange/40 hover:shadow-[0_20px_40px_-15px_rgba(16,28,45,0.12)] transition-all duration-400">
      <div className="flex items-start justify-between mb-5">
        <div className="w-11 h-11 rounded-[1rem] flex items-center justify-center border border-navy/8" style={{ backgroundColor: `${color}10` }}>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <span
          className="text-[0.6rem] font-bold text-navy/60 tracking-widest uppercase border px-2.5 py-0.5 rounded"
          style={{ borderColor: `${color}40`, color }}
        >
          {label}
        </span>
      </div>
      <h3 className="text-lg font-bold text-navy mb-2 leading-tight group-hover:text-orange transition-colors duration-300">
        {exploration.title}
      </h3>
      <p className="text-sm text-muted/85 leading-6">{exploration.description}</p>
    </Reveal>
  );
}
