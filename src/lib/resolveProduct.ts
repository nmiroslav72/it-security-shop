// @ts-nocheck
import { prisma } from "@/lib/prisma";

const BRAND_PREFIXES = ["dahua-", "hikvision-", "uniview-", "imou-", "tvt-", "boma-", "hik-", "ezviz-", "ajax-", "paradox-", "comelit-"];

export async function resolveProductSlug(slug: string) {
  const exact = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (exact) return { product: exact, redirectTo: null };

  for (const b of BRAND_PREFIXES) {
    if (slug.startsWith(b)) {
      const stripped = slug.slice(b.length);
      const p = await prisma.product.findUnique({
        where: { slug: stripped },
        include: { category: true },
      });
      if (p && p.active) return { product: p, redirectTo: p.slug };
    }
  }

  const extended = await prisma.product.findFirst({
    where: { slug: { startsWith: slug + "-" }, active: true },
    include: { category: true },
  });
  if (extended) return { product: extended, redirectTo: extended.slug };

  return { product: null, redirectTo: null };
}
