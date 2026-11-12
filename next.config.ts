import type { NextConfig } from "next";

/**
 * GitHub Pages serves project sites from a sub-path, e.g.
 * https://dok1o.github.io/Kazakh-learn/
 * The deploy workflow passes BASE_PATH=/Kazakh-learn; locally and in
 * the dev preview it stays empty, so nothing changes there.
 */
const rawBase = process.env.BASE_PATH ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBase ? `/${rawBase.replace(/^\/+|\/+$/g, "")}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow the Arena live-preview proxy host during development
  allowedDevOrigins: ["*.e2b.app"],
  // Fully static export -> `out/`, deployable to GitHub Pages
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
};
export default nextConfig;
