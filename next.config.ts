import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* hide the dev-mode indicator badge for clean preview screenshots */
  devIndicators: false,
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
