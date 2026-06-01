import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video nadzor â€” kamere, snimaci, kompleti | IT Security Beograd",
  description: "Sistemi video nadzora â€” HD kamere, IP kamere, WiFi kamere, DVR i NVR snimaci, kompleti. Prodaja i ugradnja u Beogradu. Pozovite 063224651.",
};

const CATEGORIES = [
  { slug: "hd-kamere",                    label: "HD Kamere",                  img: "/uploads/backup/2023/09/HAC-HFW1200CM-IL-A-0360B-S6_01.webp" },
  { slug: "ip-kamere",                    label: "IP Kamere",                  img: "/uploads/backup/2023/09/IPC-HFW1230DS-SAW-0280B_01-2.webp" },
  { slug: "wifi-kamere-bezicne",          label: "WiFi Kamere (Bezicne)",      img: "/uploads/2023/01/IPC-F42FEP-D_01.webp" },
  { slug: "dvr-digitalni-snimaci",        label: "DVR Digitalni Snimaci",      img: "/uploads/2022/12/xvr5104hs-4kl-i3_main.webp" },
  { slug: "nvr-mrezni-snimaci",           label: "NVR Mrezni Snimaci",         img: "/uploads/2022/12/NVR2108HS-8P-I_main.webp" },
  { slug: "kompleti-video-nadzora",       label: "Kompleti Video Nadzora",     img: "/uploads/backup/2023/09/tvt-ip-4-akmere-komplet-shop.webp" },
  { slug: "dodatna-oprema-za-videonadzor", label: "Dodatna Oprema",            img: "/uploads/2023/02/nvr-ulaz-sa-kamerama-i-bez.webp" },
];

async function getCounts() {
  const counts: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    const category = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (category) {
      counts[cat.slug] = await prisma.product.count({
        where: { categoryId: category.id, active: true },
      });
    } else {
      counts[cat.slug] = 0;
    }
  }
  return counts;
}

export default async function VideoNadzorPage() {
  const counts = await getCounts();

  return (
    <div className="vn-page">
      <h1 className="vn-h1">Video nadzor â€” sistemi za zastitu</h1>
      <p className="vn-intro">
        Kompletna ponuda opreme za video nadzor â€” HD kamere, IP kamere, WiFi kamere,
        DVR i NVR snimaci, kompleti i dodatna oprema. Prodaja i profesionalna ugradnja
        u Beogradu i okolini od 2008. godine.
      </p>

      <div className="vn-grid">
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="vn-card">
            <div className="vn-card__img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.img}
                alt={cat.label}
                className="vn-card__img"
              />
              <div className="vn-card__overlay">
                <span className="vn-card__label">{cat.label}</span>
                <span className="vn-card__count">{counts[cat.slug] ?? 0} products</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="vn-seo">
        <h2 className="vn-h2">Zasto izabrati IT Security za video nadzor?</h2>
        <p>IT Security je specijalizovana firma za prodaju i ugradnju sistema video nadzora u Beogradu od 2008. godine. Nudimo kompletno resenje â€” od savetovanja i projektovanja, preko nabavke opreme, do profesionalne ugradnje i servisa. Sva oprema dolazi sa garancijom 2 do 3 godine.</p>

        <div className="vn-features">
          <div className="vn-feature">
            <span className="vn-feature__icon">ðŸ“·</span>
            <h3 className="vn-h3">Vodeci brendovi</h3>
            <p>Hikvision, Dahua, Uniview, TVT â€” originalna oprema sa garancijom</p>
          </div>
          <div className="vn-feature">
            <span className="vn-feature__icon">ðŸ”§</span>
            <h3 className="vn-h3">Profesionalna ugradnja</h3>
            <p>Iskusni tehnicari, projekat i prijava u MUP-u</p>
          </div>
          <div className="vn-feature">
            <span className="vn-feature__icon">ðŸ›¡</span>
            <h3 className="vn-h3">Garancija 3 godine</h3>
            <p>Na sve ugradene sisteme video nadzora</p>
          </div>
          <div className="vn-feature">
            <span className="vn-feature__icon">ðŸ“ž</span>
            <h3 className="vn-h3">Podrska 24/7</h3>
            <p>Tehnicka podrska dostupna 7 dana u nedelji â€” 063224651</p>
          </div>
        </div>
      </div>

      <style>{`
        .vn-page { max-width: 100%; }
        .vn-h1 { font-size: 26px; font-weight: 700; color: var(--ink); margin-bottom: 10px; }
        .vn-intro { font-size: 14px; line-height: 1.7; color: var(--ink-muted); margin-bottom: 24px; }
        .vn-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 40px;
        }
        .vn-card {
          display: block;
          text-decoration: none;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          background: #1d3eb8;
          aspect-ratio: 4/3;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .vn-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
        .vn-card__img-wrap { position: relative; width: 100%; height: 100%; }
        .vn-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(20%);
          transition: filter 0.2s, transform 0.3s;
        }
        .vn-card:hover .vn-card__img { filter: grayscale(0%); transform: scale(1.05); }
        .vn-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 14px 10px;
          text-align: center;
        }
        .vn-card__label {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          line-height: 1.3;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }
        .vn-card__count {
          font-size: 11px;
          color: var(--accent);
          font-weight: 500;
          margin-top: 4px;
        }
        .vn-seo { padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.08); }
        .vn-h2 { font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 10px; }
        .vn-h3 { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
        .vn-seo p { font-size: 14px; line-height: 1.7; color: var(--ink-muted); margin-bottom: 20px; }
        .vn-features { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .vn-feature { background: #fff; border-radius: 8px; padding: 16px; text-align: center; border: 1px solid rgba(0,0,0,0.07); }
        .vn-feature__icon { font-size: 28px; display: block; margin-bottom: 8px; }
        .vn-feature p { font-size: 12px; color: var(--ink-muted); margin-bottom: 0; }
        @media (max-width: 900px) {
          .vn-grid { grid-template-columns: repeat(2, 1fr); }
          .vn-features { grid-template-columns: repeat(2, 1fr); }
        }
        .vn-img { width: 100%; max-width: 500px; display: block; margin: 16px auto 32px; border-radius: 12px; }
        .vn-saveti { display: flex; flex-direction: column; gap: 16px; margin: 24px 0 32px; }
        .vn-savet { display: flex; gap: 16px; align-items: flex-start; background: #fff; border-radius: 10px; padding: 18px; border: 1px solid rgba(0,0,0,0.07); }
        .vn-savet__num { width: 36px; height: 36px; border-radius: 50%; background: var(--brand); color: #fff; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .vn-savet h3 { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
        .vn-savet p { font-size: 13px; line-height: 1.6; color: var(--ink-muted); margin: 0; }
        @media (max-width: 540px) {
          .vn-grid { grid-template-columns: repeat(2, 1fr); }
          .vn-features { grid-template-columns: 1fr; }
          .vn-h1 { font-size: 20px; }
        }
      `}</style>
    </div>
  );
}

