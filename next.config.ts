import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isGithubPages && {
    output: "export",
    basePath: basePath,
    assetPrefix: basePath ? `${basePath}/` : undefined,
  }),
  images: {
    unoptimized: isGithubPages || process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
