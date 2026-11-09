"use client";

import { ArrowRight, ExternalLink, Github, Mail } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

const CONTACT_EMAIL = profile.email;
const GITHUB_URL = socials.find((social) => social.platform === "github")?.url;

export default function ContactSection() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-lines absolute inset-0 z-0 opacity-30"
      />
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 z-0 opacity-20"
      />

      <div className="shell relative z-10">
        <SectionHeading
          index="06b"
          eyebrow="Contact"
          title="LET'S BUILD SOMETHING AMAZING."
          description="Have a project in mind, a question, or just want to say hello? Send a message — I'd love to hear from you."
          tone="light"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          <Reveal className="h-full">
            <div className="flex h-full flex-col justify-center rounded-[1.75rem] border border-navy/10 bg-white p-7 shadow-card sm:p-9">
              <div>
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.25rem] border border-orange/20 bg-orange/[0.06] shadow-sm">
                    <Mail className="h-5 w-5 text-orange" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy">Email</h3>
                    <p className="text-sm text-muted">
                      The best way to reach me.
                    </p>
                  </div>
                </div>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="break-all font-mono text-base text-orange underline decoration-orange/30 underline-offset-4 transition-colors duration-300 hover:text-orange/80 hover:decoration-orange sm:text-lg"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              {GITHUB_URL ? (
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-navy/10 bg-mist px-4 py-3.5 transition-colors duration-300 hover:border-orange/40 hover:bg-white"
                >
                  <span className="flex items-center gap-3">
                    <Github className="h-4 w-4 text-navy/70" />
                    <span className="text-sm font-semibold text-navy">
                      Or find me on GitHub
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-navy/35 transition-colors group-hover:text-orange" />
                </a>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[1.75rem] border border-navy bg-navy p-8 text-center shadow-float sm:p-11">
              <div
                aria-hidden="true"
                className="grid-lines-light absolute inset-0 opacity-25"
              />
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,121,31,0.28),transparent_68%)]"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(22,139,255,0.24),transparent_68%)]"
              />

              <div className="relative z-10">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-orange/30 bg-orange/10 shadow-[0_0_40px_rgba(255,121,31,0.22)]">
                  <ArrowRight className="h-6 w-6 text-orange" />
                </div>
                <h3 className="text-2xl font-bold leading-tight text-paper sm:text-3xl">
                  Ready to start something?
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-paper/55 sm:text-base">
                  A project, a collaboration, or an idea that needs a builder —
                  drop a line and let&apos;s figure it out together.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="button-primary mt-7 inline-flex items-center gap-2"
                >
                  Send an email
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
