import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
    ],
  },
  // For adding proxy 
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       // This proxies requests from your app's /api/... to your backend server
  //       destination: `${AppConstants.localApiUrl}/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
