import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  images: {
    // Rydex template CDN (site + CMS assets only).
    remotePatterns: [
      new URL("https://cdn.prod.website-files.com/6856afca69c1086451cbfd3c/**"),
      new URL("https://cdn.prod.website-files.com/686b7dabffa8d3d4fbc33439/**"),
    ],
  },
  partialPrefetching: true,
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
