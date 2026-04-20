import type { NextConfig } from "next";

/**
 * GitHub Pages static export configuration.
 *
 * - `output: "export"`  → generates a fully static site in /out
 * - `images.unoptimized` → required because static export has no image optimisation server
 * - `basePath` / `assetPrefix` → prefix all asset URLs with the repo slug
 *   so the site works at https://<user>.github.io/<repo>/
 *
 * The env var NEXT_PUBLIC_BASE_PATH is set by the deploy workflow.
 * During `bun run dev` it is empty, so everything works at http://localhost:3000/.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
