"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * A small custom cursor for desktop. The native cursor is restored for touch
 * devices and visitors who prefer reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const ringRefPosition = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = mounted && finePointer && !reducedMotion;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor");

    const handlePointerMove = (event: PointerEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const interactive = target.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]",
      );
      const labelled = target.closest<HTMLElement>("[data-cursor-label]");
      setHovering(Boolean(interactive));
      setLabel(labelled?.dataset.cursorLabel ?? "");
    };

    const handlePointerLeave = () => {
      targetRef.current = { x: -100, y: -100 };
      ringRefPosition.current = { x: -100, y: -100 };
    };

    const animate = () => {
      ringRefPosition.current.x +=
        (targetRef.current.x - ringRefPosition.current.x) * 0.16;
      ringRefPosition.current.y +=
        (targetRef.current.y - ringRefPosition.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringRefPosition.current.x}px, ${ringRefPosition.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setHovering(false);
      setLabel("");
    }
  }, [enabled]);

  if (!enabled) return null;

  const hasLabel = Boolean(label);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-blue/65 bg-blue/[0.03] backdrop-blur-[1px] transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{
          width: hasLabel ? 74 : hovering ? 48 : 34,
          height: hasLabel ? 74 : hovering ? 48 : 34,
          marginLeft: hasLabel ? -37 : hovering ? -24 : -17,
          marginTop: hasLabel ? -37 : hovering ? -24 : -17,
          borderColor: hasLabel ? "rgba(255,121,31,0.7)" : undefined,
          backgroundColor: hasLabel ? "rgba(16,28,45,0.72)" : undefined,
          willChange: "transform",
        }}
      >
        {label ? (
          <span
            ref={labelRef}
            className="mono text-[0.5rem] font-medium tracking-[0.1em] text-paper"
          >
            {label}
          </span>
        ) : null}
      </div>

      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-orange shadow-[0_0_14px_rgba(255,121,31,0.8)] transition-opacity duration-200"
        style={{
          marginLeft: -3,
          marginTop: -3,
          opacity: hasLabel ? 0 : 1,
          willChange: "transform",
        }}
      />
    </div>
  );
}
