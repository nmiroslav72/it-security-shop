import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "./ProductCard";

export async function Bestsellers() {
  const products = await prisma.product
    .findMany({
      where: { isBestseller: true, active: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    })
    .catch(() => []);

  if (products.length === 0) {
    return (
      <section className="section bg-slate-50">
        <div className="container-app text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-brand">
            Bestseleri
          </p>
          <h2 className="section-title">Najprodavaniji modeli</h2>
          <p className="section-subtitle mx-auto">
            Lista bestselera biće dostupna čim povežeš bazu podataka i ubaciš proizvode.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-slate-50">
      <div className="container-app">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-brand">
              Bestseleri
            </p>
            <h2 className="section-title">Najprodavaniji modeli</h2>
          </div>
          <Link href="/shop" className="btn-ghost">
            Sve proizvode →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={{
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
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
