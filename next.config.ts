import type { NextConfig } from "next";

/**
 * Vercel deployment configuration.
 *
 * Vercel natively supports Next.js — no static export needed.
 * Image optimisation, SSR, and other server features are available out of the box.
 */
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
