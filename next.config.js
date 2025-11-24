/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/i,
      use: "raw-loader",
    });
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.cloudflare.steamstatic.com" },
      { protocol: "https", hostname: "i.scdn.co" }, // Spotify
    ],
  },
  transpilePackages: ["framer-motion"],
};

module.exports = nextConfig;
