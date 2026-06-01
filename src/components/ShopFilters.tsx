// @ts-nocheck
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

type FilterGroup = {
  key: string;
  label: string;
  options: { value: string; label: string }[];
};

const cameraFilters: FilterGroup[] = [
  {
    key: "brend",
    label: "Brend",
    options: [
      { value: "Hikvision", label: "Hikvision" },
      { value: "Dahua", label: "Dahua" },
      { value: "Imou", label: "Imou" },
    ],
  },
  {
    key: "rezolucija",
    label: "Rezolucija",
    options: [
      { value: "2mpx", label: "2 MP" },
      { value: "3mpx", label: "3 MP" },
      { value: "4mpx", label: "4 MP" },
      { value: "5mpx", label: "5 MP" },
      { value: "8mpx", label: "8 MP" },
      { value: "10mpx", label: "10 MP" },
    ],
  },
  {
    key: "tip",
    label: "Tip kamere",
    options: [
      { value: "IP", label: "IP kamera" },
      { value: "Analogna", label: "Analogna" },
      { value: "WiFi", label: "WiFi" },
    ],
  },
  {
    key: "nocno",
    label: "Noćno snimanje",
    options: [
      { value: "da", label: "Da" },
      { value: "ne", label: "Ne" },
    ],
  },
  {
    key: "komplet",
    label: "Komplet",
    options: [
      { value: "da", label: "Da" },
      { value: "ne", label: "Ne" },
    ],
  },
];

const alarmFilters: FilterGroup[] = [
  {
    key: "brend",
    label: "Brend",
    options: [
      { value: "Dahua", label: "Dahua" },
      { value: "HikVision", label: "HikVision" },
      { value: "Paradox", label: "Paradox" },
      { value: "Ajax", label: "Ajax" },
      { value: "Ultracell", label: "Ultracell" },
    ],
  },
  {
    key: "oprema",
    label: "Oprema",
    options: [
      { value: "šifrator", label: "Šifrator" },
      { value: "daljinske komande", label: "Daljinske komande" },
      { value: "bežični detektori", label: "Bežični detektori" },
    ],
  },
  {
    key: "vrsta",
    label: "Vrsta proizvoda",
    options: [
      { value: "centrale", label: "Centrale" },
      { value: "detektori", label: "Detektori" },
      { value: "sirene", label: "Sirene" },
      { value: "daljinske komande", label: "Daljinske komande" },
      { value: "akumulatori", label: "Akumulatori" },
    ],
  },
];

const dvrFilters: FilterGroup[] = [
  {
    key: "brend",
    label: "Brend",
    options: [
      { value: "Hikvision", label: "Hikvision" },
      { value: "Dahua", label: "Dahua" },
      { value: "Imou", label: "Imou" },
    ],
  },
  {
    key: "kanali",
    label: "Broj kanala",
    options: [
      { value: "4", label: "4 kanala" },
      { value: "8", label: "8 kanala" },
      { value: "16", label: "16 kanala" },
      { value: "32", label: "32 kanala" },
    ],
  },
  {
    key: "tehnologija",
    label: "Tehnologija",
    options: [
      { value: "IP", label: "NVR (IP)" },
      { value: "Analogna", label: "DVR (analogni)" },
      { value: "Hibridna", label: "Hibridna" },
    ],
  },
];

const intercomFilters: FilterGroup[] = [
  {
    key: "brend",
    label: "Brend",
    options: [
      { value: "Dahua", label: "Dahua" },
      { value: "Hikvision", label: "Hikvision" },
      { value: "Imou", label: "Imou" },
    ],
  },
  {
    key: "tip_interfona",
    label: "Kategorija",
    options: [
      { value: "audio", label: "Audio interfoni" },
      { value: "video", label: "Video interfoni" },
    ],
  },
  {
    key: "vrsta",
    label: "Vrsta proizvoda",
    options: [
      { value: "monitor", label: "Monitor" },
      { value: "spoljna jedinica", label: "Spoljna jedinica" },
      { value: "komplet", label: "Komplet" },
    ],
  },
];

const categoryTabs = [
  { value: "kamere", label: "Sigurnosne kamere" },
  { value: "alarmi", label: "Alarmi" },
  { value: "interfoni", label: "Interfoni" },
  { value: "dvr", label: "DVR snimači" },
];

export function ShopFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const activeCat = params.get("kategorija") ?? "kamere";
  const [openMobile, setOpenMobile] = useState(false);

  const activeFilterCount = Array.from(params.entries()).filter(
    ([k]) => k !== "kategorija" && k !== "sort"
  ).length;

  const filters = useMemo(() => {
    if (activeCat === "alarmi") return alarmFilters;
    if (activeCat === "interfoni") return intercomFilters;
    if (activeCat === "dvr") return dvrFilters;
    return cameraFilters;
  }, [activeCat]);

  const setParam = useCallback(
    (key: string, value: string, checked: boolean) => {
      const next = new URLSearchParams(params.toString());
      const current = next.getAll(key);
      if (checked) {
        if (!current.includes(value)) next.append(key, value);
      } else {
        next.delete(key);
        current.filter((v) => v !== value).forEach((v) => next.append(key, v));
      }
      router.replace(`/shop?${next.toString()}`, { scroll: false });
    },
    [params, router]
  );

  const setCategory = (cat: string) => {
    const next = new URLSearchParams();
    next.set("kategorija", cat);
    const sort = params.get("sort");
    if (sort) next.set("sort", sort);
    router.replace(`/shop?${next.toString()}`, { scroll: false });
  };

  const reset = () => router.replace(`/shop?kategorija=${activeCat}`, { scroll: false });

  return (
    <>
      {/* Mobilni toggle — vidljiv samo do lg: */}
      <button
        type="button"
        onClick={() => setOpenMobile((v) => !v)}
        className="card flex w-full items-center justify-between p-4 text-left text-sm font-semibold lg:hidden"
        aria-expanded={openMobile}
        aria-controls="shop-filters-panel"
      >
        <span className="flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
          Kategorije i filteri
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-brand px-2 py-0.5 text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </span>
        <span className={`transition ${openMobile ? "rotate-180" : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>

      <aside
        id="shop-filters-panel"
        className={`card space-y-6 p-6 lg:sticky lg:top-20 lg:block ${
          openMobile ? "block" : "hidden lg:block"
        }`}
      >
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-muted">
            Kategorija
          </h3>
          <div className="space-y-1">
            {categoryTabs.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                  activeCat === c.value
                    ? "bg-brand text-white"
                    : "hover:bg-slate-50"
                }`}
              >
                {c.label}
                <span className="text-xs opacity-70">→</span>
              </button>
            ))}
          </div>
        </div>

        {filters.map((group) => {
          const selected = params.getAll(group.key);
          return (
            <div key={group.key}>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-muted">
                {group.label}
              </h3>
              <div className="space-y-1.5">
                {group.options.map((o) => {
                  const checked = selected.includes(o.value);
                  return (
                    <label
                      key={o.value}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setParam(group.key, o.value, e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
                      />
                      <span className="text-sm text-ink">{o.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        <button
          onClick={reset}
          className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Resetuj filtere
        </button>
      </aside>
    </>
  );
}
