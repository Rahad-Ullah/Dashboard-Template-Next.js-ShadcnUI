import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        // Allow all URLs from https protocols
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        // Allow all URLs from http protocols
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        // Allow images from 10.0.70.50
        protocol: "http",
        hostname: "10.0.70.50",
        port: "5003",
        pathname: "/api/v1/**", // Ensure the pathname matches the actual URL structure
      },
    ],
  },
};

export default nextConfig;