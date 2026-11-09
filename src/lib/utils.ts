/**
 * Small shared utilities for MarcusLab.
 */

type ClassValue = string | number | null | undefined | false;

/** Conditionally join class names. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Smoothly scroll to a section while respecting reduced-motion preferences. */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  element.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

/** Copy text to the clipboard with a legacy fallback. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

/** Safe external link attributes. */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export function formatCount(value: number, singular: string, plural?: string) {
  return `${value} ${value === 1 ? singular : (plural ?? `${singular}s`)}`;
}

/** Returns true when the viewport matches a mobile breakpoint. */
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/** Returns true when the browser can initialise a WebGL rendering context. */
export function supportsWebGL(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  const canvas = document.createElement("canvas");
  try {
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}
