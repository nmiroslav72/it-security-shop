// @ts-nocheck
import Link from "next/link";

const INFO_LINKS = [
  { label: "pozovi za savet 063224651", href: "tel:063224651", icon: "📞" },
  { label: "ugradnja kupljene opreme",  href: "/ugradnja",     icon: "🔧" },
  { label: "licenca mup-a", href: "/licenca", icon: "📋" },
  { label: "isporuka za 24h",           href: "/dostava",      icon: "🚚" },
  { label: "povrat 14 dana",            href: "/povrat",       icon: "↩" },
  { label: "garancija 3 godine",        href: "/garancija",    icon: "🛡" },
  { label: "tehnicka podrska 24/7",     href: "/podrska",      icon: "💬" },
  { label: "sigurno placanje",          href: "/placanje",     icon: "🔒" },
];

export function InfoBar() {
  return (
    <div className="info-bar">
      <div className="info-bar__inner">
        {INFO_LINKS.map((item, i) => (
          <Link key={i} href={item.href} className="info-bar__item">
            <span className="info-bar__icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      <style>{`
        .info-bar {
          background: #f6d000;
          border-bottom: 1px solid #e3bf00;
          overflow: hidden;
        }
        .info-bar__inner {
          display: flex;
          align-items: center;
          overflow-x: auto;
          scrollbar-width: none;
          white-space: nowrap;
          padding: 0 12px;
          gap: 0;
        }
        .info-bar__inner::-webkit-scrollbar { display: none; }
        .info-bar__item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 500;
          color: #0b1020;
          text-decoration: none;
          padding: 7px 14px;
          white-space: nowrap;
          border-right: 1px solid rgba(0,0,0,0.12);
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .info-bar__item:last-child { border-right: none; }
        .info-bar__item:hover {
          background: rgba(0,0,0,0.08);
        }
        .info-bar__icon {
          font-size: 13px;
          line-height: 1;
        }
        @media (max-width: 768px) {
          .info-bar__item { font-size: 11px; padding: 6px 10px; }
        }
      `}</style>
    </div>
  );
}
