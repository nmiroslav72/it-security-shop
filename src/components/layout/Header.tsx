"use client";

import Link from "next/link";
import { CartIcon } from "@/components/layout/CartIcon";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/shop",    label: "Prodavnica" },
  { href: "/contact", label: "Kontakt"    },
  { href: "/about",   label: "O nama"     },
  { href: "/blog",    label: "Blog"       },
  { href: "/gallery", label: "Galerija"   },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo">
          <img src="/diskont-logo.gif" alt="IT Security" className="site-header__logo-img" />
          <span className="site-header__logo-text">
            <span className="logo-full">DVN</span>
            <span className="logo-short">IT</span>
            {" "}
            <span className="site-header__logo-accent">IT Security</span>
          </span>
        </Link>

        <nav className="site-header__nav">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={"site-header__nav-link" + (pathname.startsWith(link.href) ? " active" : "")}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <a href="tel:063224651" className="site-header__phone">📞 063224651</a>
          <CartIcon />
          <Link href="/login" className="site-header__login">Prijava</Link>
          <button className="site-header__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Meni">
            <span className={"burger-icon" + (menuOpen ? " open" : "")}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="site-header__mobile-menu">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={"mob-link" + (pathname.startsWith(link.href) ? " active" : "")}
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="mob-link" onClick={() => setMenuOpen(false)}>Prijava</Link>
        </div>
      )}

      <style>{`
        .site-header { background: var(--brand); color: #fff; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
        .site-header__inner { max-width: 1600px; margin: 0 auto; height: 56px; padding: 0 12px; display: flex; align-items: center; gap: 12px; }
        .site-header__logo { display: flex; align-items: center; gap: 8px; text-decoration: none; min-width: 0; flex-shrink: 1; }
        .site-header__logo-img { height: 16px; width: auto; filter: brightness(0) invert(1); flex-shrink: 0; }
        .site-header__logo-text { font-size: 18px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .logo-full { color: #fff; }
        .logo-short { display: none; color: #fff; }
        .site-header__logo-accent { color: #f6d000; }
        .site-header__nav { display: flex; gap: 2px; flex: 1; }
        .site-header__nav-link { color: rgba(255,255,255,0.82); font-size: 13px; padding: 6px 12px; border-radius: 6px; transition: background 0.15s; text-decoration: none; }
        .site-header__nav-link:hover, .site-header__nav-link.active { background: rgba(255,255,255,0.15); color: #fff; }
        .site-header__actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; margin-left: auto; }
        .site-header__login { color: rgba(255,255,255,0.8); font-size: 13px; padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.25); text-decoration: none; }
                .site-header__phone { color: #f6d000; font-size: 13px; font-weight: 600; text-decoration: none; white-space: nowrap; }
        .site-header__phone:hover { color: #fff; }
        @media (max-width: 768px) { .site-header__phone { font-size: 11px; } }
        .site-header__burger { display: none; background: none; border: none; cursor: pointer; padding: 4px; width: 36px; height: 36px; align-items: center; justify-content: center; }
        .burger-icon { display: flex; flex-direction: column; gap: 5px; width: 22px; }
        .burger-icon span { display: block; height: 2px; background: #fff; border-radius: 2px; transition: all 0.25s; }
        .burger-icon.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .burger-icon.open span:nth-child(2) { opacity: 0; }
        .burger-icon.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .site-header__mobile-menu { background: #152a85; border-top: 1px solid rgba(255,255,255,0.1); }
        .mob-link { display: block; color: rgba(255,255,255,0.85); font-size: 15px; padding: 13px 20px; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mob-link:hover, .mob-link.active { color: #f6d000; }
        @media (max-width: 768px) {
          .site-header__nav { display: none; }
          .site-header__login { display: none; }
          .site-header__burger { display: flex; }
          .logo-full { display: none; }
          .logo-short { display: inline; }
          .site-header__logo-accent { font-size: 16px; }
          .site-header__inner { height: 52px; padding: 0 10px; }
          .site-header__logo-img { display: none; }
        }
        @media (min-width: 769px) {
          .site-header__mobile-menu { display: none; }
        }
      `}</style>
    </header>
  );
}
