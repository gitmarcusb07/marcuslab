import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.seo.title,
    short_name: "MarcusLab",
    description: siteConfig.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F2F6FB",
    theme_color: "#101C2D",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
