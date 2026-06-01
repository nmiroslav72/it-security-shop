// @ts-nocheck
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

const categoryMap: Record<string, Category> = {
  kamere: "CAMERAS",
  alarmi: "ALARMS",
  interfoni: "INTERCOMS",
  dvr: "DVR",
};

const monthNames = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "jun",
  "jul",
  "avgust",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
];

function formatRSD(price: number): string {
  return new Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency: "RSD",
    maximumFractionDigits: 0,
  }).format(price);
}

export async function MonthlyOffers({ category }: { category: string }) {
  const dbCategory = categoryMap[category];
  if (!dbCategory) return null;

  const offers = await prisma.product
    .findMany({
      where: {
        isActive: true,
        isMonthlyOffer: true,
        category: dbCategory,
      },
      orderBy: { updatedAt: "desc" },
      take: 3,
    })
    .catch(() => []);

  if (offers.length === 0) return null;

  const now = new Date();
  const monthLabel = `${monthNames[now.getMonth()]} ${now.getFullYear()}.`;

  return (
    <section
      aria-labelledby="ponuda-meseca-naslov"
      className="mb-8 rounded-2xl bg-gradient-to-br from-brand/5 via-white to-accent/10 p-4 shadow-soft sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="flex items-center text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted sm:text-xs">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Specijalna selekcija
          </p>
          <h2
            id="ponuda-meseca-naslov"
            className="mt-0.5 text-lg font-extrabold tracking-tight text-ink sm:text-xl"
          >
            Ponuda meseca
          </h2>
        </div>
        <p className="text-[11px] text-ink-muted sm:text-xs">
          {monthLabel} · {offers.length}{" "}
          {offers.length === 1 ? "proizvod" : "proizvoda"}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {offers.map((p) => {
          const img = p.images[0] || "/placeholder-product.svg";
          return (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[5/3] overflow-hidden bg-slate-100">
                <Image
                  src={img}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wide text-ink shadow">
                  PONUDA MESECA
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3">
                <p className="text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                  {p.brand}
                </p>
                <h3 className="line-clamp-2 text-sm font-bold leading-snug text-ink">
                  {p.name}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-1.5">
                  <span className="text-sm font-extrabold text-brand sm:text-base">
                    {p.showPrice ? formatRSD(Number(p.price)) : "Cena na upit"}
                  </span>
                  <span className="text-xs font-semibold text-brand transition group-hover:translate-x-0.5">
                    Detaljnije →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
