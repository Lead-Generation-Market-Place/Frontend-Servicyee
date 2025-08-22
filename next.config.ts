import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com','images.pexels.com', 'cdn-icons-png.flaticon.com','cdn.pixabay.com', 'commondatastorage.googleapis.com', 'sample-videos.com'], // add domains if needed
  },
  // i18n is removed if using App Router
};

export default nextConfig;
