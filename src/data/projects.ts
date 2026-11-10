import { assetPath } from "@/lib/utils";

// ============================================================================
// Projects Data — MarcusLab
// ============================================================================
// The four projects below are the real projects supplied for this portfolio.
// Descriptions and stacks come from the actual project folders on Marcus's
// machine. Nothing here is demo content and no features, ratings or
// achievements have been invented.
//
// HOW TO ADD A PROJECT
// 1. Copy an existing object and give it a unique `id`.
// 2. Point `preview` at a real screenshot in /public/images/projects/.
// 3. Add only links and technologies you have verified.
// 4. `layout` controls its size in the grid: "feature" | "standard" | "wide".
// ============================================================================

export type ProjectCategory = "websites" | "applications" | "in-progress";
export type ProjectStatus = "live" | "published" | "in-progress";
export type ProjectLayout = "feature" | "standard" | "wide";
export type ProjectAccent = "orange" | "blue" | "red";

export interface ProjectLink {
  type: "website" | "github" | "playstore";
  label: string;
  href: string;
}

export interface ProjectPreviewImage {
  kind: "image";
  src: string;
  alt: string;
  note?: string;
}

export interface ProjectPreviewPhone {
  kind: "phone";
  src: string;
  alt: string;
  icon: string;
  note?: string;
}

export type ProjectPreview = ProjectPreviewImage | ProjectPreviewPhone;

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  statusLabel: string;
  preview: ProjectPreview;
  links: ProjectLink[];
  /** Only add tags you can verify. Empty arrays are intentionally hidden. */
  technologies?: string[];
  /** Shown as a tiny note under the actions when relevant. */
  note?: string;
  featured?: boolean;
  layout: ProjectLayout;
  accent: ProjectAccent;
  order: number;
}

export interface ProjectFilter {
  label: string;
  value: ProjectCategory | "all";
}

export const projectFilters: ProjectFilter[] = [
  { label: "All", value: "all" },
  { label: "Websites", value: "websites" },
  { label: "Applications", value: "applications" },
  { label: "In Progress", value: "in-progress" },
];

export const projects: Project[] = [
  {
    id: "hikmah-noor",
    title: "Hikmah Noor",
    description:
      "A multilingual Islamic knowledge site with Quran search, built as a fast static experience and shipped on Cloudflare.",
    category: "websites",
    status: "live",
    statusLabel: "Live",
    preview: {
      kind: "image",
      src: assetPath("/images/projects/hikmah-noor.png"),
      alt: "Screenshot of the Hikmah Noor website homepage",
      note: "Live site preview",
    },
    links: [
      {
        type: "website",
        label: "Visit Website",
        href: "https://hikmahnoor.in/",
      },
    ],
    technologies: [
      "Astro",
      "TypeScript",
      "Tailwind CSS",
      "Cloudflare D1",
      "Fuse.js",
      "MDX",
    ],
    featured: true,
    layout: "feature",
    accent: "orange",
    order: 1,
  },
  {
    id: "marcivo",
    title: "Marcivo",
    description:
      "A movie, TV and anime discovery site that lines up every available version in one search and plays it in the browser.",
    category: "websites",
    status: "live",
    statusLabel: "Live",
    preview: {
      kind: "image",
      src: assetPath("/images/projects/marcivo.png"),
      alt: "Screenshot of the Marcivo website homepage",
      note: "Live site preview",
    },
    links: [
      {
        type: "website",
        label: "Visit Website",
        href: "https://marcivo.teraplayer.in/",
      },
    ],
    technologies: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Express",
      "Cloudflare",
    ],
    featured: true,
    layout: "standard",
    accent: "blue",
    order: 2,
  },
  {
    id: "quran-wall",
    title: "Quran Wall",
    description:
      "An Android app for turning hand-picked Quran verses into beautiful wallpapers, published on Google Play.",
    category: "applications",
    status: "published",
    statusLabel: "Published",
    preview: {
      kind: "phone",
      src: assetPath("/images/projects/quran-wall-screen.png"),
      alt: "Redesigned Quran Wall home screen showing verse wallpapers in English",
      icon: assetPath("/images/projects/quran-wall-icon.png"),
      note: "Redesigned home screen",
    },
    links: [
      {
        type: "playstore",
        label: "Find on Google Play",
        href: "https://play.google.com/store/search?q=Quran%20Wall&c=apps",
      },
    ],
    technologies: [
      "Expo",
      "React Native",
      "TypeScript",
      "Kotlin",
      "Skia",
      "SQLite",
    ],
    featured: true,
    layout: "wide",
    accent: "blue",
    order: 3,
  },
  {
    id: "watch-later",
    title: "Watch Later",
    description:
      "A local-first movie, TV and anime tracker for Android — built with Expo and Supabase, currently in development.",
    category: "in-progress",
    status: "in-progress",
    statusLabel: "In Progress",
    preview: {
      kind: "phone",
      src: assetPath("/images/projects/watch-later-screen.png"),
      alt: "Watch Later app home screen with continue watching and watchlist",
      icon: assetPath("/images/projects/watch-later-icon.png"),
      note: "Real app screen",
    },
    links: [],
    technologies: [
      "Expo",
      "React Native",
      "TypeScript",
      "Supabase",
      "Clerk",
      "TanStack Query",
    ],
    note: "In active development. No public build yet.",
    featured: true,
    layout: "standard",
    accent: "orange",
    order: 4,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sortByOrder(a: Project, b: Project): number {
  return a.order - b.order;
}

export function getProjectsByCategory(
  category: ProjectCategory | "all",
): Project[] {
  if (category === "all") return [...projects].sort(sortByOrder);
  return projects
    .filter((project) => project.category === category)
    .sort(sortByOrder);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectCount(category: ProjectCategory | "all"): number {
  return getProjectsByCategory(category).length;
}

export const projectCounts = {
  total: projects.length,
  live: projects.filter((project) => project.status === "live").length,
  published: projects.filter((project) => project.status === "published").length,
  inProgress: projects.filter((project) => project.status === "in-progress")
    .length,
};

export default projects;
