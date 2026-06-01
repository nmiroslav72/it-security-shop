// @ts-nocheck
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Licenca MUP-a za video nadzor — IT Security Beograd",
  description: "IT Security poseduje sve licence MUP-a za planiranje, projektovanje, montazu i odrzavanje sistema video nadzora u Beogradu. Legalna ugradnja sa planom, projektom i prijavom u MUP-u.",
};

export default function LicencaPage() {
  return (
    <div className="lic-page">
      <nav className="lic-breadcrumb">
        <Link href="/">Pocetna</Link>
        <span>/</span>
        <span>Licenca MUP-a</span>
      </nav>

      <h1 className="lic-h1">Licenca MUP-a za ugradnju video nadzora — IT Security Beograd</h1>

      <div className="lic-intro">
        <p>
          IT Security poseduje sve neophodne licence Ministarstva unutrasnjih poslova Republike Srbije
          za planiranje, projektovanje, montazu, odrzavanje i obuku korisnika sistema tehnicke zastite.
          Svaki sistem video nadzora koji ugradimo je potpuno legalan, u skladu sa Zakonom o privatnom
          obezbedjenju i svim propisima Republike Srbije.
        </p>
      </div>

      <div className="lic-cards">
        <div className="lic-card">
          <img src="/uploads/licenca-planiranje.gif" alt="Licenca za planiranje sistema tehnicke zastite" className="lic-card__img" />
          <h2 className="lic-card__title">Licenca za planiranje</h2>
          <p className="lic-card__text">Ovlasceni smo za izradu planova sistema tehnicke zastite koji su obavezni dokument pri postavljanju video nadzora.</p>
        </div>
        <div className="lic-card">
          <img src="/uploads/licenca-projektovanje.gif" alt="Licenca za projektovanje sistema tehnicke zastite" className="lic-card__img" />
          <h2 className="lic-card__title">Licenca za projektovanje</h2>
          <p className="lic-card__text">Posedujemo licencu za izradu tehnicke dokumentacije — projekta video nadzora koji je obavezan po zakonu.</p>
        </div>
        <div className="lic-card">
          <img src="/uploads/licenca-montiranje.gif" alt="Licenca za montazu i odrzavanje video nadzora" className="lic-card__img" />
          <h2 className="lic-card__title">Licenca za montazu i odrzavanje</h2>
          <p className="lic-card__text">Licencirani smo za montazu, odrzavanje i obuku korisnika sistema video nadzora i tehnicke zastite.</p>
        </div>
      </div>

      <div className="lic-section">
        <h2 className="lic-h2">Zasto je obavezna licenca MUP-a za ugradnju video nadzora?</h2>
        <p>
          Da biste postavili video nadzor na privatnoj kuci ili poslovnom prostoru, obavezno je
          da to uradi licencirana firma od strane MUP-a. To znaci da ne mozete to uraditi sami,
          bez obzira sto je to vasa kuca ili vas poslovni prostor. Svako postavljanje video nadzora mora da ima:
        </p>
        <ul className="lic-list">
          <li><strong>Plan video nadzora</strong> — dokument koji sadrzi opis sistema, namenu, lokaciju, broj i vrstu kamera, nacin snimanja i cuvanja snimaka</li>
          <li><strong>Projekat video nadzora</strong> — tehnicka dokumentacija za izvodjenje radova na postavljanju sistema sa svim tehnickim karakteristikama</li>
          <li><strong>Ugovor o tehnickom odrzavanju</strong> — potpisuje ga kupac i firma, garantuje najmanje jednu godisnju proveru ispravnosti sistema</li>
          <li><strong>Prijava u MUP-u</strong> — svaki sistem video nadzora mora biti prijavljen nadleznoj sluzbi MUP-a</li>
        </ul>
      </div>

      <div className="lic-warning">
        <span className="lic-warning__icon">⚠️</span>
        <div>
          <h3>Paznja — nelegalni video nadzor nosi ozbiljne posledice!</h3>
          <p>
            Ako vam bilo koja firma ili pojedinac kaze da za postavljanje video nadzora ne trebate plan i projekat,
            taj vas svesno dovodi u zabludu i direktno vas sistem video nadzora pravi nelegalnim.
          </p>
          <ul>
            <li>Oste kazne od strane zakona o privatnom obezbedjenju</li>
            <li>Snimci sa video nadzora bice izuzeti iz sudskog procesa</li>
            <li>Necete moci koristiti snimke kao dokaz u sudskom postupku</li>
          </ul>
        </div>
      </div>

      <div className="lic-section">
        <h2 className="lic-h2">Zakon o privatnom obezbedjenju — sta kaze zakon?</h2>
        <p>
          U Republici Srbiji, plan i projekat video nadzora su obavezni dokumenti po Zakonu o privatnom
          obezbedjenju. Ovaj zakon precizno definise ko ima pravo da postavlja sisteme tehnicke zastite,
          koji dokumenti su obavezni i koje su kazne za nepostovanje odredbi. Kao licencirani projektant
          sistema tehnicke zastite, IT Security garantuje da ce vas sistem biti u potpunosti uskladjen sa zakonom.
        </p>
      </div>

      <div className="lic-section">
        <h2 className="lic-h2">Ugovor o tehnickom odrzavanju video nadzora</h2>
        <p>
          Ugovor o tehnickom odrzavanju je obavezan dokument koji potpisuju kupac i firma koja radi
          tehnicko odrzavanje sistema video nadzora. Podrazumeva da ce firma najmanje jednom godisnje
          izaci na teren i proveriti da li je vas sistem tehnicki ispravan i u skladu sa Zakonom o bezbednosti.
          Bez ovog ugovora vas video nadzor nije legalan.
        </p>
      </div>

      <div className="lic-cta">
        <h2>Zelite legalan video nadzor u Beogradu?</h2>
        <p>Kontaktirajte nas za besplatnu procenu i ponudu. Ugradnja sa svim dokumentima i prijavom u MUP-u.</p>
        <a href="tel:063224651" className="lic-cta__btn">📞 063224651</a>
        <Link href="/shop" className="lic-cta__btn lic-cta__btn--outline">Pogledaj ponudu</Link>
      </div>

      <style>{`
        .lic-page { max-width: 860px; margin: 0 auto; padding: 0 8px; }
        .lic-breadcrumb { display: flex; gap: 8px; font-size: 13px; color: var(--ink-muted); margin-bottom: 20px; }
        .lic-breadcrumb a { color: var(--brand); text-decoration: none; }
        .lic-h1 { font-size: 26px; font-weight: 700; color: var(--ink); margin-bottom: 20px; line-height: 1.3; }
        .lic-h2 { font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 12px; }
        .lic-intro { background: #eef2ff; border-left: 4px solid var(--brand); border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 32px; }
        .lic-intro p { font-size: 15px; line-height: 1.7; color: var(--ink); margin: 0; }
        .lic-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .lic-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 20px; text-align: center; }
        .lic-card__img { width: 100%; max-width: 160px; border-radius: 8px; margin-bottom: 14px; }
        .lic-card__title { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .lic-card__text { font-size: 13px; color: var(--ink-muted); line-height: 1.6; margin: 0; }
        .lic-section { margin-bottom: 32px; }
        .lic-section p { font-size: 14px; line-height: 1.8; color: var(--ink-muted); margin-bottom: 12px; }
        .lic-list { padding-left: 20px; margin-bottom: 12px; }
        .lic-list li { font-size: 14px; line-height: 1.8; color: var(--ink-muted); margin-bottom: 8px; }
        .lic-warning { display: flex; gap: 16px; background: #fff8e1; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin-bottom: 32px; }
        .lic-warning__icon { font-size: 32px; flex-shrink: 0; }
        .lic-warning h3 { font-size: 16px; font-weight: 700; color: #b45309; margin-bottom: 8px; }
        .lic-warning p { font-size: 13px; line-height: 1.6; color: var(--ink-muted); margin-bottom: 8px; }
        .lic-warning ul { padding-left: 18px; }
        .lic-warning ul li { font-size: 13px; color: var(--ink-muted); margin-bottom: 4px; }
        .lic-cta { background: linear-gradient(135deg, #1d3eb8 0%, #152a85 100%); border-radius: 14px; padding: 32px; text-align: center; margin-bottom: 32px; }
        .lic-cta h2 { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .lic-cta p { font-size: 14px; color: rgba(255,255,255,0.8); margin-bottom: 20px; }
        .lic-cta__btn { display: inline-block; background: #f6d000; color: #0b1020; font-size: 15px; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; margin: 0 6px; }
        .lic-cta__btn--outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.4); }
        @media (max-width: 768px) { .lic-cards { grid-template-columns: 1fr; } .lic-h1 { font-size: 20px; } }
      `}</style>
    </div>
  );
}
