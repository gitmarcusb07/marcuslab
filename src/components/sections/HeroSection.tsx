"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { TiltCard } from "@/components/ui/TiltCard";
import HeroCanvasWrapper, {
  supportsWebGLCheck,
} from "@/components/hero/HeroCanvas";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

const {
  eyebrow,
  titleIntro,
  titleName,
  subtitle,
  description,
  status,
  primaryCta,
  secondaryCta,
  character,
} = siteConfig.hero;

const DISCIPLINES = ["Websites", "Android apps", "Experiments"];

/** Verified stack chips that float around the avatar. */
const ORBIT_CHIPS = [
  {
    name: "Next.js",
    accent: "#FF791F",
    position: "-left-3 top-[12%] sm:-left-5",
    delay: "0ms",
  },
  {
    name: "TypeScript",
    accent: "#168BFF",
    position: "-right-3 top-[26%] sm:-right-5",
    delay: "820ms",
  },
  {
    name: "Expo",
    accent: "#EF4148",
    position: "-left-4 bottom-[22%] max-sm:hidden sm:-left-7",
    delay: "1640ms",
  },
  {
    name: "Three.js",
    accent: "#168BFF",
    position: "-right-2 bottom-[10%] max-sm:hidden sm:-right-4",
    delay: "2460ms",
  },
];

