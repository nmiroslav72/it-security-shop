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
