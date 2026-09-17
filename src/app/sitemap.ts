// @ts-nocheck
import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/site";

export const revalidate = 3600; // 1h

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/shop`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await prisma.category.findMany({
      select: { slug: true },
    });
    categoryRoutes = categories.map((c) => ({
      url: `${base}/shop?category=${c.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    }));
  } catch {
    // Baza nije dostupna pri buildu
  }

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true },
    });
    productRoutes = products.map((p) => ({
      url: `${base}/shop/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // Baza nije dostupna pri buildu
  }
  const staticBlogSlugs = [
    "video-nadzor-preko-mobilnog-telefona",
    "kamere-visoke-rezolucije-prednosti",
    "kako-izabrati-video-nadzor",
    "ajax-bezicni-alarm-broj-1-evropa",
  ];
  const staticBlogRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...staticBlogSlugs.map((slug) => ({
      url: `${base}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogRoutes = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Baza nije dostupna pri buildu
  }
 
    return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...staticBlogRoutes, ...blogRoutes];
}
  
