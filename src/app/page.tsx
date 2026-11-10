import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import ExploringSection from "@/components/sections/ExploringSection";
import BeyondSection from "@/components/sections/BeyondSection";
import SocialsSection from "@/components/sections/SocialsSection";
import ContactSection from "@/components/sections/ContactSection";
import PageChrome from "@/components/layout/PageChrome";

export default function Home() {
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
    </PageChrome>
  );
}
