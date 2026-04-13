import type { NextConfig } from "next";
import { getBasePath } from "./src/lib/base-path";

const basePath = getBasePath();

const nextConfig: NextConfig = {
  // 静态导出，生成纯 HTML/CSS/JS 文件，适合 GitHub Pages
  output: "export",

  // 与 GitHub 仓库名一致（CI 中由 GITHUB_REPOSITORY 推断）；本地开发不设 env 则为无前缀
  ...(basePath ? { basePath } : {}),

  // GitHub Pages 需要 trailingSlash 以确保路由正确
  trailingSlash: true,

  // 静态导出时图片不优化（因为没有服务端）
  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
