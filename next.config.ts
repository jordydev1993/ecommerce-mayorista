import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ignored: ['**/interfaz-diseño/**', '**/.next/**', '**/node_modules/**'],
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mzqioqbzasdilegdbroh.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default nextConfig;
