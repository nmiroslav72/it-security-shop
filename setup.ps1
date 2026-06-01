# setup.ps1 - Pokretanje: powershell -ExecutionPolicy Bypass -File setup.ps1
$ErrorActionPreference = "Stop"
Write-Host "Kreiranje strukture projekta..." -ForegroundColor Green

New-Item -ItemType Directory -Force -Path "src\app" | Out-Null
@'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { PromoBar } from "@/components/layout/PromoBar";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "IT Security — Sigurnosne kamere, alarmi, interfoni",
  description:
    "Prodaja i montaža sigurnosnih sistema od 2008. IP kamere, alarmni sistemi, video interfoni.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body className={inter.className}>
        <div className="site-shell">
          <Header />
          <PromoBar />
          <div className="body-row">
            <LeftSidebar />
            <main className="center-col">{children}</main>
            <RightSidebar />
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

'@ | Set-Content -Path "src\app\layout.tsx" -Encoding UTF8
Write-Host "  OK: src\app\layout.tsx"

New-Item -ItemType Directory -Force -Path "src\app" | Out-Null
@'
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");

:root {
  --brand: #1d3eb8;
  --brand-dark: #152a85;
  --brand-light: #3d5fd9;
  --accent: #f6d000;
  --accent-dark: #e3bf00;
  --ink: #0b1020;
  --ink-muted: #4a5168;
  --surface: #ffffff;
  --surface-alt: #f4f5f8;
  --border: rgba(0, 0, 0, 0.1);

  --left-width: 210px;
  --right-width: 200px;
  --header-height: 56px;
  --promo-height: 90px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

body {
  font-family: "Inter", system-ui, sans-serif;
  color: var(--ink);
  background: var(--surface-alt);
  font-size: 14px;
  line-height: 1.6;
}

/* ─── SITE SHELL ─── */
.site-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ─── BODY ROW (three columns) ─── */
.body-row {
  display: grid;
  grid-template-columns: var(--left-width) 1fr var(--right-width);
  flex: 1;
  min-height: 0;
  align-items: start;
}

.center-col {
  min-width: 0;
  padding: 20px;
  background: var(--surface-alt);
}

/* ─── RESPONSIVE ─── */
@media (max-width: 1100px) {
  :root {
    --right-width: 0px;
  }
  .body-row {
    grid-template-columns: var(--left-width) 1fr;
  }
  .right-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  :root {
    --left-width: 0px;
  }
  .body-row {
    grid-template-columns: 1fr;
  }
  .left-sidebar {
    display: none;
  }
}

/* ─── UTILITY ─── */
a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  font-family: inherit;
}

'@ | Set-Content -Path "src\app\globals.css" -Encoding UTF8
Write-Host "  OK: src\app\globals.css"

New-Item -ItemType Directory -Force -Path "src\app" | Out-Null
@'
import { redirect } from "next/navigation";

// Početna stranica vodi direktno na prodavnicu
// Ako želiš posebnu početnu stranicu, zameni redirect sa pravim sadržajem
export default function HomePage() {
  redirect("/shop");
}

'@ | Set-Content -Path "src\app\page.tsx" -Encoding UTF8
Write-Host "  OK: src\app\page.tsx"

New-Item -ItemType Directory -Force -Path "src\app\shop" | Out-Null
@'
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/ProductCard";

interface ShopPageProps {
  searchParams: {
    category?: string;
    brand?: string | string[];
    res?: string | string[];
    type?: string | string[];
    sort?: string;
  };
}

