import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Keep the dynamic-semantics static export works.
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
