import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Define explicit workspace root to evitar escolha incorreta
    root: __dirname,
  },
};

export default nextConfig;
