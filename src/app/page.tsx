import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import ExploringSection from "@/components/sections/ExploringSection";
import BeyondSection from "@/components/sections/BeyondSection";
import SocialsSection from "@/components/sections/SocialsSection";
import ContactSection from "@/components/sections/ContactSection";
import PageChrome from "@/components/layout/PageChrome";
import { profile, getBioExcerpt } from "@/data/profile";
import { socials } from "@/data/socials";
import { siteConfig } from "@/data/site-config";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/character/avatar.jpg`,
    jobTitle: profile.role,
    description: getBioExcerpt(),
    email: profile.email,
    knowsAbout: [
      "web development",
      "android applications",
      "React Native",
      "Expo",
      "Astro",
      "Three.js",
      "React",
      "Next.js",
      "TypeScript",
      "Supabase",
      "Cloudflare",
      "game development",
      "AI experiments",
    ],
    sameAs: socials
      .map((social) => social.url)
      .filter((url): url is string => Boolean(url)),
  };

  return (
    <PageChrome>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TechnologiesSection />
      <ExploringSection />
      <BeyondSection />
      <SocialsSection />
      <ContactSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </PageChrome>
  );
}
