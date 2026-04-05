import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://respocaravan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/en`, lastModified: new Date() },
    { url: `${baseUrl}/ua`, lastModified: new Date() },
  ];
}
