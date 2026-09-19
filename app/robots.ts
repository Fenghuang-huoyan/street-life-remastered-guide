import type { MetadataRoute } from "next";
import { site } from "@/config/site.config";

export default function robots(): MetadataRoute.Robots {
  const base = site.baseUrl.replace(/\/$/, "");
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${base}/sitemap.xml` };
}
