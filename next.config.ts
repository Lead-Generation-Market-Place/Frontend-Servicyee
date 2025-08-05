import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'], // add domains if needed
  },
  // i18n is removed if using App Router
};

export default nextConfig;
