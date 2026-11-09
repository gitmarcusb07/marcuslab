/**
 * GSAP animation preset configurations for MarcusLab portfolio.
 * These objects define animation parameters that components can spread
 * into GSAP's gsap.from() / gsap.to() calls.
 */

export interface AnimationPreset {
  duration: number;
  ease: string;
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  delay?: number;
}

export interface StaggerPreset {
  duration: number;
  ease: string;
  opacity: number;
  y: number;
  stagger: number;
}

export const fadeInUp: AnimationPreset = {
  duration: 0.8,
  ease: 'power3.out',
  opacity: 0,
  y: 40,
};

export const fadeInLeft: AnimationPreset = {
  duration: 0.8,
  ease: 'power3.out',
  opacity: 0,
  x: -40,
};

export const fadeInRight: AnimationPreset = {
  duration: 0.8,
  ease: 'power3.out',
  opacity: 0,
  x: 40,
};

export const scaleIn: AnimationPreset = {
  duration: 0.6,
  ease: 'back.out(1.7)',
  opacity: 0,
  scale: 0.85,
};

export const staggerChildren: StaggerPreset = {
  duration: 0.6,
  ease: 'power3.out',
  opacity: 0,
  y: 30,
  stagger: 0.1,
};

export const ANIMATION_PRESETS = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerChildren,
} as const;
