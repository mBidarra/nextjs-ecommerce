/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "www.comprasparaguai.com.br" },
      {hostname: "store.storeimages.cdn-apple.com"},
      {hostname: "i.ibb.co"},
      {hostname: "ibb.co"}
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
