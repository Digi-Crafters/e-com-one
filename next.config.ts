import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer remotePatterns for flexible matching (recommended in recent Next.js versions)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
    ],
    // domains can be kept for backwards compatibility if needed:
    domains: ["encrypted-tbn0.gstatic.com"],
  },
};

export default nextConfig;
