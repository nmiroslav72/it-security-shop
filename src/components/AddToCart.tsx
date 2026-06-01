// @ts-nocheck
"use client";

import { useCartStore, type CartItem } from "@/lib/cart";
import { useState } from "react";

export function AddToCart({
  product,
}: {
  product: Omit<CartItem, "quantity">;
}) {
  const add = useCartStore((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-slate-200">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-4 py-2 text-lg font-bold hover:bg-slate-50"
          aria-label="Smanji"
        >
          −
        </button>
        <span className="min-w-8 text-center font-semibold">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-4 py-2 text-lg font-bold hover:bg-slate-50"
          aria-label="Povećaj"
        >
          +
        </button>
      </div>

      <button
        onClick={() => {
          add(product, qty);
          setAdded(true);
          setTimeout(() => setAdded(false), 1500);
        }}
        className="btn-primary"
      >
        {added ? "✓ Dodato" : "Dodaj u korpu"}
      </button>
    </div>
  );
}
