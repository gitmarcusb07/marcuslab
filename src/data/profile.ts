import { assetPath } from "@/lib/utils";

// ============================================================================
// Profile Data — MarcusLab
// ============================================================================
// This is the heart of the personal content on the site.
//
// EDITING NOTES
// • `bio` is rendered as separate paragraphs — keep each entry short.
// • Contact details live here and flow through the whole site.
// • `portrait` points at the AI-created avatar used across the site.
// ============================================================================

export interface ProfileFact {
  label: string;
  value: string;
}

export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  intro: string;
  bio: string[];
  portrait: string;
  portraitAlt: string;
  portraitNote: string;
  email: string;
  philosophy: string;
  currentFocus: string;
  highlights: string[];
  facts: ProfileFact[];
}

export const profile: ProfileData = {
  name: "Marcus Scout",
  role: "Developer. Creator. Technology enthusiast.",
  tagline: "I turn ideas into digital reality.",
  intro:
    "A builder at heart — happiest when an idea is moving from a sketch to something people can actually open, use and enjoy.",

  bio: [
    "I’m Marcus Scout — a developer and creator who likes taking an idea, turning it around, and shaping it into something real. That can be a website, an app, a game experiment, or a small piece of the internet that didn’t exist yesterday. MarcusLab (also searched as Marcus Lab) is where those builds live.",
    "My playground sits where technology and creativity meet: web experiences built with Next.js, React and Astro; Android applications built with React Native and Expo; and a growing pile of experiments around 3D, motion and AI. Some of those ideas are live, some are still notes on a screen, and the space between the two is the part I love most.",
    "Outside the editor, anime keeps the imagination charged. One Piece is the favourite — its spirit of adventure, curiosity and a good crew is a big part of the energy behind MarcusLab.",
  ],

  portrait: assetPath("/images/character/avatar.jpg"),
  portraitAlt:
    "MarcusLab avatar — anime-inspired pirate adventurer with straw hat",
  portraitNote: "AI-generated avatar",

  // Contact details — update these in one place and the whole site follows.
  email: "email.marcus07@gmail.com",

  philosophy:
    "Build with curiosity. Ship with care. Leave a little wonder behind.",

  currentFocus:
    "Turning MarcusLab into a home for every build — and taking Watch Later from idea to launch.",

  highlights: [
    "Web experiences",
    "Android applications",
    "3D & motion",
    "AI experiments",
    "Anime-inspired",
  ],

  facts: [
    { label: "Currently building", value: "Watch Later" },
    { label: "Core stack", value: "Next.js · Astro · React Native" },
    { label: "Soundtrack", value: "Spotify, on repeat" },
  ],
};

/** First paragraph of the bio, useful for compact previews. */
export function getBioExcerpt(): string {
  return profile.bio[0];
}

export default profile;
