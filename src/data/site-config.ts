// ============================================================================
// Site Configuration — MarcusLab
// ============================================================================
// One place for navigation, SEO, hero copy and footer settings.
// Edit this file to change the shell of the site without touching components.
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
  /** Two-digit index used for the editorial navigation styling. */
  index: string;
}

export interface HeroCharacter {
  /** Toggle the illustrated character in the hero. */
  enabled: boolean;
  /** Replace with your own licensed artwork when you have it. */
  image: string;
  alt: string;
  name: string;
  label: string;
  /** Shown on the artwork card — useful for credit or licence notes. */
  note: string;
}

export interface HeroConfig {
  eyebrow: string;
  titleIntro: string;
  titleName: string;
  subtitle: string;
  description: string;
  status: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  character: HeroCharacter;
}

export interface FooterConfig {
  tagline: string;
  statement: string;
  copyright: string;
  builtWith: string;
}

export interface SiteConfig {
  name: string;
  url: string;
  tagline: string;
  navigation: NavItem[];
  hero: HeroConfig;
  footer: FooterConfig;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const siteUrl = "https://marcuslab.in";

const navigation: NavItem[] = [
  { label: "Home", href: "#home", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Projects", href: "#projects", index: "03" },
  { label: "Technologies", href: "#technologies", index: "04" },
  { label: "Beyond Code", href: "#beyond", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
];

const hero: HeroConfig = {
  eyebrow: "Welcome to my digital universe",
  titleIntro: "Hey, I’m",
  titleName: "Marcus.",
  subtitle: "I turn ideas into digital reality.",
  description:
    "Developer. Creator. Technology enthusiast. Always building something new.",
  status: "Currently building Watch Later",
  primaryCta: { label: "Explore My Projects", href: "#projects" },
  secondaryCta: { label: "Get to Know Me", href: "#about" },
  character: {
    enabled: true,
    image: "/images/character/avatar.jpg",
    alt: "MarcusLab avatar — anime-inspired pirate adventurer with straw hat",
    name: "Marcus Scout",
    label: "AI-generated avatar",
    note: "AI AVATAR",
  },
};

export const siteConfig: SiteConfig = {
  name: "MarcusLab",
  url: siteUrl,
  tagline: "Building ideas. Creating possibilities.",
  navigation,
  hero,
  footer: {
    tagline:
      "A digital universe for the things I build, the things I’m learning, and the things still taking shape.",
    statement: "Building ideas. Creating possibilities.",
    copyright: "© Marcus Scout · MarcusLab. All rights reserved.",
    builtWith: "Next.js · Three.js · TypeScript · Tailwind CSS",
  },
  seo: {
    title: "Marcus Scout — Building Ideas. Creating Possibilities.",
    description:
      "The digital universe of Marcus Scout — a developer and creator building websites, Android applications, 3D experiences and AI experiments. Explore live projects, the real stacks behind them and the story beyond the code.",
    keywords: [
      "MarcusLab",
      "Marcus Scout",
      "Marcus",
      "developer portfolio",
      "creative developer",
      "web developer",
      "Android applications",
      "React Native",
      "Expo",
      "Astro",
      "game development",
      "artificial intelligence",
      "Next.js",
      "Three.js",
      "React Three Fiber",
      "anime-inspired design",
    ],
  },
};

export function getFooterCopyright(): string {
  return siteConfig.footer.copyright;
}

export default siteConfig;
