"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { supportsWebGL } from "@/lib/utils";

/**
 * The Three.js scene is loaded only when it can actually be seen:
 *  - desktop-sized viewport with WebGL support;
 *  - not in reduced-motion mode;
 *  - hero currently intersecting the viewport.
 *
 * The Canvas frameloop pauses entirely when the hero is off-screen or the tab
 * is hidden, which is the single biggest mobile/laptop battery win on the site.
 */
const HeroCanvasDynamic = dynamic(
  async () => {
    const scene = await import("./HeroScene");
    return scene.HeroCanvas;
  },
  { loading: () => null, ssr: false },
);

export function supportsWebGLCheck(): boolean {
  return supportsWebGL();
}

export default function HeroCanvasWrapper() {
  const reducedMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    setWebglAvailable(supportsWebGL());
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px 0px 120px 0px", threshold: 0 },
    );
    observer.observe(host);

    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  if (reducedMotion || webglAvailable !== true) return null;

  return (
    <div ref={hostRef} className="absolute inset-0" aria-hidden="true">
      <Suspense fallback={null}>
        <HeroCanvasDynamic
          reducedMotion={reducedMotion}
          frameloop={inView && pageVisible ? "always" : "never"}
        />
      </Suspense>
    </div>
  );
}
