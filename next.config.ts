import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
