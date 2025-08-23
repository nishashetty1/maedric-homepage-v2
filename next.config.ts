/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't stop production builds if there are warnings
    ignoreDuringBuilds: true,
    dirs: [],
    reactStrictMode: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;