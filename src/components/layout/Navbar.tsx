"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { assetPath, cn, scrollToSection } from "@/lib/utils";

const NAV_LINKS = siteConfig.navigation;
const HOME_SECTION = "home";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(HOME_SECTION);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ticking = useRef(false);

  /* One rAF-throttled scroll listener. It only flips the glass state when the
     hero boundary is crossed, so the nav never re-renders per scroll frame. */
  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const hero = document.getElementById(HOME_SECTION);
      const threshold = hero ? Math.max(hero.offsetHeight - 160, 360) : 520;

      setScrolled(y > threshold);
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section via IntersectionObserver — no layout reads on scroll. */
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const link of NAV_LINKS) {
      const element = document.getElementById(link.href.slice(1));
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  /* Lock background scroll only while the mobile menu is open. */
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const goTo = (href: string) => {
    setMobileOpen(false);
    const id = href.slice(1);

    if (id === HOME_SECTION) {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      return;
    }

    scrollToSection(id);
  };

  const overDark = !scrolled || mobileOpen;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div
          className={cn(
            "transition-colors duration-500",
            scrolled && !mobileOpen ? "glass-nav" : "bg-transparent",
          )}
        >
          <div className="shell flex h-16 items-center justify-between md:h-20">
            {/* Brand */}
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                goTo("#home");
              }}
              className="group flex items-center gap-3"
              aria-label="MarcusLab — home"
            >
              <span
                className={cn(
                  "relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[0.95rem] transition-all duration-300 md:h-12 md:w-12",
                  overDark
                    ? "border border-paper/15 bg-paper/10 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.7)]"
                    : "border border-navy/10 bg-white shadow-[0_10px_25px_-14px_rgba(16,28,45,0.5)]",
                )}
              >
                <Image
                  src={assetPath("/images/logo.png")}
                  alt=""
                  width={48}
                  height={48}
                  priority
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span
                className={cn(
                  "mono text-[0.76rem] font-bold tracking-[0.22em] transition-colors duration-300 sm:text-[0.82rem]",
                  overDark ? "text-paper" : "text-navy",
                )}
              >
                MARCUSLAB<span className="text-orange">.</span>
              </span>
            </a>

            {/* Desktop navigation */}
            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Primary"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(link.href);
                    }}
                    className={cn(
                      "group relative px-3.5 py-2 text-[0.82rem] font-medium transition-colors duration-300",
                      overDark
                        ? isActive
                          ? "text-paper"
                          : "text-paper/60 hover:text-paper"
                        : isActive
                          ? "text-navy"
                          : "text-muted hover:text-navy",
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-[1.5px] origin-left rounded-full bg-gradient-to-r from-orange to-blue transition-transform duration-300",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={cn(
                "relative z-[110] flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 md:hidden",
                overDark
                  ? "border-paper/15 bg-paper/10 text-paper"
                  : "border-navy/10 bg-white/80 text-navy",
              )}
            >
              <span aria-hidden="true" className="relative block h-4 w-6">
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-6 rounded-full bg-current transition-all duration-300 ease-out",
                    mobileOpen ? "top-[7px] rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[7px] h-[1.5px] w-6 rounded-full bg-current transition-all duration-300 ease-out",
                    mobileOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-6 rounded-full bg-current transition-all duration-300 ease-out",
                    mobileOpen ? "top-[7px] -rotate-45" : "top-[14px]",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={cn(
          "fixed inset-0 z-[99] md:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          tabIndex={mobileOpen ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-navy transition-opacity duration-500",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "hero-mesh pointer-events-none absolute inset-0 transition-opacity duration-700",
            mobileOpen ? "opacity-50" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "relative z-10 flex h-full flex-col justify-center px-6 pb-10 pt-24 transition-opacity duration-300 sm:px-10",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <p className="mono mb-6 text-[0.58rem] tracking-[0.3em] text-paper/35">
            Navigation
          </p>
          <div>
            {NAV_LINKS.map((link, index) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    goTo(link.href);
                  }}
                  className={cn(
                    "group flex items-baseline gap-4 border-b border-paper/10 py-4 transition-all duration-500",
                    mobileOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0",
                  )}
                  style={{
                    transitionDelay: mobileOpen ? `${120 + index * 55}ms` : "0ms",
                  }}
                >
                  <span className="mono w-6 text-[0.58rem] text-orange/60">
                    {link.index}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[2rem] font-bold leading-none tracking-[-0.04em] transition-colors duration-300 sm:text-4xl",
                      isActive
                        ? "text-orange"
                        : "text-paper group-hover:text-orange",
                    )}
                  >
                    {link.label}
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 -translate-x-1 translate-y-1 text-paper/25 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-orange" />
                </a>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                goTo("#contact");
              }}
              className="mono text-[0.6rem] tracking-[0.2em] text-paper/45 transition-colors hover:text-orange"
            >
              MARCUSLAB.IN
            </a>
            <span className="mono text-[0.6rem] tracking-[0.2em] text-paper/25">
              MARCUSLAB<span className="text-orange">.</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
