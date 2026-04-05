import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Breakpoints for full-width images (hero, backgrounds)
    deviceSizes: [640, 828, 1080, 1440, 1920, 2560],
    // Breakpoints for fixed/smaller images (cards, logos)
    imageSizes: [128, 256, 384, 512, 640, 750],
    qualities: [70, 75, 80],
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
