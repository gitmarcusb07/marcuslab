"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      data-cursor-label="Top"
      className={`group fixed bottom-5 left-5 right-auto z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-navy/90 text-paper shadow-[0_12px_35px_-12px_rgba(16,28,45,0.7)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange/50 hover:bg-navy sm:bottom-7 sm:left-auto sm:right-7 sm:h-12 sm:w-12 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="absolute inset-1 rounded-full border border-paper/[0.06]" />
      <ArrowUp
        size={16}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
