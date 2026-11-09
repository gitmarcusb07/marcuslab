// ============================================================================
// Interests & Explorations — MarcusLab
// ============================================================================
// The "Beyond Code" content and the "Currently Exploring" cards.
//
// Edit the copy, add a new interest, or change a status. Keep factual claims
// to things that are actually true — this file is easy to update as life moves.
// ============================================================================

export type InterestIcon = "sparkles" | "gamepad" | "headphones" | "compass";
export type InterestAccent = "orange" | "blue" | "red" | "navy";

export interface Interest {
  id: string;
  title: string;
  icon: InterestIcon;
  accent: InterestAccent;
  description: string;
  detail: string;
  tags: string[];
  link?: { label: string; href: string };
  disclaimer?: string;
}

export type ExplorationStatus = "learning" | "building" | "exploring" | "idea";

export interface Exploration {
  id: string;
  title: string;
  description: string;
  status: ExplorationStatus;
  icon: "cube" | "brain" | "rocket" | "hammer" | "mouse" | "gamepad";
  accent: InterestAccent;
}

export const interests: Interest[] = [
  {
    id: "anime",
    title: "Anime & storytelling",
    icon: "sparkles",
    accent: "orange",
    description:
      "One Piece is the north star: grand adventures, a crew worth believing in, and world-building that makes you want to build your own.",
    detail:
      "Anime is a big part of the creative fuel here. Not just something I watch — a way of thinking about character, stakes and a world that feels bigger than the screen.",
    tags: ["One Piece", "Adventure", "World-building"],
    disclaimer:
      "A personal fan interest. MarcusLab is not affiliated with One Piece or its rights holders.",
  },
  {
    id: "games",
    title: "Games & interactive worlds",
    icon: "gamepad",
    accent: "blue",
    description:
      "I love games as a player and as a builder — the rules, the feedback, the tiny details that make a world feel alive.",
    detail:
      "Game development is part of the playground here. It is where design, code, motion and storytelling all have to cooperate.",
    tags: ["Game development", "Interaction", "Play"],
  },
  {
    id: "sound",
    title: "Sound & focus",
    icon: "headphones",
    accent: "red",
    description:
      "The right soundtrack can change the entire shape of a build session. Mine lives on Spotify.",
    detail:
      "A good loop keeps the momentum going while the details get polished. The playlist below is the real one — the same one that soundtracks this site.",
    tags: ["Build sessions", "Focus", "Spotify"],
    link: {
      label: "Open Spotify playlist",
      href: "https://open.spotify.com/playlist/10LAS3tWkGjvpQYCP1Mybt?si=L9rR_u05Sp2pRlTND2DEvQ",
    },
  },
  {
    id: "curiosity",
    title: "Side quests & curiosity",
    icon: "compass",
    accent: "navy",
    description:
      "AI experiments, 3D sketches, new tools and internet rabbit holes. The next idea is usually hiding in one of them.",
    detail:
      "Curiosity is the operating system. Some side quests become projects; others stay as notes. Both are part of the process.",
    tags: ["AI", "3D", "Experiments"],
  },
];

export const currentlyExploring: Exploration[] = [
  {
    id: "three-web",
    title: "3D on the web",
    description:
      "Going deeper with Three.js and React Three Fiber — from floating islands to interactions that make a page feel alive.",
    status: "learning",
    icon: "cube",
    accent: "blue",
  },
  {
    id: "ai-making",
    title: "AI-assisted making",
    description:
      "Testing how AI can help move from an idea to a prototype faster, without sanding off the human part.",
    status: "learning",
    icon: "brain",
    accent: "orange",
  },
  {
    id: "marcuslab",
    title: "MarcusLab",
    description:
      "This space: a home for live projects, experiments and everything still taking shape.",
    status: "building",
    icon: "rocket",
    accent: "orange",
  },
  {
    id: "watch-later",
    title: "Watch Later",
    description:
      "A project currently in development. More will be shared when the build is ready.",
    status: "building",
    icon: "hammer",
    accent: "red",
  },
  {
    id: "motion",
    title: "Motion & interaction",
    description:
      "Studying how small movements change the way an interface feels — and when to leave well alone.",
    status: "exploring",
    icon: "mouse",
    accent: "blue",
  },
  {
    id: "game-concepts",
    title: "Game concepts",
    description:
      "Notes and prototypes for interactive worlds I would like to make playable one day.",
    status: "idea",
    icon: "gamepad",
    accent: "navy",
  },
];

export const explorationStatusLabels: Record<ExplorationStatus, string> = {
  learning: "Learning",
  building: "Building",
  exploring: "Exploring",
  idea: "Future idea",
};

export const explorationStatusColors: Record<ExplorationStatus, string> = {
  learning: "#168BFF",
  building: "#FF791F",
  exploring: "#EF4148",
  idea: "#73849A",
};

export default interests;
