import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com"
      }, 
      {
        hostname: "lh3.googleusercontent.com"
      }
    ]
  }
};

export default nextConfig;
