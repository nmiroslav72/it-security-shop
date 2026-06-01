// @ts-nocheck
"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ProductCard, type ProductCardData } from "./ProductCard";

type TabKey = "all" | "CAMERAS" | "ALARMS" | "INTERCOMS" | "DVR";

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "Sve" },
  { key: "CAMERAS", label: "Kamere" },
  { key: "ALARMS", label: "Alarmi" },
  { key: "INTERCOMS", label: "Interfoni" },
  { key: "DVR", label: "DVR" },
];

type Item = ProductCardData & { badge?: string };

export function FeaturedSlider({
  products,
  sidebar,
}: {
  products: Item[];
  sidebar?: React.ReactNode;
}) {
  const [tab, setTab] = useState<TabKey>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (tab === "all") return products;
    return products.filter((p) => p.category === tab);
  }, [tab, products]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const step = (firstCard?.offsetWidth ?? 300) + 16;
    el.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/40">
      {/* dekorativni krugovi */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

      <div className="container-app relative py-10 sm:py-14 lg:py-16">
        <div
          className={
            sidebar
              ? "grid gap-6 lg:grid-cols-[240px,1fr] lg:gap-8"
              : ""
          }
        >
          {sidebar && <div className="lg:sticky lg:top-24 lg:h-fit">{sidebar}</div>}

          <div>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
              <div>
                <p className="mb-3 inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                  Aktuelne ponude
                </p>
                <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                  Izdvojeno za vas
                </h1>
                <p className="mt-2 max-w-xl text-sm text-ink-muted sm:text-base">
                  Najtraženiji kompleti i pojedinačni proizvodi — kamere, alarmi i interfoni.
                </p>
              </div>

              <Link
                href="/shop"
                className="hidden text-sm font-semibold text-brand hover:underline sm:inline"
              >
                Pogledaj svu ponudu →
              </Link>
            </div>

            {/* Tabovi */}
            <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const active = tab === t.key;
            const count =
              t.key === "all"
                ? products.length
                : products.filter((p) => p.category === t.key).length;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-brand text-white shadow-soft"
                    : "bg-white text-ink-muted hover:bg-slate-100"
                }`}
              >
                {t.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    active ? "bg-white/20" : "bg-slate-100"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Slider */}
        <div className="relative mt-6">
          {filtered.length === 0 ? (
            <div className="card p-10 text-center text-ink-muted">
              Nema istaknutih proizvoda u ovoj kategoriji.
            </div>
          ) : (
            <>
              <div
                ref={scrollRef}
                className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
              >
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    data-card
                    className="w-[260px] shrink-0 snap-start sm:w-[280px] lg:w-[300px]"
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>

              {filtered.length > 3 && (
                <>
                  <button
                    onClick={() => scroll("left")}
                    aria-label="Prethodni"
                    className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-3 shadow-card transition hover:bg-slate-50 sm:flex"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    aria-label="Sledeći"
                    className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white p-3 shadow-card transition hover:bg-slate-50 sm:flex"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </>
          )}
        </div>

            <div className="mt-6 text-center sm:hidden">
              <Link href="/shop" className="text-sm font-semibold text-brand hover:underline">
                Pogledaj svu ponudu →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
