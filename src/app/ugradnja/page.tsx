// @ts-nocheck
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ugradnja video nadzora i alarmnih sistema — IT Security Beograd",
  description: "Profesionalna ugradnja video nadzora, alarmnih sistema i interfona u Beogradu. Licencirani tehnicari, garancija 3 godine, projekat i prijava u MUP-u.",
};

export default function Page() {
  return (
    <div className="sp-page">
      <nav className="sp-breadcrumb">
        <Link href="/">Pocetna</Link>
        <span>/</span>
        <span>Ugradnja video nadzora i alarm</span>
      </nav>

      <h1 className="sp-h1">Ugradnja video nadzora i alarmnih sistema u Beogradu</h1>

      <div className="sp-intro">
        <p>IT Security pruzа kompletnu uslugu ugradnje sistema video nadzora, alarmnih sistema i interfona u Beogradu i okolini od 2008. godine. Nasa ekipa licenciranih tehnicara instalira sisteme za stanove, kuce, poslovne prostore i industrijske objekte.</p>
      </div>

      <div className="sp-grid">
        <div className="sp-item">
          <span className="sp-icon">📋</span>
          <h2>Projekat i plan</h2>
          <p>Svaka ugradnja pocinje izradom plana i projekta video nadzora koji su obavezni po zakonu.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">🔧</span>
          <h2>Profesionalna montaza</h2>
          <p>Iskusni tehnicari montiraju kamere, razvlace kablove i podešavaju ceo sistem.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">📱</span>
          <h2>Podesavanje aplikacije</h2>
          <p>Podesavamo mobilnu aplikaciju za pracenje kamera i upravljanje sistemom sa bilo kog mesta.</p>
        </div>
        <div className="sp-item">
          <span className="sp-icon">🏛</span>
          <h2>Prijava u MUP-u</h2>
          <p>Vrsimo prijavu sistema u MUP-u i izdajemo ugovor o tehnickom odrzavanju.</p>
        </div>
      </div>

      <div className="sp-cta">
        <p>Ugradnja je najpovoljnija uz kupljenu opremu kod nas. Kontaktirajte nas za besplatnu procenu.</p>
        <a href="tel:063224651" className="sp-btn">📞 063224651</a>
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