export default function HeroSection() {
  const [webglAvailable, setWebglAvailable] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWebglAvailable(supportsWebGLCheck());
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const rect = event.currentTarget.getBoundingClientRect();
    spotlight.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    spotlight.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  const resetSpotlight = () => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;
    spotlight.style.removeProperty("--spot-x");
    spotlight.style.removeProperty("--spot-y");
  };

  const show3D = isDesktop && webglAvailable;

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetSpotlight}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy pb-8 pt-20 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-24"
    >
      {/* 3D canvas — desktop only, paused when off-screen. */}
      {show3D ? (
        <div className="absolute inset-0 z-0">
          <HeroCanvasWrapper />
        </div>
      ) : null}

      {/* Lightweight atmosphere for mobile and no-WebGL desktops. */}
      <div aria-hidden="true" className="hero-mesh absolute inset-0 z-[1]" />
      <div
        aria-hidden="true"
        className="grid-lines-light absolute inset-0 z-[2] opacity-[0.18]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(10,20,32,0.35)_0%,rgba(10,20,32,0.1)_35%,rgba(10,20,32,0.55)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_18%_35%,rgba(255,121,31,0.16),transparent_42%),radial-gradient(ellipse_at_78%_62%,rgba(22,139,255,0.14),transparent_46%)]"
      />
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="hero-spotlight z-[3]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[4] bg-gradient-to-r from-navy via-navy/85 to-transparent lg:via-navy/60"
      />

      <div className="shell relative z-10 w-full">
        <div className="grid items-center gap-6 sm:gap-12 lg:grid-cols-12 lg:gap-6">
          {/* Copy */}
          <div className="order-1 text-center lg:order-1 lg:col-span-7 lg:text-left">
            <div
              className="hero-enter flex items-center justify-center gap-2.5 lg:justify-start"
              style={{ "--hero-delay": "0ms" } as React.CSSProperties}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
              </span>
              <span className="mono text-[0.58rem] font-semibold tracking-[0.26em] text-orange sm:text-[0.64rem]">
                {eyebrow}
              </span>
            </div>

            <h1
              className="hero-enter display mt-5 text-[clamp(3.2rem,12vw,4.6rem)] text-paper sm:mt-6 sm:text-[clamp(4rem,9vw,6.2rem)] lg:text-[clamp(4.4rem,7.4vw,7.6rem)]"
              style={{ "--hero-delay": "90ms" } as React.CSSProperties}
            >
              <span className="block">{titleIntro}</span>
              <span className="mt-1 block text-gradient-warm pb-1 lg:mt-0">
                {titleName}
              </span>
            </h1>

            <p
              className="hero-enter mx-auto mt-5 max-w-[34rem] text-[1.02rem] font-medium leading-7 tracking-[-0.01em] text-blue-soft/90 sm:mt-6 sm:text-[1.18rem] lg:mx-0 lg:text-[1.28rem]"
              style={{ "--hero-delay": "180ms" } as React.CSSProperties}
            >
              {subtitle}
            </p>

            <p
              className="hero-enter pretty mx-auto mt-3 max-w-[30rem] text-[0.92rem] leading-6 text-paper/55 sm:text-[0.98rem] sm:leading-7 lg:mx-0"
              style={{ "--hero-delay": "250ms" } as React.CSSProperties}
            >
              {description}
            </p>

            <div
              className="hero-enter mt-6 flex justify-center lg:justify-start"
              style={{ "--hero-delay": "320ms" } as React.CSSProperties}
            >
              <span className="status-pill border border-orange/25 bg-orange/[0.08] text-orange">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
                </span>
                {status}
              </span>
            </div>

            <div
              className="hero-enter mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
              style={{ "--hero-delay": "390ms" } as React.CSSProperties}
            >
              <Magnetic strength={0.22}>
                <a
                  href={primaryCta.href}
                  className="button-primary w-full justify-center sm:w-auto"
                  onClick={(event) => {
                    if (primaryCta.href === "#home") {
                      event.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Magnetic>

              <Magnetic strength={0.18}>
                <a
                  href={secondaryCta.href}
                  className="button-dark w-full justify-center sm:w-auto"
                  onClick={(event) => {
                    if (secondaryCta.href === "#home") {
                      event.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  {secondaryCta.label}
                  <Mail className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>

            <div
              className="hero-enter mt-8 hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:flex lg:justify-start"
              style={{ "--hero-delay": "460ms" } as React.CSSProperties}
            >
              {DISCIPLINES.map((item, index) => (
                <span
                  key={item}
                  className={cn(
                    "mono flex items-center gap-2 text-[0.55rem] tracking-[0.2em] text-paper/35",
                    index > 0 &&
                      "before:h-1 before:w-1 before:rounded-full before:bg-paper/20",
                  )}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="order-2 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
            <div
              className="hero-enter relative w-[min(58vw,215px)] sm:w-[300px] lg:w-full lg:max-w-[390px]"
              style={{ "--hero-delay": "240ms" } as React.CSSProperties}
            >
              <div
                aria-hidden="true"
                className="absolute -inset-12 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,121,31,0.24),transparent_62%)]"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_70%_75%,rgba(22,139,255,0.2),transparent_58%)]"
              />

              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2.5rem] border border-paper/10 sm:-inset-5"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-6 animate-spin-slow rounded-[2.8rem] border border-dashed border-paper/15 sm:-inset-7"
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange shadow-[0_0_20px_rgba(255,121,31,0.9)]" />
                <span className="absolute bottom-0 right-[18%] h-1.5 w-1.5 rounded-full bg-blue shadow-[0_0_16px_rgba(22,139,255,0.9)]" />
              </div>

              {ORBIT_CHIPS.map((chip) => (
                <span
                  key={chip.name}
                  className={cn(
                    "floating-chip absolute z-20 flex items-center gap-1.5 rounded-full border bg-navy/80 px-2 py-1 text-[0.46rem] font-semibold tracking-[0.04em] text-paper/85 shadow-[0_12px_28px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md sm:px-2.5 sm:py-1.5 sm:text-[0.54rem]",
                    chip.position,
                  )}
                  style={
                    {
                      "--chip-delay": chip.delay,
                      borderColor: `${chip.accent}55`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: chip.accent }}
                  />
                  {chip.name}
                </span>
              ))}

              <div className="animate-float-slow">
                <TiltCard
                  max={5}
                  className="rounded-[2rem] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]"
                >
                  <div className="relative overflow-hidden rounded-[2rem] border border-paper/20 bg-paper/[0.07] p-2 backdrop-blur-sm">
                    <div className="relative overflow-hidden rounded-[1.6rem] bg-[#f1e2c9]">
                      <div className="aspect-[4/5]">
                        <Image
                          src={character.image}
                          alt={character.alt}
                          width={720}
                          height={720}
                          priority
                          sizes="(max-width: 1024px) 62vw, 390px"
                          className="h-full w-full object-cover object-[50%_28%]"
                        />
                      </div>

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 ring-1 ring-inset ring-navy/15"
                      />

                      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-paper/30 bg-navy/55 px-2.5 py-1 backdrop-blur-md">
                        <span className="h-1 w-1 rounded-full bg-orange" />
                        <span className="mono text-[0.48rem] font-semibold tracking-[0.18em] text-paper/80">
                          AVATAR / 001
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                        <div>
                          <p className="mono text-[0.46rem] tracking-[0.2em] text-orange/90">
                            MARCUSLAB
                          </p>
                          <p className="font-display text-[1.35rem] font-bold leading-none tracking-[-0.04em] text-paper">
                            The captain<span className="text-orange">.</span>
                          </p>
                        </div>
                        <span className="mono rounded-full border border-paper/20 bg-paper/10 px-2 py-1 text-[0.44rem] tracking-[0.14em] text-paper/55">
                          {character.note}
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/30 transition-colors duration-300 hover:text-orange lg:flex"
      >
        <span className="mono text-[0.5rem] tracking-[0.24em]">SCROLL</span>
        <span className="flex h-8 w-5 justify-center rounded-full border border-current pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-current animate-[scroll-dot_2s_ease-in-out_infinite]" />
        </span>
      </a>

      {/* Seam into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-24 bg-gradient-to-b from-transparent to-navy-deep/80"
      />
    </section>
  );
}
