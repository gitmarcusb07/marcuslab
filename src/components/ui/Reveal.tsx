"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds before the entrance starts once the element is visible. */
  delay?: number;
  /** Vertical offset in pixels. */
  y?: number;
  /** Replay the entrance when the element leaves and re-enters the viewport. */
  once?: boolean;
}

/**
 * Lightweight scroll entrance built on IntersectionObserver + CSS transforms.
 * This replaces the previous GSAP ScrollTrigger implementation: no animation
 * library on the critical path, no per-element ticker, and every animated
 * property is compositor-friendly.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add("is-visible");
            if (once) observer.unobserve(element);
          } else if (!once) {
            element.classList.remove("is-visible");
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, reducedMotion]);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-delay": `${delay}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
