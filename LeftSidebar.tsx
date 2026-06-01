"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const CATEGORIES = [
  { slug: "", label: "Sve kategorije" },
  { slug: "ip-kamere", label: "IP kamere" },
  { slug: "analogni-sistemi", label: "Analogni sistemi" },
  { slug: "alarmi", label: "Alarm sistemi" },
  { slug: "interfoni", label: "Video interfoni" },
  { slug: "oprema", label: "Oprema i dodaci" },
];

const BRANDS = ["Hikvision", "Dahua", "Uniview", "Reolink", "Bosch"];
const RESOLUTIONS = ["2MP / 1080p", "4MP", "8MP / 4K"];
const TYPES = ["Dome", "Bullet", "PTZ", "Bežične", "Noćno snimanje"];

export function LeftSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isShop = pathname.startsWith("/shop");

  function toggleParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);
    if (current.includes(value)) {
      params.delete(key);
      current.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }
    router.push(`/shop?${params.toString()}`);
  }

  function isChecked(key: string, value: string) {
    return searchParams.getAll(key).includes(value);
  }

  return (
    <aside className="left-sidebar">
      {/* Category links */}
      <div className="sidebar-section">
        <h3 className="sidebar-section__title">Kategorije</h3>
        <nav className="sidebar-nav">
          {CATEGORIES.map((cat) => {
            const href = cat.slug ? `/shop?category=${cat.slug}` : "/shop";
            const active =
              searchParams.get("category") === cat.slug ||
              (!searchParams.get("category") && cat.slug === "");
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`sidebar-nav__item${active ? " active" : ""}`}
              >
                <span className="sidebar-nav__dot" />
                {cat.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Filters - only shown on shop pages */}
      {isShop && (
        <>
          <div className="sidebar-section">
            <h3 className="sidebar-section__title">Brend</h3>
            {BRANDS.map((brand) => (
              <label key={brand} className="sidebar-check">
                <input
                  type="checkbox"
                  checked={isChecked("brand", brand)}
                  onChange={() => toggleParam("brand", brand)}
                />
                {brand}
              </label>
            ))}
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-section__title">Rezolucija</h3>
            {RESOLUTIONS.map((res) => (
              <label key={res} className="sidebar-check">
                <input
                  type="checkbox"
                  checked={isChecked("res", res)}
                  onChange={() => toggleParam("res", res)}
                />
                {res}
              </label>
            ))}
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-section__title">Tip kamere</h3>
            {TYPES.map((type) => (
              <label key={type} className="sidebar-check">
                <input
                  type="checkbox"
                  checked={isChecked("type", type)}
                  onChange={() => toggleParam("type", type)}
                />
                {type}
              </label>
            ))}
          </div>
        </>
      )}

      <style>{`
        .left-sidebar {
          background: #fff;
          border-right: 1px solid rgba(0,0,0,0.08);
          padding: 16px 12px;
          overflow-y: auto;
          position: sticky;
          top: var(--header-height);
          height: calc(100vh - var(--header-height));
        }
        .sidebar-section {
          margin-bottom: 20px;
        }
        .sidebar-section__title {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--ink-muted);
          margin-bottom: 8px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .sidebar-nav__item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--ink);
          padding: 6px 8px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.12s, color 0.12s;
        }
        .sidebar-nav__item:hover { background: #eef2ff; color: var(--brand); }
        .sidebar-nav__item.active { background: #eef2ff; color: var(--brand); font-weight: 500; }
        .sidebar-nav__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
          opacity: 0.5;
        }
        .sidebar-nav__item.active .sidebar-nav__dot { opacity: 1; background: var(--accent); }
        .sidebar-check {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--ink);
          padding: 4px 2px;
          cursor: pointer;
          border-radius: 4px;
          transition: color 0.12s;
        }
        .sidebar-check:hover { color: var(--brand); }
        .sidebar-check input {
          accent-color: var(--brand);
          width: 13px;
          height: 13px;
          flex-shrink: 0;
        }
      `}</style>
    </aside>
  );
}
