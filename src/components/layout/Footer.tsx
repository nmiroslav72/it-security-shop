// @ts-nocheck
"use client";

import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Prodavnica",
    links: [
      { label: "HD kamere", href: "/shop?category=hd-kamere" },
      { label: "IP kamere", href: "/shop?category=ip-kamere" },
      { label: "Alarm sistemi", href: "/shop?category=alarmi" },
      { label: "Video interfoni", href: "/shop?category=video-interfoni" },
      { label: "Kompleti", href: "/shop?category=kompleti-video-nadzora" },
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
      { label: "Kako naruciti", href: "/how-to-order" },
      { label: "Dostava", href: "/delivery" },
      { label: "Povrat robe", href: "/returns" },
      { label: "Garancija", href: "/warranty" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__logo">
            <div className="site-footer__logo-icon">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z" stroke="#f6d000" strokeWidth="1.5" fill="none" />
                <circle cx="9" cy="9" r="2.5" fill="#f6d000" />
              </svg>
            </div>
            <span>IT Security</span>
          </div>
          <p className="site-footer__tagline">
            Prodaja i montaza sigurnosnih sistema od 2008. Kamere, alarmi, interfoni — Beograd i okolina.
          </p>
          <div className="site-footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-btn">f</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-btn">in</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-btn">yt</a>
          </div>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.title} className="site-footer__col">
            <h4 className="site-footer__col-title">{col.title}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="site-footer__link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="site-footer__col">
          <h4 className="site-footer__col-title">Kontakt</h4>
          <ul className="site-footer__contact">
            <li><a href="tel:+381112345678">011 234 5678</a></li>
            <li><a href="mailto:info@itsecurity.rs">info@itsecurity.rs</a></li>
            <li>Beograd, Srbija</li>
            <li className="site-footer__hours">Pon-Pet: 09-17h</li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>IT Security — Sva prava zadrzana.</span>
        <div className="site-footer__bottom-links">
          <Link href="/privacy">Privatnost</Link>
          <Link href="/terms">Uslovi koristenja</Link>
        </div>
      </div>

      <style>{`
        .site-footer { background: #0b1020; color: rgba(255,255,255,0.65); margin-top: auto; }
        .site-footer__inner { max-width: 1600px; margin: 0 auto; padding: 40px 24px 24px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 32px; }
        .site-footer__logo { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; font-size: 16px; font-weight: 600; color: #fff; }
        .site-footer__logo-icon { width: 30px; height: 30px; background: rgba(246,208,0,0.15); border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .site-footer__tagline { font-size: 12px; line-height: 1.7; margin-bottom: 16px; max-width: 240px; }
        .site-footer__socials { display: flex; gap: 8px; }
        .social-btn { width: 30px; height: 30px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 11px; color: rgba(255,255,255,0.6); text-decoration: none; transition: all 0.15s; }
        .social-btn:hover { border-color: #f6d000; color: #f6d000; }
        .site-footer__col-title { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #fff; margin-bottom: 12px; }
        .site-footer__col ul { list-style: none; }
        .site-footer__col li { margin-bottom: 6px; }
        .site-footer__link { font-size: 12px; color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.12s; }
        .site-footer__link:hover { color: #f6d000; }
        .site-footer__contact { list-style: none; }
        .site-footer__contact li { font-size: 12px; margin-bottom: 6px; }
        .site-footer__contact a { color: rgba(255,255,255,0.6); text-decoration: none; }
        .site-footer__contact a:hover { color: #f6d000; }
        .site-footer__hours { color: rgba(255,255,255,0.35) !important; font-size: 11px !important; }
        .site-footer__bottom { border-top: 1px solid rgba(255,255,255,0.08); padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; font-size: 11px; }
        .site-footer__bottom-links { display: flex; gap: 16px; }
        .site-footer__bottom-links a { color: rgba(255,255,255,0.45); text-decoration: none; }
        .site-footer__bottom-links a:hover { color: rgba(255,255,255,0.8); }
        @media (max-width: 900px) { .site-footer__inner { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 540px) { .site-footer__inner { grid-template-columns: 1fr; padding: 24px 16px 16px; } }
      `}</style>
    </footer>
  );
}
