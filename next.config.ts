import type { NextConfig } from "next";

/**
 * GitHub Pages project sites are served from /<repo>/, so the deployed build
 * needs a basePath. Local builds leave it empty. The deploy workflow sets
 * NEXT_PUBLIC_BASE_PATH=/marcuslab.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
