import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Garancija 3 godine na video nadzor — IT Security Beograd",
  description: "IT Security daje garanciju 3 godine na sve ugradene sisteme video nadzora i 2 godine na opremu. Servis i odrzavanje u Beogradu.",
};

export default function Page() {
  return (
    <div className="sp-page">
      <nav className="sp-breadcrumb">
        <Link href="/">Pocetna</Link>
        <span>/</span>
        <span>Garancija 3 godine na ugradene</span>
      </nav>

      <h1 className="sp-h1">Garancija 3 godine na ugradene sisteme video nadzora</h1>

      <div className="sp-intro">
        <p>IT Security daje garanciju od 3 godine na sve sisteme video nadzora koje ugradimo, i 2 godine na opremu kupljenu kod nas. Nase garancije su izmedju najduzih na trzistu i dokaz su kvaliteta opreme i ugradnje.</p>
      </div>

      <div className="sp-grid">
        <div className="sp-item">
          <span className="sp-icon">🛡</span>
          <h2>3 godine na ugradnju</h2>
          <p>Svaki sistem koji ugradimo ima garanciju 3 godine na celokupnu instalaciju.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">📦</span>
          <h2>2 godine na opremu</h2>
          <p>Sva oprema iz nase prodavnice ima garanciju od 2 godine uz fiskalni racun.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">🔧</span>
          <h2>Besplatan servis</h2>
          <p>U garantnom roku sve popravke i intervencije vrsimo besplatno.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">📞</span>
          <h2>Brz odziv</h2>
          <p>Na servisne pozive odgovaramo u roku od 24 sata, dostupni 7 dana u nedelji.</p>
        </div>
      </div>

      <style>{`
        .sp-page { max-width: 860px; margin: 0 auto; padding: 0 8px; }
        .sp-breadcrumb { display: flex; gap: 8px; font-size: 13px; color: var(--ink-muted); margin-bottom: 20px; }
        .sp-breadcrumb a { color: var(--brand); text-decoration: none; }
        .sp-h1 { font-size: 24px; font-weight: 700; color: var(--ink); margin-bottom: 20px; line-height: 1.3; }
        .sp-intro { background: #eef2ff; border-left: 4px solid var(--brand); border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 32px; }
        .sp-intro p { font-size: 14px; line-height: 1.7; color: var(--ink); margin: 0; }
        .sp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px; }
        .sp-item { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 20px; }
        .sp-icon { font-size: 28px; display: block; margin-bottom: 10px; }
        .sp-item h2 { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
        .sp-item p { font-size: 13px; line-height: 1.6; color: var(--ink-muted); margin: 0; }
        .sp-cta { background: linear-gradient(135deg, #1d3eb8 0%, #152a85 100%); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px; }
        .sp-cta p { font-size: 14px; color: rgba(255,255,255,0.8); margin-bottom: 16px; }
        .sp-btn { display: inline-block; background: #f6d000; color: #0b1020; font-size: 15px; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; }
        .sp-note { background: #f4f5f8; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: var(--ink-muted); }
        @media (max-width: 640px) { .sp-grid { grid-template-columns: 1fr; } .sp-h1 { font-size: 20px; } }
      `}</style>
    </div>
  );
}
