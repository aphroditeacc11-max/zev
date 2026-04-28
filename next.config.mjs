/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@cms-builder/core"],
  allowedDevOrigins: ["202.179.6.77"], // Moved to top-level for Next.js 15
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;