async function getProducts(searchParams: ShopPageProps["searchParams"]) {
  const where: Record<string, unknown> = { active: true };

  if (searchParams.category) {
    where.category = searchParams.category;
  }

  const brands = [searchParams.brand ?? []].flat().filter(Boolean);
  if (brands.length) {
    where.brand = { in: brands };
  }

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (searchParams.sort === "price_asc") orderBy = { price: "asc" };
  if (searchParams.sort === "price_desc") orderBy = { price: "desc" };

  return prisma.product.findMany({ where, orderBy, take: 60 });
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const products = await getProducts(searchParams);

  const categoryLabel =
    searchParams.category
      ? searchParams.category
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())
      : "Svi proizvodi";

  return (
    <div className="shop-page">
      {/* Toolbar */}
      <div className="shop-page__toolbar">
        <h1 className="shop-page__heading">
          {categoryLabel}
          <span className="shop-page__count">{products.length} proizvoda</span>
        </h1>
        <form className="shop-page__sort-form">
          <input type="hidden" name="category" value={searchParams.category ?? ""} />
          <select name="sort" className="shop-page__sort" defaultValue={searchParams.sort ?? ""}>
            <option value="">Po popularnosti</option>
            <option value="price_asc">Cena: rastuće</option>
            <option value="price_desc">Cena: opadajuće</option>
            <option value="newest">Najnovije</option>
          </select>
        </form>
      </div>

      {/* Product grid — 4 columns */}
      {products.length === 0 ? (
        <div className="shop-page__empty">
          <p>Nema proizvoda za odabrane filtere.</p>
        </div>
      ) : (
        <div className="shop-page__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <style>{`
        .shop-page {}
        .shop-page__toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          gap: 12px;
        }
        .shop-page__heading {
          font-size: 18px;
          font-weight: 600;
          color: var(--ink);
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .shop-page__count {
          font-size: 13px;
          font-weight: 400;
          color: var(--ink-muted);
        }
        .shop-page__sort {
          font-size: 13px;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 6px;
          padding: 6px 12px;
          background: #fff;
          color: var(--ink);
        }
        .shop-page__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .shop-page__empty {
          text-align: center;
          padding: 60px 20px;
          color: var(--ink-muted);
          font-size: 15px;
        }
        @media (max-width: 1200px) {
          .shop-page__grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 860px) {
          .shop-page__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .shop-page__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

'@ | Set-Content -Path "src\app\shop\page.tsx" -Encoding UTF8
Write-Host "  OK: src\app\shop\page.tsx"

New-Item -ItemType Directory -Force -Path "src\components\layout" | Out-Null
@'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/shop", label: "Prodavnica" },
  { href: "/contact", label: "Kontakt" },
  { href: "/about", label: "O nama" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        {/* Logo */}
        <Link href="/" className="site-header__logo">
          <div className="site-header__logo-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z"
                stroke="#0b1020"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="9" cy="9" r="2.5" fill="#0b1020" />
            </svg>
          </div>
          <span className="site-header__logo-text">IT Security</span>
        </Link>

        {/* Main nav */}
        <nav className="site-header__nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-header__nav-link${
                pathname.startsWith(link.href) ? " active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="site-header__actions">
          <Link href="/cart" className="site-header__cart">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M2 2h3l2.5 9H15l2.5-6H6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="16" r="1.5" fill="currentColor" />
              <circle cx="14" cy="16" r="1.5" fill="currentColor" />
            </svg>
            Korpa
            <span className="site-header__cart-badge">0</span>
          </Link>

          <Link href="/login" className="site-header__login">
            Prijava
          </Link>
        </div>
      </div>

      <style>{`
        .site-header {
          background: var(--brand);
          color: #fff;
          height: var(--header-height);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .site-header__inner {
          max-width: 1600px;
          margin: 0 auto;
          height: 100%;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .site-header__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          text-decoration: none;
        }
        .site-header__logo-icon {
          width: 32px;
          height: 32px;
          background: var(--accent);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .site-header__logo-text {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.3px;
        }
        .site-header__nav {
          display: flex;
          gap: 2px;
          flex: 1;
        }
        .site-header__nav-link {
          color: rgba(255,255,255,0.82);
          font-size: 13.5px;
          padding: 6px 14px;
          border-radius: 6px;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
        }
        .site-header__nav-link:hover,
        .site-header__nav-link.active {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }
        .site-header__actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .site-header__cart {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--accent);
          color: var(--ink);
          font-size: 13px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 6px;
          transition: background 0.15s;
          text-decoration: none;
        }
        .site-header__cart:hover { background: var(--accent-dark); }
        .site-header__cart-badge {
          background: var(--ink);
          color: var(--accent);
          font-size: 10px;
          font-weight: 600;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .site-header__login {
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.25);
          transition: all 0.15s;
          text-decoration: none;
        }
        .site-header__login:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        @media (max-width: 768px) {
          .site-header__nav { display: none; }
          .site-header__login { display: none; }
        }
      `}</style>
    </header>
  );
}

'@ | Set-Content -Path "src\components\layout\Header.tsx" -Encoding UTF8
Write-Host "  OK: src\components\layout\Header.tsx"

New-Item -ItemType Directory -Force -Path "src\components\layout" | Out-Null
@'
import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Prodavnica",
    links: [
      { label: "IP kamere", href: "/shop?category=ip-kamere" },
      { label: "Alarm sistemi", href: "/shop?category=alarmi" },
      { label: "Video interfoni", href: "/shop?category=interfoni" },
      { label: "Oprema i dodaci", href: "/shop?category=oprema" },
    ],
  },
  {
    title: "Informacije",
    links: [
      { label: "O nama", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Galerija radova", href: "/gallery" },
      { label: "Kontakt", href: "/contact" },
    ],
  },
  {
    title: "Kupovina",
    links: [
      { label: "Kako naručiti", href: "/how-to-order" },
      { label: "Načini dostave", href: "/delivery" },
      { label: "Povrat robe", href: "/returns" },
      { label: "Garancija", href: "/warranty" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {/* Brand */}
        <div className="site-footer__brand">
          <div className="site-footer__logo">
            <div className="site-footer__logo-icon">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z"
                  stroke="#f6d000"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="9" cy="9" r="2.5" fill="#f6d000" />
              </svg>
            </div>
            <span>IT Security</span>
          </div>
          <p className="site-footer__tagline">
            Prodaja i montaža sigurnosnih sistema od 2008. Kamere, alarmi,
            interfoni — Beograd i okolina.
          </p>
          <div className="site-footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-btn">f</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-btn">in</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-btn">▶</a>
          </div>
        </div>

        {/* Nav columns */}
        {FOOTER_COLS.map((col) => (
          <div key={col.title} className="site-footer__col">
            <h4 className="site-footer__col-title">{col.title}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="site-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="site-footer__col">
          <h4 className="site-footer__col-title">Kontakt</h4>
          <ul className="site-footer__contact">
            <li>📞 <a href="tel:+381112345678">011 234 5678</a></li>
            <li>✉ <a href="mailto:info@itsecurity.rs">info@itsecurity.rs</a></li>
            <li>📍 Beograd, Srbija</li>
            <li className="site-footer__hours">Pon–Pet: 09–17h</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} IT Security. Sva prava zadržana.</span>
        <div className="site-footer__bottom-links">
          <Link href="/privacy">Privatnost</Link>
          <Link href="/terms">Uslovi korišćenja</Link>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: #0b1020;
          color: rgba(255,255,255,0.65);
          margin-top: auto;
        }
        .site-footer__inner {
          max-width: 1600px;
          margin: 0 auto;
          padding: 40px 24px 24px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 32px;
        }
        .site-footer__brand {}
        .site-footer__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
        }
        .site-footer__logo-icon {
          width: 30px;
          height: 30px;
          background: rgba(246,208,0,0.15);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .site-footer__tagline {
          font-size: 12px;
          line-height: 1.7;
          margin-bottom: 16px;
          max-width: 240px;
        }
        .site-footer__socials {
          display: flex;
          gap: 8px;
        }
        .social-btn {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.15s;
        }
        .social-btn:hover { border-color: var(--accent); color: var(--accent); }
        .site-footer__col {}
        .site-footer__col-title {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #fff;
          margin-bottom: 12px;
        }
        .site-footer__col ul { list-style: none; }
        .site-footer__col li { margin-bottom: 6px; }
        .site-footer__link {
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.12s;
        }
        .site-footer__link:hover { color: var(--accent); }
        .site-footer__contact { list-style: none; }
        .site-footer__contact li {
          font-size: 12px;
          margin-bottom: 6px;
        }
        .site-footer__contact a {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
        }
        .site-footer__contact a:hover { color: var(--accent); }
        .site-footer__hours { color: rgba(255,255,255,0.35) !important; font-size: 11px !important; }
        .site-footer__bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
        }
        .site-footer__bottom-links {
          display: flex;
          gap: 16px;
        }
        .site-footer__bottom-links a {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.12s;
        }
        .site-footer__bottom-links a:hover { color: rgba(255,255,255,0.8); }
        @media (max-width: 900px) {
          .site-footer__inner {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 540px) {
          .site-footer__inner {
            grid-template-columns: 1fr;
            padding: 24px 16px 16px;
          }
        }
      `}</style>
    </footer>
  );
}

'@ | Set-Content -Path "src\components\layout\Footer.tsx" -Encoding UTF8
Write-Host "  OK: src\components\layout\Footer.tsx"

New-Item -ItemType Directory -Force -Path "src\components\layout" | Out-Null
@'
"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORY_TREE = [
  {
    slug: "video-nadzor",
    label: "Video nadzor",
    children: [
      { slug: "hd-kamere",                  label: "HD kamere" },
      { slug: "ip-kamere",                  label: "IP kamere" },
      { slug: "wifi-kamere",                label: "WiFi kamere (bežične)" },
      { slug: "dvr-digitalni-snimaci",      label: "DVR digitalni snimači" },
      { slug: "nvr-mrezni-snimaci",         label: "NVR mrežni snimači" },
      { slug: "kompleti-video-nadzora",     label: "Kompleti video nadzora" },
      { slug: "dodatna-oprema-videonadzor", label: "Dodatna oprema" },
    ],
  },
  {
    slug: "alarmi",
    label: "Alarmi",
    children: [
      { slug: "zicani-alarmi",  label: "Žičani alarmi" },
      { slug: "bezicni-alarmi", label: "Bežični alarmi" },
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

const BRANDS = ["Hikvision", "Dahua", "Uniview", "TVT", "Reolink", "Bosch"];

export function LeftSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isShop = pathname.startsWith("/shop");

  const currentCat = searchParams.get("category") ?? "";

  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const group of CATEGORY_TREE) {
      initial[group.slug] =
        currentCat === group.slug ||
        group.children.some((c) => c.slug === currentCat);
    }
    return initial;
  });

  function toggleOpen(slug: string) {
    setOpen((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }

  function toggleFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
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
      <div className="sb-section">
        <p className="sb-section__title">Kategorije</p>
        {CATEGORY_TREE.map((group) => {
          const groupActive =
            currentCat === group.slug ||
            group.children.some((c) => c.slug === currentCat);
          return (
            <div key={group.slug} className="sb-group">
              <div
                className={`sb-group__parent${groupActive ? " active" : ""}`}
                onClick={() => toggleOpen(group.slug)}
              >
                <Link
                  href={`/shop?category=${group.slug}`}
                  className="sb-group__parent-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {group.label}
                </Link>
                <span className="sb-group__arrow">
                  {open[group.slug] ? "▾" : "▸"}
                </span>
              </div>
              {open[group.slug] && (
                <div className="sb-group__children">
                  {group.children.map((child) => (
                    <Link
                      key={child.slug}
                      href={`/shop?category=${child.slug}`}
                      className={`sb-child${currentCat === child.slug ? " active" : ""}`}
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

      {isShop && (
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
        .sb-section {
          padding-bottom: 12px;
          margin-bottom: 4px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .sb-section:last-child { border-bottom: none; }
        .sb-section__title {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--ink-muted);
          padding: 10px 14px 6px;
        }
        .sb-group__parent {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px 0 14px;
          cursor: pointer;
          transition: background 0.12s;
        }
        .sb-group__parent:hover { background: #f0f4ff; }
        .sb-group__parent.active { background: #eef2ff; }
        .sb-group__parent-link {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
          text-decoration: none;
          padding: 7px 0;
          flex: 1;
        }
        .sb-group__parent.active .sb-group__parent-link { color: var(--brand); }
        .sb-group__arrow { font-size: 11px; color: var(--ink-muted); user-select: none; }
        .sb-group__children {
          background: #f8f9fc;
          border-left: 3px solid var(--brand);
          margin: 2px 0 4px 14px;
          border-radius: 0 4px 4px 0;
        }
        .sb-child {
          display: block;
          font-size: 12px;
          color: var(--ink-muted);
          padding: 5px 10px 5px 12px;
          text-decoration: none;
          transition: color 0.12s, background 0.12s;
        }
        .sb-child:hover { color: var(--brand); background: #eef2ff; }
        .sb-child.active { color: var(--brand); font-weight: 500; }
        .sb-check {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--ink);
          padding: 4px 14px;
          cursor: pointer;
        }
        .sb-check:hover { color: var(--brand); }
        .sb-check input { accent-color: var(--brand); width: 13px; height: 13px; }
      `}</style>
    </aside>
  );
}

'@ | Set-Content -Path "src\components\layout\LeftSidebar.tsx" -Encoding UTF8
Write-Host "  OK: src\components\layout\LeftSidebar.tsx"

New-Item -ItemType Directory -Force -Path "src\components\layout" | Out-Null
@'
import Link from "next/link";

// Later: fetch from prisma posts table
const DEMO_POSTS = [
  {
    id: "1",
    slug: "kako-odabrati-kameru",
    title: "Kako odabrati pravu kameru za dvorište?",
    tag: "Saveti",
    date: "28. apr 2025",
  },
  {
    id: "2",
    slug: "ip-vs-analogni-2025",
    title: "IP vs analogni sistemi — šta je bolje za 2025?",
    tag: "Instalacija",
    date: "15. apr 2025",
  },
  {
    id: "3",
    slug: "hikvision-acusense",
    title: "Novi Hikvision AcuSense modeli stigli u ponudu",
    tag: "Novosti",
    date: "2. apr 2025",
  },
  {
    id: "4",
    slug: "alarm-ili-kamera",
    title: "Alarm ili kamera — šta prvo instalirati?",
    tag: "Saveti",
    date: "20. mar 2025",
  },
  {
    id: "5",
    slug: "prolecna-rasprodaja",
    title: "Prolećna rasprodaja — popusti do 40%",
    tag: "Akcija",
    date: "10. mar 2025",
  },
];

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Saveti:     { bg: "#eef2ff", color: "#1d3eb8" },
  Instalacija:{ bg: "#e8f5e9", color: "#2e7d32" },
  Novosti:    { bg: "#fff8e1", color: "#f57f17" },
  Akcija:     { bg: "#fce4ec", color: "#c62828" },
};

export async function RightSidebar() {
  const posts = DEMO_POSTS; // swap with DB fetch when blog is ready

  return (
    <aside className="right-sidebar">
      <div className="right-sidebar__header">
        <h3 className="right-sidebar__title">Blog</h3>
        <Link href="/blog" className="right-sidebar__all">
          Svi →
        </Link>
      </div>

      <div className="right-sidebar__posts">
        {posts.map((post) => {
          const tagStyle = TAG_COLORS[post.tag] ?? {
            bg: "#f0f0f0",
            color: "#555",
          };
          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="blog-post-card"
            >
              <span
                className="blog-post-card__tag"
                style={{ background: tagStyle.bg, color: tagStyle.color }}
              >
                {post.tag}
              </span>
              <p className="blog-post-card__title">{post.title}</p>
              <span className="blog-post-card__date">{post.date}</span>
            </Link>
          );
        })}
      </div>

      <style>{`
        .right-sidebar {
          background: #fff;
          border-left: 1px solid rgba(0,0,0,0.08);
          padding: 16px 12px;
          overflow-y: auto;
          position: sticky;
          top: var(--header-height);
          height: calc(100vh - var(--header-height));
        }
        .right-sidebar__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        .right-sidebar__title {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--ink-muted);
        }
        .right-sidebar__all {
          font-size: 11px;
          color: var(--brand);
          text-decoration: none;
        }
        .right-sidebar__all:hover { text-decoration: underline; }
        .right-sidebar__posts {
          display: flex;
          flex-direction: column;
        }
        .blog-post-card {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          text-decoration: none;
          transition: opacity 0.12s;
        }
        .blog-post-card:last-child { border-bottom: none; }
        .blog-post-card:hover .blog-post-card__title { color: var(--brand); }
        .blog-post-card__tag {
          font-size: 10px;
          font-weight: 500;
          padding: 2px 7px;
          border-radius: 10px;
          width: fit-content;
        }
        .blog-post-card__title {
          font-size: 12px;
          line-height: 1.4;
          color: var(--ink);
          transition: color 0.12s;
        }
        .blog-post-card__date {
          font-size: 10px;
          color: var(--ink-muted);
        }
      `}</style>
    </aside>
  );
}

'@ | Set-Content -Path "src\components\layout\RightSidebar.tsx" -Encoding UTF8
Write-Host "  OK: src\components\layout\RightSidebar.tsx"

New-Item -ItemType Directory -Force -Path "src\components\layout" | Out-Null
@'
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Fallback demo banners used when DB has no promos
const DEMO_BANNERS = [
  {
    id: "1",
    title: "IP Kamere — Akcija",
    subtitle: "Sniženje do 30% na sve IP kamere",
    badge: "-30%",
    bg: "#1d3eb8",
    color: "#fff",
    href: "/shop?category=ip-kamere",
  },
  {
    id: "2",
    title: "Alarm sistemi",
    subtitle: "Kompletni alarmni setovi",
    badge: "Novo",
    bg: "#0b1020",
    color: "#f6d000",
    href: "/shop?category=alarmi",
  },
  {
    id: "3",
    title: "Video interfoni",
    subtitle: "Besplatna montaža uz kupovinu",
    badge: "Akcija",
    bg: "#f6d000",
    color: "#0b1020",
    href: "/shop?category=interfoni",
  },
];

async function getPromos() {
  try {
    // If you add a Promo model to schema.prisma, fetch here.
    // For now, return demo banners.
    return DEMO_BANNERS;
  } catch {
    return DEMO_BANNERS;
  }
}

export async function PromoBar() {
  const promos = await getPromos();

  return (
    <section className="promo-bar">
      {promos.map((promo) => (
        <Link
          key={promo.id}
          href={promo.href}
          className="promo-banner"
          style={{
            background: promo.bg,
            color: promo.color,
          }}
        >
          <div className="promo-banner__content">
            <span className="promo-banner__title">{promo.title}</span>
            <span className="promo-banner__subtitle">{promo.subtitle}</span>
          </div>
          <span
            className="promo-banner__badge"
            style={{
              background: promo.color === "#fff" ? "#f6d000" : "#1d3eb8",
              color: promo.color === "#fff" ? "#0b1020" : "#fff",
            }}
          >
            {promo.badge}
          </span>
        </Link>
      ))}

      <style>{`
        .promo-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 10px 16px;
          background: #e8eaf0;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .promo-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 8px;
          padding: 12px 16px;
          min-height: 72px;
          text-decoration: none;
          transition: opacity 0.15s, transform 0.15s;
          position: relative;
          overflow: hidden;
        }
        .promo-banner::after {
          content: "";
          position: absolute;
          inset: 0;
          border: 2px solid transparent;
          border-radius: 8px;
          transition: border-color 0.15s;
        }
        .promo-banner:hover { opacity: 0.92; transform: translateY(-1px); }
        .promo-banner:hover::after { border-color: rgba(255,255,255,0.4); }
        .promo-banner__content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .promo-banner__title {
          font-size: 14px;
          font-weight: 600;
        }
        .promo-banner__subtitle {
          font-size: 12px;
          opacity: 0.85;
        }
        .promo-banner__badge {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .promo-bar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

'@ | Set-Content -Path "src\components\layout\PromoBar.tsx" -Encoding UTF8
Write-Host "  OK: src\components\layout\PromoBar.tsx"

New-Item -ItemType Directory -Force -Path "src\components\shop" | Out-Null
@'
import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "./AddToCartButton";

interface Product {
  id: string;
  name: string;
  brand: string | null;
  price: number | null;
  showPrice: boolean;
  isBestseller: boolean;
  images: string[];
  slug: string;
}

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];

  return (
    <div className="product-card">
      <Link href={`/shop/${product.slug}`} className="product-card__image-wrap">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="product-card__image"
          />
        ) : (
          <div className="product-card__placeholder">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.25">
              <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="32" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>
        )}
        {product.isBestseller && (
          <span className="product-card__badge product-card__badge--best">
            Bestseler
          </span>
        )}
      </Link>

      <div className="product-card__body">
        {product.brand && (
          <p className="product-card__brand">{product.brand}</p>
        )}
        <Link href={`/shop/${product.slug}`} className="product-card__name">
          {product.name}
        </Link>
        <div className="product-card__footer">
          {product.showPrice && product.price !== null ? (
            <span className="product-card__price">
              {product.price.toLocaleString("sr-RS")} RSD
            </span>
          ) : (
            <span className="product-card__inquiry">Cena na upit</span>
          )}
          <AddToCartButton product={product} />
        </div>
      </div>

      <style>{`
        .product-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
        }
        .product-card:hover {
          border-color: var(--brand);
          box-shadow: 0 4px 20px rgba(29,62,184,0.12);
          transform: translateY(-2px);
        }
        .product-card__image-wrap {
          display: block;
          position: relative;
          height: 160px;
          background: #f4f5f8;
          overflow: hidden;
        }
        .product-card__image {
          object-fit: contain;
          transition: transform 0.3s;
        }
        .product-card:hover .product-card__image {
          transform: scale(1.05);
        }
        .product-card__placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
        }
        .product-card__badge {
          position: absolute;
          top: 8px;
          left: 8px;
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
        }
        .product-card__badge--best {
          background: var(--accent);
          color: var(--ink);
        }
        .product-card__body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .product-card__brand {
          font-size: 11px;
          color: var(--ink-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .product-card__name {
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.35;
          text-decoration: none;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-card__name:hover { color: var(--brand); }
        .product-card__footer {
          margin-top: auto;
          padding-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .product-card__price {
          font-size: 15px;
          font-weight: 600;
          color: var(--brand);
        }
        .product-card__inquiry {
          font-size: 12px;
          color: var(--ink-muted);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

'@ | Set-Content -Path "src\components\shop\ProductCard.tsx" -Encoding UTF8
Write-Host "  OK: src\components\shop\ProductCard.tsx"

New-Item -ItemType Directory -Force -Path "src\components\shop" | Out-Null
@'
"use client";

import { useCartStore } from "@/lib/cart";

interface Product {
  id: string;
  name: string;
  price: number | null;
  showPrice: boolean;
  images: string[];
  slug: string;
}

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  if (!product.showPrice || product.price === null) {
    return (
      <a href="/contact" className="cart-btn cart-btn--inquiry">
        Upit
      </a>
    );
  }

  return (
    <>
      <button
        className="cart-btn cart-btn--add"
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            price: product.price!,
            image: product.images?.[0] ?? "",
            quantity: 1,
          })
        }
      >
        + Korpa
      </button>

      <style>{`
        .cart-btn {
          font-size: 12px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
          text-decoration: none;
          display: inline-block;
        }
        .cart-btn--add {
          background: var(--brand);
          color: #fff;
        }
        .cart-btn--add:hover { background: var(--brand-dark); }
        .cart-btn--inquiry {
          background: #f0f2f8;
          color: var(--brand);
        }
        .cart-btn--inquiry:hover { background: #e0e4f4; }
      `}</style>
    </>
  );
}

'@ | Set-Content -Path "src\components\shop\AddToCartButton.tsx" -Encoding UTF8
Write-Host "  OK: src\components\shop\AddToCartButton.tsx"

Write-Host ""
Write-Host "Sve komponente su postavljene!" -ForegroundColor Green
Write-Host "Pokrenite: npm run dev" -ForegroundColor Cyan