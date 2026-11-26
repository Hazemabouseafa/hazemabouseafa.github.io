import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isStaticExport,
  },
  poweredByHeader: false,
};

export default nextConfig;
