/**
 * Brand and application constants for MarcusLab portfolio
 */

export const BRAND_COLORS = {
  orange: '#FF791F',
  electricBlue: '#168BFF',
  white: '#F7F9FC',
  red: '#EF4148',
  lightBg: '#F2F6FB',
  deepNavy: '#101C2D',
  secondaryNavy: '#172B43',
  mutedText: '#73849A',
} as const;

export type BrandColor = keyof typeof BRAND_COLORS;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
} as const;

export type AnimationSpeed = keyof typeof ANIMATION_DURATION;

export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  projects: 'projects',
  technologies: 'technologies',
  beyondCode: 'beyond-code',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
