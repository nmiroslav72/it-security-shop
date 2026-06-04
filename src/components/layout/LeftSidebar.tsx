"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORY_TREE = [
  {
    slug: "video-nadzor",
    label: "Video nadzor",
    children: [
      { slug: "hd-kamere",                     label: "HD kamere" },
      { slug: "ip-kamere",                     label: "IP kamere" },
      { slug: "wifi-kamere-bezicne",           label: "WiFi kamere (bezicne)" },
      { slug: "dvr-digitalni-snimaci",         label: "DVR digitalni snimaci" },
      { slug: "nvr-mrezni-snimaci",            label: "NVR mrezni snimaci" },
      { slug: "kompleti-video-nadzora",        label: "Kompleti video nadzora" },
      { slug: "dodatna-oprema-za-videonadzor", label: "Dodatna oprema" },
    ],
  },
  {
    slug: "alarmi",
    label: "Alarmi",
    children: [
      { slug: "zicani-alarmi",  label: "Zicani alarmi" },
      { slug: "bezicni-alarmi", label: "Bezicni alarmi" },
    ],
  },
  {
    slug: "interfoni",
    label: "Interfoni",
    children: [
      { slug: "audio-interfoni", label: "Audio interfoni" },
      { slug: "video-interfoni", label: "Video interfoni" },
    ],
  },
];

const BRANDS     = ["Hikvision", "Dahua", "Uniview", "TVT"];
const REZOLUCIJE = ["2MPX", "4MPX", "5MPX", "6MPX", "8MPX"];

// Kategorije koje imaju posebne SEO stranice
const CATEGORY_HREFS: Record<string, string> = {
  "video-nadzor": "/shop/video-nadzor",
};

function getCategoryHref(slug: string) {
  return CATEGORY_HREFS[slug] ?? `/shop?category=${slug}`;
}

export function LeftSidebar() {
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const router       = useRouter();
  const isShop       = pathname.startsWith("/shop");
  const currentCat   = searchParams.get("category") ?? "";
  const currentPath  = pathname;

  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const g of CATEGORY_TREE) {
      init[g.slug] = true; // uvek otvoreno
    }
    return init;
  });

  function toggleOpen(slug: string) {
    setOpen((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }

  function toggleFilter(key: string, value: string) {
    const params  = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);
    params.delete(key);
    if (current.includes(value)) {
      current.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      [...current, value].forEach((v) => params.append(key, v));
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <aside className="left-sidebar">

      {/* Kategorije */}
      <div className="sb-section">
        <p className="sb-section__title">Kategorije</p>
        {CATEGORY_TREE.map((group) => {
          const groupActive = currentCat === group.slug || group.children.some((c) => c.slug === currentCat);
          return (
            <div key={group.slug} className="sb-group">
              <div
                className={`sb-group__parent${groupActive ? " active" : ""}`}
                onClick={() => toggleOpen(group.slug)}
              >
                <Link
                  href={getCategoryHref(group.slug)}
                  className="sb-group__parent-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {group.label}
                </Link>
                <span className="sb-group__arrow">{open[group.slug] ? "▾" : "▸"}</span>
              </div>
              {open[group.slug] && (
                <div className="sb-group__children">
                  {group.children.map((child) => (
                    <Link
                      key={child.slug}
                      href={getCategoryHref(child.slug)}
                      className={`sb-child${(currentCat === child.slug || currentPath === getCategoryHref(child.slug)) ? " active" : ""}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Filteri — samo na shop stranama */}
      {isShop && (
        <>
          {/* Brend */}
          <div className="sb-section">
            <p className="sb-section__title">Brend</p>
            {BRANDS.map((brand) => (
              <label key={brand} className="sb-check">
                <input
                  type="checkbox"
                  checked={searchParams.getAll("brand").includes(brand)}
                  onChange={() => toggleFilter("brand", brand)}
                />
                {brand}
              </label>
            ))}
          </div>

          {/* Rezolucija */}
          <div className="sb-section">
            <p className="sb-section__title">Rezolucija</p>
            {REZOLUCIJE.map((rez) => (
              <label key={rez} className="sb-check">
                <input
                  type="checkbox"
                  checked={searchParams.getAll("rezolucija").includes(rez)}
                  onChange={() => toggleFilter("rezolucija", rez)}
                />
                {rez}
              </label>
            ))}
          </div>
        </>
      )}

      <style>{`
        .left-sidebar {
          background: #fff;
          border-right: 1px solid rgba(0,0,0,0.08);
          padding: 14px 0;
          overflow-y: auto;
          position: sticky;
          top: var(--header-height);
          height: calc(100vh - var(--header-height));
        }
        .sb-section { padding-bottom: 12px; margin-bottom: 4px; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .sb-section:last-child { border-bottom: none; }
        .sb-section__title { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: var(--ink-muted); padding: 10px 14px 6px; }
        .sb-group__parent { display: flex; align-items: center; justify-content: space-between; padding: 0 10px 0 14px; cursor: pointer; transition: background 0.12s; }
        .sb-group__parent:hover { background: #f0f4ff; }
        .sb-group__parent.active { background: #eef2ff; }
        .sb-group__parent-link { display: block; font-size: 13px; font-weight: 500; color: var(--ink); text-decoration: none; padding: 7px 0; flex: 1; }
        .sb-group__parent.active .sb-group__parent-link { color: var(--brand); }
        .sb-group__arrow { font-size: 11px; color: var(--ink-muted); user-select: none; }
        .sb-group__children { background: #f8f9fc; border-left: 3px solid var(--brand); margin: 2px 0 4px 14px; border-radius: 0 4px 4px 0; }
        .sb-child { display: block; font-size: 12px; color: var(--ink-muted); padding: 5px 10px 5px 12px; text-decoration: none; transition: color 0.12s, background 0.12s; }
        .sb-child:hover { color: var(--brand); background: #eef2ff; }
        .sb-child.active { color: var(--brand); font-weight: 500; }
        .sb-check { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--ink); padding: 4px 14px; cursor: pointer; }
        .sb-check:hover { color: var(--brand); }
        .sb-check input { accent-color: var(--brand); width: 13px; height: 13px; }
      `}</style>
    </aside>
  );
}
