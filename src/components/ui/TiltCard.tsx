"use client";

import { useRef, type ReactNode } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
}

/**
 * Mouse-driven 3D tilt with a soft light reflection. Pointer position is
 * written to CSS variables so React does not re-render on every move.
 */
export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    sceneRef.current.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    sceneRef.current.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    sceneRef.current.style.setProperty("--mx", `${x * 100}%`);
    sceneRef.current.style.setProperty("--my", `${y * 100}%`);
  };

  const handlePointerLeave = () => {
    if (!sceneRef.current) return;
    sceneRef.current.style.setProperty("--ry", "0deg");
    sceneRef.current.style.setProperty("--rx", "0deg");
    sceneRef.current.style.setProperty("--mx", "50%");
    sceneRef.current.style.setProperty("--my", "50%");
  };

  return (
    <div
      ref={sceneRef}
      className={cn("tilt-scene h-full", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="tilt-card relative h-full rounded-[inherit]">
        {children}
        <div className="tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
}
