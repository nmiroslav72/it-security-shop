import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Stari sajt — fallback za slike koje nisu u zip-u
      { protocol: "https", hostname: "diskontvideonadzora.rs" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
    // Lokalne slike iz public/uploads/ rade automatski bez konfiguracije
  },
};

export default nextConfig;
