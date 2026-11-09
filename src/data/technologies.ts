// ============================================================================
// Technologies — MarcusLab
// ============================================================================
// Every tool below is verified in this portfolio or in one of the real project
// folders on Marcus's machine:
//
//   • Hikmah Noor  — Astro, TypeScript, Tailwind CSS, MDX, Fuse.js,
//                    Cloudflare Pages + D1.
//   • Marcivo      — React, Vite, TypeScript, Tailwind CSS, Express,
//                    Cloudflare Workers/Pages, TMDB + AniList.
//   • Quran Wall   — Expo, React Native, TypeScript, Kotlin, Skia,
//                    Reanimated, SQLite, Cloudflare R2.
//   • Watch Later  — Expo, React Native, TypeScript, Supabase, Clerk,
//                    TanStack Query, Zustand, SQLite/MMKV.
//
// `mark` is the short monogram shown on the interactive tile.
// `span` lets a category take the full width of the toolbox grid.
// ============================================================================

export interface Technology {
  name: string;
  mark: string;
  url?: string;
  accent?: "orange" | "blue" | "red" | "navy";
}

export interface TechnologyCategory {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: "code" | "layout" | "orbit" | "rocket";
  accent: "orange" | "blue" | "red" | "navy";
  span?: "half" | "full";
  technologies: Technology[];
}

export const technologyCategories: TechnologyCategory[] = [
  {
    id: "languages",
    title: "Languages",
    eyebrow: "The syntax layer",
    description: "The fundamentals behind every build, from typed web code to SQL.",
    icon: "code",
    accent: "orange",
    technologies: [
      {
        name: "TypeScript",
        mark: "TS",
        url: "https://www.typescriptlang.org/",
        accent: "blue",
      },
      {
        name: "JavaScript",
        mark: "JS",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        accent: "orange",
      },
      {
        name: "HTML",
        mark: "H5",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        accent: "orange",
      },
      {
        name: "CSS",
        mark: "C3",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        accent: "blue",
      },
      {
        name: "SQL",
        mark: "SQL",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/SQL",
        accent: "navy",
      },
      {
        name: "Kotlin",
        mark: "KT",
        url: "https://kotlinlang.org/",
        accent: "red",
      },
      {
        name: "Kotlin",
        mark: "KT",
        url: "https://kotlinlang.org/",
        accent: "red",
      },
    ],
  },
  {
    id: "frontend",
    title: "Web & Mobile",
    eyebrow: "The visible layer",
    description: "The frameworks behind the live sites and the apps in this portfolio.",
    icon: "layout",
    accent: "blue",
    technologies: [
      {
        name: "React",
        mark: "Re",
        url: "https://react.dev/",
        accent: "blue",
      },
      {
        name: "Next.js",
        mark: "N",
        url: "https://nextjs.org/",
        accent: "navy",
      },
      {
        name: "Astro",
        mark: "A",
        url: "https://astro.build/",
        accent: "orange",
      },
      {
        name: "React Native",
        mark: "RN",
        url: "https://reactnative.dev/",
        accent: "blue",
      },
      {
        name: "Expo",
        mark: "EX",
        url: "https://expo.dev/",
        accent: "navy",
      },
      {
        name: "Tailwind CSS",
        mark: "TW",
        url: "https://tailwindcss.com/",
        accent: "blue",
      },
    ],
  },
  {
    id: "motion",
    title: "3D & Motion",
    eyebrow: "The living layer",
    description: "Depth, movement and the micro-interactions that make an interface feel alive.",
    icon: "orbit",
    accent: "red",
    technologies: [
      {
        name: "Three.js",
        mark: "3D",
        url: "https://threejs.org/",
        accent: "orange",
      },
      {
        name: "React Three Fiber",
        mark: "R3F",
        url: "https://docs.pmnd.rs/react-three-fiber",
        accent: "blue",
      },
      {
        name: "Drei",
        mark: "DR",
        url: "https://github.com/pmndrs/drei",
        accent: "blue",
      },
      {
        name: "GSAP",
        mark: "GS",
        url: "https://gsap.com/",
        accent: "orange",
      },
      {
        name: "Framer Motion",
        mark: "FM",
        url: "https://www.framer.com/motion/",
        accent: "red",
      },
      {
        name: "Reanimated",
        mark: "RA",
        url: "https://docs.swmansion.com/react-native-reanimated/",
        accent: "blue",
      },
    ],
  },
  {
    id: "data",
    title: "Backend & Data",
    eyebrow: "The engine layer",
    description: "Services, stores and edge runtimes that keep the products running.",
    icon: "code",
    accent: "navy",
    technologies: [
      {
        name: "Node.js",
        mark: "ND",
        url: "https://nodejs.org/",
        accent: "navy",
      },
      {
        name: "Express",
        mark: "EP",
        url: "https://expressjs.com/",
        accent: "orange",
      },
      {
        name: "Supabase",
        mark: "SB",
        url: "https://supabase.com/",
        accent: "red",
      },
      {
        name: "SQLite",
        mark: "SQ",
        url: "https://sqlite.org/",
        accent: "blue",
      },
      {
        name: "Cloudflare Workers",
        mark: "CW",
        url: "https://workers.cloudflare.com/",
        accent: "orange",
      },
      {
        name: "Cloudflare D1",
        mark: "D1",
        url: "https://developers.cloudflare.com/d1/",
        accent: "orange",
      },
      {
        name: "Cloudflare R2",
        mark: "R2",
        url: "https://developers.cloudflare.com/r2/",
        accent: "blue",
      },
    ],
  },
  {
    id: "ship",
    title: "Build & Ship",
    eyebrow: "The delivery layer",
    description: "The toolchain that takes a build from localhost to real people.",
    icon: "rocket",
    accent: "navy",
    span: "full",
    technologies: [
      {
        name: "Git",
        mark: "GT",
        url: "https://git-scm.com/",
        accent: "orange",
      },
      {
        name: "GitHub",
        mark: "GH",
        url: "https://github.com/gitmarcusb07",
        accent: "navy",
      },
      {
        name: "Vite",
        mark: "VT",
        url: "https://vite.dev/",
        accent: "blue",
      },
      {
        name: "Cloudflare Pages",
        mark: "CP",
        url: "https://pages.cloudflare.com/",
        accent: "orange",
      },
      {
        name: "Render",
        mark: "RD",
        url: "https://render.com/",
        accent: "navy",
      },
      {
        name: "Vercel",
        mark: "V",
        url: "https://vercel.com/",
        accent: "blue",
      },
      {
        name: "Google Play",
        mark: "GP",
        url: "https://play.google.com/",
        accent: "red",
      },
      {
        name: "Android",
        mark: "AN",
        url: "https://www.android.com/",
        accent: "orange",
      },
    ],
  },
];

export function getAllTechnologies(): Technology[] {
  return technologyCategories.flatMap((category) => category.technologies);
}

export default technologyCategories;
