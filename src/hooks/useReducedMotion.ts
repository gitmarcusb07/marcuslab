"use client";

import { usePrefersReducedMotion } from "./useMediaQuery";

/** Reactively returns true when the visitor prefers reduced motion. */
export function useReducedMotion(): boolean {
  return usePrefersReducedMotion();
}
