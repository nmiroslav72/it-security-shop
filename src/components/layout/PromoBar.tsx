import Link from "next/link";
import { prisma } from "@/lib/prisma";

const DEMO_BANNERS = [
  {
    id: "1",
    title: "HD Kamere — Akcija",
    subtitle: "Snizenje do 30% na sve HD kamere",
    badge: "-30%",
    bg: "#1d3eb8",
    color: "#fff",
    href: "/shop?category=hd-kamere",
  },
  {
    id: "2",
    title: "Kompleti video nadzora",
    subtitle: "4 kamere + snimac 4K + HDD od 400 evra",
    badge: "400 EUR",
    bg: "#0b1020",
    color: "#f6d000",
    href: "/shop?category=kompleti-video-nadzora",
  },
  {
    id: "3",
    title: "Bezicni alarmi",
    subtitle: "Dahua i Ajax alarm kompleti na akciji",
    badge: "Akcija",
    bg: "#c62828",
    color: "#fff",
    href: "/shop?category=bezicni-alarmi",
  },
  {
    id: "4",
    title: "Video interfoni",
    subtitle: "Besplatna montaza uz kupovinu kompleta",
    badge: "Gratis",
    bg: "#f6d000",
    color: "#0b1020",
    href: "/shop?category=video-interfoni",
  },
];

// Slike se mapiraju po redosledu banera (order 1,2,3,4)
const BANNER_IMAGES: Record<number, string> = {
  1: "/uploads/banner-komplet.png",
  2: "/uploads/banner-komplet2.png",
  3: "/uploads/banner-komplet3.png",
  4: "/uploads/banner-komplet4.png",
};

async function getPromos() {
  try {
    const banners = await prisma.promoBanner.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    if (banners.length === 0) return DEMO_BANNERS;
    return banners.map((b) => ({
      id: b.id,
      title: b.title,
      subtitle: b.subtitle,
      badge: b.badge,
      bg: b.bgColor,
      color: b.txtColor,
      href: b.href,
      image: BANNER_IMAGES[b.order],
    }));
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
          style={(promo as any).image ? {} : { background: promo.bg, color: promo.color }}
        >
          {(promo as any).image ? (
            <img src={(promo as any).image} alt={promo.title} className="promo-banner__img" />
          ) : (
            <>
              <div className="promo-banner__content">
                <span className="promo-banner__title">{promo.title}</span>
                <span className="promo-banner__subtitle">{promo.subtitle}</span>
              </div>
              <span className="promo-banner__badge">{promo.badge}</span>
            </>
          )}
        </Link>
      ))}

      <style>{`
        .promo-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          padding: 12px 16px;
          background: #e8eaf0;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .promo-banner__img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .promo-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 10px;
          padding: 20px 18px;
          min-height: 185px;
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
          border-radius: 10px;
          transition: border-color 0.15s;
        }
        .promo-banner:hover { opacity: 0.92; transform: translateY(-2px); }
        .promo-banner:hover::after { border-color: rgba(255,255,255,0.4); }
        .promo-banner__content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .promo-banner__title {
          font-size: 16px;
          font-weight: 700;
          line-height: 1.2;
        }
        .promo-banner__subtitle {
          font-size: 12px;
          opacity: 0.85;
          line-height: 1.4;
        }
        .promo-banner__badge {
          font-size: 12px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 20px;
          flex-shrink: 0;
          white-space: nowrap;
          align-self: flex-start;
        }
        @media (max-width: 900px) {
          .promo-bar { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .promo-bar { grid-template-columns: 1fr; }
          .promo-banner { min-height: 80px; }
        }
      `}</style>
    </section>
  );
}
