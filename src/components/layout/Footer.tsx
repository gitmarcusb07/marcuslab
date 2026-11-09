"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { getFooterCopyright, siteConfig } from "@/data/site-config";
import { socials } from "@/data/socials";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { copyToClipboard, scrollToSection } from "@/lib/utils";

export default function Footer() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (platform: string, username: string) => {
    const ok = await copyToClipboard(username);
    if (!ok) return;

    setCopied(platform);
    window.setTimeout(() => {
      setCopied((current) => (current === platform ? null : current));
    }, 1800);
  };

  const goTo = (href: string) => {
    const id = href.slice(1);
    if (id === "home") {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      return;
    }
    scrollToSection(id);
  };

  return (
    <footer className="relative overflow-hidden border-t border-navy/10 bg-paper">
      <div className="h-[2px] w-full bg-gradient-to-r from-orange via-blue to-orange" />
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-[0.16]"
      />

      <div className="shell relative py-14 pb-28 sm:py-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[0.95rem] border border-navy/10 bg-white shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="mono text-lg font-bold tracking-[0.18em] text-navy">
                MARCUSLAB<span className="text-orange">.</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted">
              {siteConfig.footer.tagline}
            </p>
            <p className="mono mt-5 text-[0.56rem] tracking-[0.18em] text-navy/35">
              Building ideas · Creating possibilities
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h2 className="mono text-[0.58rem] font-bold tracking-[0.2em] text-navy/45">
              Jump to
            </h2>
            <nav className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {siteConfig.navigation.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    goTo(link.href);
                  }}
                  className="w-fit text-sm text-muted transition-colors duration-200 hover:text-orange"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div className="md:col-span-5">
            <h2 className="mono text-[0.58rem] font-bold tracking-[0.2em] text-navy/45">
              Say hello
            </h2>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {socials.map((social) => {
                const isCopied = copied === social.platform;

                if (social.url) {
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className="group flex items-center gap-3 rounded-xl border border-navy/10 bg-white/70 px-3.5 py-2.5 transition-colors duration-200 hover:border-orange/40 hover:bg-white"
                    >
                      <SocialIcon
                        platform={social.platform}
                        className="h-4 w-4 shrink-0 text-navy/55 transition-colors group-hover:text-orange"
                      />
                      <span className="text-[0.78rem] font-semibold text-navy">
                        {social.name}
                      </span>
                      <span className="mono ml-auto min-w-0 max-w-[7rem] truncate text-[0.48rem] tracking-[0.12em] text-muted/70">
                        {social.username}
                      </span>
                      <ExternalLink
                        className="h-3.5 w-3.5 shrink-0 text-navy/20 transition-colors group-hover:text-orange"
                        aria-hidden="true"
                      />
                    </a>
                  );
                }

                return (
                  <button
                    key={social.platform}
                    type="button"
                    onClick={() => void handleCopy(social.platform, social.username)}
                    aria-label={social.ariaLabel}
                    className="group flex items-center gap-3 rounded-xl border border-navy/10 bg-white/70 px-3.5 py-2.5 text-left transition-colors duration-200 hover:border-orange/40 hover:bg-white"
                  >
                    <SocialIcon
                      platform={social.platform}
                      className="h-4 w-4 shrink-0 text-navy/55 transition-colors group-hover:text-orange"
                    />
                    <span className="text-[0.78rem] font-semibold text-navy">
                      {social.name}
                    </span>
                    <span className="mono ml-auto min-w-0 max-w-[7rem] truncate text-[0.48rem] tracking-[0.12em] text-muted/70">
                      {isCopied ? "Copied" : social.username}
                    </span>
                    {isCopied ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-orange" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 shrink-0 text-navy/20 transition-colors group-hover:text-orange" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-navy/10 pt-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-muted">{getFooterCopyright()}</p>
          <p className="text-xs text-muted/70">
            Built with {siteConfig.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
