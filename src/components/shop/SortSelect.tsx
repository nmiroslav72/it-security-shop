"use client";

export function SortSelect({ current }: { current: string }) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const url = new URL(window.location.href);
    if (e.target.value === "price_asc") {
      url.searchParams.delete("sort");
    } else {
      url.searchParams.set("sort", e.target.value);
    }
    url.searchParams.delete("page");
    window.location.href = url.toString();
  }

  const effectiveCurrent = current === "" ? "price_asc" : current;

  return (
    <select
      className="shop-page__sort"
      value={effectiveCurrent}
      onChange={handleChange}
    >
      <option value="price_asc">Cena rastuce</option>
      <option value="price_desc">Cena opadajuce</option>
      <option value="newest">Najnovije</option>
    </select>
  );
}
