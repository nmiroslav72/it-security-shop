// @ts-nocheck
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Isporuka za 24h — IT Security video nadzor Beograd",
  description: "Brza isporuka opreme za video nadzor, alarme i interfone za 24h na teritoriji Srbije. Besplatna dostava za porudzbine preko 10.000 RSD.",
};

export default function Page() {
  return (
    <div className="sp-page">
      <nav className="sp-breadcrumb">
        <Link href="/">Pocetna</Link>
        <span>/</span>
        <span>Isporuka opreme za 24 sata</span>
      </nav>

      <h1 className="sp-h1">Isporuka opreme za 24 sata — IT Security</h1>

      <div className="sp-intro">
        <p>Sve porudzbine primljene do 14h isporucujemo sledeceg radnog dana na teritoriji cele Srbije. Koristimo pouzdane kurirske sluzbe i pratite vasu posiljku u realnom vremenu.</p>
      </div>

      <div className="sp-grid">
        <div className="sp-item">
          <span className="sp-icon">🚚</span>
          <h2>Dostava za 24h</h2>
          <p>Porudzbine primljene do 14h isporucujemo sledeceg radnog dana na celoj teritoriji Srbije.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">🎁</span>
          <h2>Besplatna dostava</h2>
          <p>Za sve porudzbine preko 10.000 RSD dostava je besplatna. Ispod tog iznosa dostava iznosi 350 RSD.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">💰</span>
          <h2>Placanje pouzecem</h2>
          <p>Placate robu tek kada je preuzmete od dostavljaca. Bez avansa i rizika.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">📦</span>
          <h2>Bezbedno pakovanje</h2>
          <p>Sva oprema je pazljivo upakovana kako bi stigla ispravna i neoštecena.</p>
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
