// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// /** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    fontLoaders: [
      { 
        loader: '@next/font/google', 
        options: { 
          subsets: ['latin'],
          timeout: 15000 
        }
      },
    ],
  },
};

module.exports = nextConfig;