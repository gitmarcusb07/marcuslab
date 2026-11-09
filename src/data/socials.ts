// ============================================================================
// Social Links — MarcusLab
// ============================================================================
// Every public account in one central file.
//
// Discord has no public profile URL, so it exposes the username with a copy
// button instead of inventing a destination.
// ============================================================================

export type SocialPlatform =
  | "github"
  | "reddit"
  | "x"
  | "discord"
  | "instagram"
  | "spotify"
  | "moctale";

export interface SocialLink {
  platform: SocialPlatform;
  name: string;
  username: string;
  /** Omit when a public profile URL has not been supplied. */
  url?: string;
  /** Copy the username instead of opening a link. */
  copyUsername?: boolean;
  description: string;
  /** Platform-specific accent, used sparingly on icon tiles and hovers. */
  accent: string;
  ariaLabel: string;
}

export const socials: SocialLink[] = [
  {
    platform: "github",
    name: "GitHub",
    username: "gitmarcusb07",
    url: "https://github.com/gitmarcusb07",
    description: "Code, experiments and works in progress.",
    accent: "#171B22",
    ariaLabel: "Visit Marcus on GitHub",
  },
  {
    platform: "reddit",
    name: "Reddit",
    username: "rdt_marcus",
    url: "https://www.reddit.com/user/rdt_marcus/",
    description: "Conversations, side quests and the occasional rabbit hole.",
    accent: "#FF4500",
    ariaLabel: "Visit Marcus on Reddit",
  },
  {
    platform: "x",
    name: "X",
    username: "x_marcus07",
    url: "https://x.com/x_marcus07",
    description: "Short thoughts, updates and things worth sharing.",
    accent: "#101C2D",
    ariaLabel: "Visit Marcus on X",
  },
  {
    platform: "discord",
    name: "Discord",
    username: "dis_marcus07",
    copyUsername: true,
    description: "Copy the username to add me on Discord.",
    accent: "#5865F2",
    ariaLabel: "Copy Marcus's Discord username",
  },
  {
    platform: "instagram",
    name: "Instagram",
    username: "ig__marcus",
    url: "https://www.instagram.com/ig__marcus/",
    description: "A more visual corner of the digital world.",
    accent: "#E4405F",
    ariaLabel: "Visit Marcus on Instagram",
  },
  {
    platform: "spotify",
    name: "Spotify",
    username: "Marcus's playlist",
    url: "https://open.spotify.com/playlist/10LAS3tWkGjvpQYCP1Mybt?si=L9rR_u05Sp2pRlTND2DEvQ",
    description: "The soundtrack behind the build sessions.",
    accent: "#1DB954",
    ariaLabel: "Open Marcus's Spotify playlist",
  },
  {
    platform: "moctale",
    name: "Moctale",
    username: "moc_marcus",
    url: "https://www.moctale.in/u/moc_marcus",
    description: "Discovering movies, shows and what to watch next.",
    accent: "#FF791F",
    ariaLabel: "Visit Marcus on Moctale",
  },
];

export function getSocialByPlatform(
  platform: SocialPlatform,
): SocialLink | undefined {
  return socials.find((social) => social.platform === platform);
}

export function getLinkableSocials(): SocialLink[] {
  return socials.filter((social) => Boolean(social.url));
}

export function getCopyableSocials(): SocialLink[] {
  return socials.filter((social) => social.copyUsername);
}

export default socials;
