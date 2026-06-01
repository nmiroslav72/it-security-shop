"use client";

import { useCartStore } from "@/lib/cart";

interface Product {
  id: string;
  name: string;
  price: number | null;
  showPrice: boolean;
  images: string[];
  slug: string;
}

export function AddToCartButton({ product, large }: { product: Product; large?: boolean }) {
  const addItem = useCartStore((s) => s.addItem);

  if (!product.showPrice || product.price === null) {
    return (
      <a href="/contact" className={`cart-btn cart-btn--inquiry${large ? " cart-btn--large" : ""}`}>
        Posalji upit
      </a>
    );
  }

  return (
    <>
      <button
        className={`cart-btn cart-btn--add${large ? " cart-btn--large" : ""}`}
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            price: product.price!,
            image: product.images?.[0] ?? "",
            quantity: 1,
          })
        }
      >
        🛒 Dodaj u korpu
      </button>

      <style>{`
        .cart-btn {
          font-size: 13px;
          font-weight: 500;
          padding: 7px 14px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .cart-btn--large {
          font-size: 16px;
          padding: 14px 28px;
          border-radius: 8px;
        }
        .cart-btn--add { background: var(--brand); color: #fff; }
        .cart-btn--add:hover { background: var(--brand-dark); }
        .cart-btn--inquiry { background: #f0f2f8; color: var(--brand); }
        .cart-btn--inquiry:hover { background: #e0e4f4; }
      `}</style>
    </>
  );
}
