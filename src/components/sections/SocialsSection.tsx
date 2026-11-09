"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { socials, getLinkableSocials, getCopyableSocials } from "@/data/socials";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { copyToClipboard } from "@/lib/utils";

export default function SocialsSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (platform: string, username: string) => {
    const ok = await copyToClipboard(username);
    if (!ok) return;

    setCopied(platform);
    window.setTimeout(() => {
      setCopied((current) => (current === platform ? null : current));
    }, 1800);
  };

  const linkable = getLinkableSocials();
  const copyable = getCopyableSocials();

  return (
    <section id="socials" className="section-pad relative overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="grid-lines-light absolute inset-0 z-0 opacity-20"
      />
      <div
        aria-hidden="true"
        className="dot-grid-light absolute inset-0 z-0 opacity-20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(22,139,255,0.12),transparent_48%)]"
      />

      <div className="shell relative z-10">
        <SectionHeading
          index="06a"
          eyebrow="Socials"
          title="FIND ME ACROSS THE DIGITAL WORLD."
          description="Everywhere I show up online — profiles, playlists and the corners worth sharing. Discord is username-only; tap the card to copy the handle."
          tone="dark"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-18 lg:grid-cols-3">
          {linkable.map((social) => (
            <SocialCard
              key={social.platform}
              social={social}
              copied={copied === social.platform}
              onCopy={handleCopy}
            />
          ))}
          {copyable.map((social) => (
            <SocialCard
              key={social.platform}
              social={social}
              copied={copied === social.platform}
              onCopy={handleCopy}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialCard({
  social,
  copied,
  onCopy,
}: {
  social: (typeof socials)[number];
  copied: boolean;
  onCopy: (platform: string, username: string) => Promise<void>;
}) {
  const content = (
    <>
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/[0.05] text-orange transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-orange/30 group-hover:bg-orange/10"
        aria-hidden="true"
      >
        <SocialIcon platform={social.platform} className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold text-paper sm:text-2xl">
        {social.name}
      </h3>
      <p className="mono mt-1 text-[0.6rem] tracking-[0.16em] text-orange">
        {social.username}
      </p>
      <p className="mt-3 text-sm leading-6 text-paper/55">
        {social.description}
      </p>
      <span className="mono mt-6 flex items-center gap-1.5 text-[0.56rem] tracking-[0.14em] text-paper/35 transition-colors duration-300 group-hover:text-paper/70">
        {social.url ? (
          <>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Open profile
          </>
        ) : copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
            Username copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            Copy username
          </>
        )}
      </span>
    </>
  );

  const cardClass =
    "group flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange/45 hover:bg-white/[0.07] hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] md:p-10";

  if (social.url) {
    return (
      <Reveal className="h-full">
        <TiltCard max={3.6} className="h-full rounded-[1.5rem]">
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.ariaLabel}
            className={cardClass}
          >
            {content}
          </a>
        </TiltCard>
      </Reveal>
    );
  }

  return (
    <Reveal className="h-full">
      <TiltCard max={3.6} className="h-full rounded-[1.5rem]">
        <button
          type="button"
          onClick={() => void onCopy(social.platform, social.username)}
          aria-label={social.ariaLabel}
          className={cardClass}
        >
          {content}
        </button>
      </TiltCard>
    </Reveal>
  );
}
