"use client";

import { useRef, type ReactNode } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Wraps a CTA with a subtle magnetic pull on fine pointers. */
export function Magnetic({ children, className, strength = 0.22 }: MagneticProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();

  const enabled = finePointer && !reducedMotion;

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (!enabled || !wrapRef.current || !innerRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength * 0.8;
    innerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleLeave = () => {
    if (!innerRef.current) return;
    innerRef.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <span
      ref={wrapRef}
      className={cn("inline-flex", className)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <span
        ref={innerRef}
        className="inline-flex transition-transform duration-300 ease-out will-change-transform"
      >
        {children}
      </span>
    </span>
  );
}
