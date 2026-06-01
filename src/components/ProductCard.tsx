// @ts-nocheck
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  price: number;
  showPrice: boolean;
  images: string[];
  category: string;
  brand: string;
  shortDesc?: string;
  badge?: string;
};

function badgeColor(badge: string): string {
  const upper = badge.toUpperCase();
  if (upper.includes("AKCIJA") || upper.includes("%") || upper.includes("POPUST")) {
    return "bg-red-500 text-white";
  }
  if (upper.includes("NOVO")) return "bg-emerald-500 text-white";
  if (upper.includes("POPULARNO") || upper.includes("BESTSELER")) {
    return "bg-accent text-ink";
  }
  if (upper.includes("PROFESIONALNO") || upper.includes("PRO")) {
    return "bg-brand text-white";
  }
  return "bg-ink text-white";
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const add = useCartStore((s) => s.add);
  const image = product.images[0] ?? "/placeholder-product.svg";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft transition-all duration-300 hover:scale-[1.03] hover:shadow-card">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:saturate-50 group-hover:brightness-95"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand shadow-sm">
            {product.brand}
          </span>
          {product.badge && (
            <span
              className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide shadow-sm ${badgeColor(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="line-clamp-1 text-base font-bold text-ink group-hover:text-brand">
            {product.name}
          </h3>
          {product.shortDesc && (
            <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
              {product.shortDesc}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-extrabold text-ink">
              {product.showPrice ? formatPrice(product.price) : "Cena na upit"}
            </span>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          add({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            showPrice: product.showPrice,
            image,
          });
        }}
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-card transition-all hover:bg-brand-dark"
        aria-label="Dodaj u korpu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
