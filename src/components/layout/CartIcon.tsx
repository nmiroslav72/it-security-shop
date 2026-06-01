// @ts-nocheck
"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart";

export function CartIcon() {
  const count = useCartStore((s) => s.count());

  return (
    <Link href="/cart" className="site-header__cart">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path d="M2 2h3l2.5 9H15l2.5-6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="16" r="1.5" fill="currentColor" />
        <circle cx="14" cy="16" r="1.5" fill="currentColor" />
      </svg>
      Korpa
      {count > 0 && (
        <span className="site-header__cart-badge">{count}</span>
      )}
    </Link>
  );
}
