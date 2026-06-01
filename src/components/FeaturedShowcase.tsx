import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FeaturedSlider } from "./FeaturedSlider";
import { HomeCategorySidebar } from "./HomeCategorySidebar";

export async function FeaturedShowcase() {
  const products = await prisma.product
    .findMany({
      where: { isFeatured: true, isActive: true },
      orderBy: { createdAt: "desc" },
      take: 16,
    })
    .catch(() => []);

  if (products.length === 0) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/40 py-16">
        <div className="container-app text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-brand">
            Aktuelne ponude
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Izdvojeno za vas
          </h1>
          <p className="mt-3 text-ink-muted">
            Istaknuti proizvodi će se pojaviti ovde čim ih označiš u admin panelu
            (toggle "Istaknut").
          </p>
          <Link href="/shop" className="btn-primary mt-6 inline-flex">
            Otvori prodavnicu →
          </Link>
        </div>
      </section>
    );
  }

  const items = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Number(p.price),
    showPrice: p.showPrice,
    images: p.images,
    category: p.category,
    brand: p.brand,
    shortDesc: p.shortDesc ?? undefined,
    badge: p.badge ?? undefined,
  }));

  return <FeaturedSlider products={items} sidebar={<HomeCategorySidebar />} />;
}
