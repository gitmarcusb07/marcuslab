"use client";

import ScrollProgress from "./ScrollProgress";
import CustomCursor from "./CustomCursor";
import BackToTop from "./BackToTop";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundAudio from "./BackgroundAudio";

export default function PageChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen relative isolation">
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 relative z-0">{children}</main>
      <Footer />
      <BackToTop />
      <CustomCursor />
      <BackgroundAudio />
    </div>
  );
}
