"use client";

import { useState, useEffect } from "react";

interface Props {
  price: number;
  regularPrice?: number | null;
  salePrice?: number | null;
}

export function RevealPriceButton({ price, regularPrice, salePrice }: Props) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(() => setRevealed(false), 6000);
    return () => clearTimeout(timer);
  }, [revealed]);

  const isOnSale = salePrice && regularPrice && salePrice < regularPrice;

  if (revealed) {
    return (
      <div className="rpb-price-wrap">
        {isOnSale && (
          <span className="rpb-old">{regularPrice!.toLocaleString("sr-RS")} RSD</span>
        )}
        <span className="rpb-price">{price.toLocaleString("sr-RS")} RSD</span>
      </div>
    );
  }

  return (
    <button className="rpb-btn" onClick={() => setRevealed(true)}>
      🔒 Klikni za cenu
    </button>
  );
}
