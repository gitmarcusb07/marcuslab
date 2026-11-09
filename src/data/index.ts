// ============================================================================
// Data Barrel Export — MarcusLab
// ============================================================================
// Import all editable content from "@/data".
// ============================================================================

export {
  siteConfig,
  getFooterCopyright,
} from "./site-config";
export type {
  SiteConfig,
  NavItem,
  HeroConfig,
  HeroCharacter,
  FooterConfig,
} from "./site-config";

export { profile, getBioExcerpt } from "./profile";
export type { ProfileData, ProfileFact } from "./profile";

export {
  projects,
  projectFilters,
  projectCounts,
  getProjectsByCategory,
  getProjectById,
  getProjectCount,
} from "./projects";
export type {
  Project,
  ProjectCategory,
  ProjectStatus,
  ProjectFilter,
  ProjectLink,
  ProjectPreview,
  ProjectLayout,
  ProjectAccent,
} from "./projects";

export {
  socials,
  getSocialByPlatform,
  getLinkableSocials,
  getCopyableSocials,
} from "./socials";
export type { SocialLink, SocialPlatform } from "./socials";

export {
  technologyCategories,
  getAllTechnologies,
} from "./technologies";
export type { Technology, TechnologyCategory } from "./technologies";

export {
  interests,
  currentlyExploring,
  explorationStatusLabels,
  explorationStatusColors,
} from "./interests";
export type {
  Interest,
  Exploration,
  ExplorationStatus,
  InterestIcon,
  InterestAccent,
} from "./interests";
