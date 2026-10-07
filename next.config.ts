import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  images: {
    remotePatterns: [
      // Object form: URL() patterns only match an empty query, and Unsplash/Google URLs carry sizing params.
      // Placeholder photography until the shop supplies its own.
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**" },
      // Google review author avatars.
      { protocol: "https", hostname: "**.googleusercontent.com", pathname: "/**" },
    ],
  },
  // Keep links to the old site's pages working.
  async redirects() {
    return [
      { source: "/schedule", destination: "/contact", permanent: true },
      { source: "/book", destination: "/contact", permanent: true },
      { source: "/products", destination: "/about", permanent: true },
      { source: "/our-work", destination: "/services", permanent: true },
    ];
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
