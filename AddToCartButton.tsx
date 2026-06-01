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

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  if (!product.showPrice || product.price === null) {
    return (
      <a href="/contact" className="cart-btn cart-btn--inquiry">
        Upit
      </a>
    );
  }

  return (
    <>
      <button
        className="cart-btn cart-btn--add"
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            price: product.price!,
            image: product.images?.[0] ?? "",
            slug: product.slug || product.id,
            quantity: 1,
          })
        }
      >
        + Korpa
      </button>

      <style>{`
        .cart-btn {
          font-size: 12px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
          text-decoration: none;
          display: inline-block;
        }
        .cart-btn--add {
          background: var(--brand);
          color: #fff;
        }
        .cart-btn--add:hover { background: var(--brand-dark); }
        .cart-btn--inquiry {
          background: #f0f2f8;
          color: var(--brand);
        }
        .cart-btn--inquiry:hover { background: #e0e4f4; }
      `}</style>
    </>
  );
}
