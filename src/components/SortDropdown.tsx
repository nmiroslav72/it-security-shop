"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "default", label: "Podrazumevano" },
  { value: "price-asc", label: "Cena: od najniže" },
  { value: "price-desc", label: "Cena: od najviše" },
  { value: "name-asc", label: "Abecedno (A–Š)" },
];

export function SortDropdown() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("sort") ?? "default";

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-ink-muted">
        Sortiraj:
      </label>
      <select
        id="sort"
        value={current}
        onChange={(e) => {
          const next = new URLSearchParams(params.toString());
          if (e.target.value === "default") next.delete("sort");
          else next.set("sort", e.target.value);
          router.replace(`/shop?${next.toString()}`, { scroll: false });
        }}
        className="input max-w-xs cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
