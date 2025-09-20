import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: ['images.unsplash.com','images.pexels.com', 'cdn-icons-png.flaticon.com','cdn.pixabay.com',
       'commondatastorage.googleapis.com', 'sample-videos.com', 'randomuser.me','source.unsplash.com',
       'storyset.com', 'img.freepik.com', 'example.com', 'localhost'], // allow Storyset/Freepik assets
  },
  // i18n is removed if using App Router

};

export default nextConfig;