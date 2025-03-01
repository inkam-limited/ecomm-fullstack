/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "creativemarket.com",
      },
      {
        protocol: "https",
        hostname: "images.ui8.net",
      },
      {
        protocol: "https",
        hostname: "tint.creativemarket.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
