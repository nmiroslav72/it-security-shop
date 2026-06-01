import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tehnicka podrska 24/7 — IT Security video nadzor Beograd",
  description: "Tehnicka podrska za video nadzor, alarme i interfone dostupna 7 dana u nedelji. Pozovite 063224651 za brzu pomoc.",
};

export default function Page() {
  return (
    <div className="sp-page">
      <nav className="sp-breadcrumb">
        <Link href="/">Pocetna</Link>
        <span>/</span>
        <span>Tehnicka podrska 24/7</span>
      </nav>

      <h1 className="sp-h1">Tehnicka podrska 24/7 — uvek smo tu za vas</h1>

      <div className="sp-intro">
        <p>Nasa tehnicka podrska dostupna je 7 dana u nedelji za sva pitanja i probleme vezane za video nadzor, alarmne sisteme i interfone. Nudimo podrsku telefonom, emailom i terenskim odlaskom.</p>
      </div>

      <div className="sp-grid">
        <div className="sp-item">
          <span className="sp-icon">📞</span>
          <h2>Telefonska podrska</h2>
          <p>Dostupni smo na broju 063224651 svaki dan od 9 do 21h za savete i pomoc.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">💻</span>
          <h2>Daljinska pomoc</h2>
          <p>Vecinu tehnickih problema resavamo daljinski bez potrebe za terenskim odlaskom.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">🚗</span>
          <h2>Terenska intervencija</h2>
          <p>Za probleme koje ne mozemo resiti daljinski saljem tehnicara na teren u Beogradu.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">✉️</span>
          <h2>Email podrska</h2>
          <p>Pisana pitanja i zahteve posaljite na nmiroslav72@yahoo.com, odgovaramo u roku od 24h.</p>
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
