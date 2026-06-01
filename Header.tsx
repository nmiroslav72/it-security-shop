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
