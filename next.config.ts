import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出，生成纯 HTML/CSS/JS 文件，适合 GitHub Pages
  output: "export",

  // 如果部署到 https://<username>.github.io/<repo-name>/ ，请取消注释并填写 repo 名称：
  // basePath: "/<repo-name>",

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
