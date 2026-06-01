"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart";
import { useEffect, useState } from "react";

export function CartButton() {
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = mounted ? items.reduce((sum, i) => sum + i.quantity, 0) : 0;

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center rounded-full border border-slate-200 p-2.5 hover:bg-slate-50"
      aria-label="Korpa"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="17" cy="20" r="1.5" />
        <path d="M3 4h2l2.5 11h11l2-8H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-ink">
          {count}
        </span>
      )}
    </Link>
  );
}
