import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "O nama — IT Security video nadzor i tehnička zaštita Beograd",
  description: "IT Security Beograd — preko 15 godina iskustva u video nadzoru, alarmnim sistemima i interfonima. Licencirani od MUP-a, garancija 3 godine, diskontne cene Dahua, Hikvision, Ajax, Paradox.",
};

export default function AboutPage() {
  return (
    <div className="about-page">

      <div className="about-hero">
        <div className="about-hero__content">
          <p className="about-hero__label">IT Security Beograd — od 2008. godine</p>
          <h1 className="about-hero__h1">Bezbednost bez kompromisa</h1>
          <p className="about-hero__sub">
            Preko 15 godina iskustva u tehničkom obezbeđenju. Licencirani od MUP-a.
            Video nadzor, alarmi, interfoni i GPS praćenje — sve na jednom mestu.
          </p>
          <div className="about-hero__btns">
            <a href="tel:063224651" className="about-btn about-btn--primary">📞 063224651</a>
            <Link href="/shop" className="about-btn about-btn--outline">Pogledaj ponudu</Link>
          </div>
        </div>
        <div className="about-hero__logo">
          <img src="/diskont-logo.gif" alt="IT Security logo" className="about-hero__logo-img" />
          <p className="about-hero__logo-sub">IT Security</p>
          <p className="about-hero__logo-tagline">Diskont videonadzora</p>
        </div>
      </div>

      <div className="about-stats">
        <div className="about-stat">
          <span className="about-stat__num">15+</span>
          <span className="about-stat__label">Godina iskustva</span>
        </div>
        <div className="about-stat">
          <span className="about-stat__num">1000+</span>
          <span className="about-stat__label">Instaliranih sistema</span>
        </div>
        <div className="about-stat">
          <span className="about-stat__num">6</span>
          <span className="about-stat__label">Licenci MUP-a</span>
        </div>
        <div className="about-stat">
          <span className="about-stat__num">3 god.</span>
          <span className="about-stat__label">Garancija na ugradnju</span>
        </div>
      </div>

      <div className="about-section">
        <h2 className="about-h2">Ko smo mi?</h2>
        <p className="about-p">
          IT Security je firma sa sedištem u Beogradu, specijalizovana za tehničko obezbeđenje objekata.
          Sa preko 15 godina iskustva u video nadzoru, alarmnim sistemima, interfonima i GPS satelitskom
          praćenju, pomogli smo više od hiljadu klijenata da zaštite svoju imovinu, porodicu i poslovni prostor.
        </p>
        <p className="about-p">
          Osnivač firme Miroslav Nikolić poseduje inžinjersko znanje iz oblasti informacionih tehnologija
          i sve licence MUP-a za planiranje, projektovanje, nadzor, montiranje, održavanje i obuku korisnika
          sistema tehničke zaštite. Zahvaljujući kombinaciji tehničkog znanja i dugogodišnjeg iskustva na terenu,
          svaki sistem koji instaliramo funkcioniše pouzdano godinama.
        </p>
        <p className="about-p">
          Naš pristup je individualan — ne prodajemo gotova rešenja, već saslušamo svaki zahtev i predlažemo
          optimalno rešenje prema potrebama i budžetu klijenta. Radimo sa stanovima, kućama, poslovnim
          prostorima, skladištima, industrijskim objektima i stambenim zajednicama.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-h2">Naše usluge</h2>
        <div className="about-services__grid">
          <div className="about-service">
            <span className="about-service__icon">📷</span>
            <h3>Video nadzor</h3>
            <p>HD analogne i IP digitalne kamere za stanove, kuće, poslovne prostore i industrijske objekte. Pracenje sa mobilnog telefona u realnom vremenu, detekcija pokreta, obaveštavanja i snimanje 24/7.</p>
          </div>
          <div className="about-service">
            <span className="about-service__icon">🔔</span>
            <h3>Alarmni sistemi</h3>
            <p>Žičani i bežični alarmni sistemi vodećih brendova — Paradox, Ajax, Hikvision. Brza intervencija, obaveštavanje SMS-om i pozivom, integracija sa video nadzorom i profesionalnom centralnom stanicom.</p>
          </div>
          <div className="about-service">
            <span className="about-service__icon">🔊</span>
            <h3>Interfoni</h3>
            <p>Audio i video interfoni za stanove, poslovne zgrade i stambene komplekse. Video interfoni sa snimanjem, daljinskim otvaranjem vrata i integracijom sa mobilnim telefonom.</p>
          </div>
          <div className="about-service">
            <span className="about-service__icon">🛰️</span>
            <h3>GPS praćenje</h3>
            <p>Satelitsko praćenje vozila i mašina u realnom vremenu. Evidencija pređene rute, brzine i zaustavljanja. Idealno za fleet menadžment i praćenje voznog parka preduzeća.</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2 className="about-h2">Zašto IT Security?</h2>
        <div className="about-reasons">
          <div className="about-reason">
            <span className="about-reason__icon">🏛️</span>
            <div>
              <h3>100% legalna ugradnja</h3>
              <p>Uz svaki sistem dobijate plan, projekat, tehnički ugovor i prijavu u MUP-u. Naša ugradnja je potpuno u skladu sa Zakonom o privatnom obezbedjenju. Mnogi instalateri preskaču ove korake — kod nas to nije moguće. Bez ovih dokumenata vaš video nadzor nije legalan i snimci se ne mogu koristiti kao dokaz na sudu.</p>
            </div>
          </div>
          <div className="about-reason">
            <span className="about-reason__icon">🛡️</span>
            <div>
              <h3>Garancija 3 godine na ugradnju</h3>
              <p>Na sve sisteme koje mi ugradimo dajemo garanciju od 3 godine — jedna od najdužih na tržištu. Na opremu kupljenu kod nas garancija je 2 godine. U garantnom roku sve intervencije su besplatne, a na servisne pozive odgovaramo u roku od 24 sata.</p>
            </div>
          </div>
          <div className="about-reason">
            <span className="about-reason__icon">💰</span>
            <div>
              <h3>Diskontne cene vrhunske opreme</h3>
              <p>Nudimo opremu renomiranih svetskih proizvođača — Dahua, Hikvision, TVT, Paradox, Ajax, Jablotron, Texecom — po diskontnim cenama direktno od distributera. Zahvaljujući velikim količinama nabavke, nudimo cene koje su znatno niže od maloprodajnih. Pratite naše akcije na sajtu.</p>
            </div>
          </div>
          <div className="about-reason">
            <span className="about-reason__icon">👨‍🔧</span>
            <div>
              <h3>Iskusni i sertifikovani tehničari</h3>
              <p>Naš tim čine iskusni inženjeri i tehničari sa višegodišnjim iskustvom u montaži i servisiranju sistema tehničke zaštite. Redovno se edukujemo i pratimo najnovije trendove i tehnologije u oblasti bezbednosti. Dostupni smo 7 dana u nedelji za servis i tehničku podršku.</p>
            </div>
          </div>
          <div className="about-reason">
            <span className="about-reason__icon">📱</span>
            <div>
              <h3>Moderni sistemi sa mobilnom kontrolom</h3>
              <p>Svi sistemi koje instaliramo podržavaju upravljanje putem mobilnog telefona. Pratite kamere u realnom vremenu, primajte obaveštenja o alarmima i upravljajte sistemom sa bilo kog mesta na svetu. Podešavamo aplikacije i obučavamo korisnike za rad sa sistemom.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2 className="about-h2">Oblasti delovanja</h2>
        <p className="about-p">
          Naše usluge su dostupne na teritoriji Beograda i okolnih gradova. Primarno poslujemo u Beogradu,
          ali izlazimo na teren i na veće udaljenosti za veće sisteme i komercijalne objekte.
          Konsultacija je besplatna — pozovite nas i dogovorimo obilazak lokacije.
        </p>
        <div className="about-areas">
          {["Beograd", "Novi Beograd", "Zemun", "Palilula", "Voždovac", "Rakovica", "Savski Venac", "Stari Grad", "Grocka", "Surčin"].map(a => (
            <span key={a} className="about-area">{a}</span>
          ))}
        </div>
      </div>

      <div className="about-brands">
        <h2 className="about-h2">Brendovi koje zastupamo</h2>
        <div className="about-brands__list">
          {["Dahua", "Hikvision", "TVT", "Imou", "Uniview", "Ajax", "Paradox", "Jablotron", "Texecom", "Comelit"].map(b => (
            <span key={b} className="about-brand">{b}</span>
          ))}
        </div>
      </div>

      <div className="about-cta">
        <h2>Tu smo da vas saslušamo</h2>
        <p>Pozovite nas za besplatnu procenu i preporuku prema vašim potrebama i mogućnostima. Miroslav i ekipa IT Security-ja su tu za vas.</p>
        <a href="tel:063224651" className="about-btn about-btn--primary about-btn--lg">📞 Pozovite 063224651 — Miroslav</a>
      </div>

      <style>{`
        .about-page { max-width: 900px; margin: 0 auto; padding: 0 8px; }
        .about-hero { display: flex; align-items: center; justify-content: space-between; gap: 24px; background: linear-gradient(135deg, #1d3eb8 0%, #152a85 100%); border-radius: 16px; padding: 36px 32px; margin-bottom: 32px; }
        .about-hero__content { flex: 1; }
        .about-hero__label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.6); margin-bottom: 8px; }
        .about-hero__h1 { font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 12px; line-height: 1.2; }
        .about-hero__sub { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.7; margin-bottom: 20px; }
        .about-hero__btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .about-hero__logo { display: flex; flex-direction: column; align-items: center; gap: 6px; flex-shrink: 0; background: rgba(255,255,255,0.08); border-radius: 12px; padding: 20px 24px; }
        .about-hero__logo-img { height: 40px; width: auto; filter: brightness(0) invert(1); max-width: 160px; object-fit: contain; }
        .about-hero__logo-sub { font-size: 18px; font-weight: 700; color: #f6d000; margin: 0; }
        .about-hero__logo-tagline { font-size: 11px; color: rgba(255,255,255,0.6); margin: 0; }
        .about-btn { display: inline-block; padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.15s; }
        .about-btn--primary { background: #f6d000; color: #0b1020; }
        .about-btn--outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.4); }
        .about-btn--lg { font-size: 16px; padding: 14px 32px; }
        .about-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
        .about-stat { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 20px; text-align: center; }
        .about-stat__num { display: block; font-size: 28px; font-weight: 800; color: var(--brand); margin-bottom: 4px; }
        .about-stat__label { font-size: 12px; color: var(--ink-muted); }
        .about-section { margin-bottom: 36px; }
        .about-h2 { font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 16px; }
        .about-p { font-size: 14px; line-height: 1.8; color: var(--ink-muted); margin-bottom: 12px; }
        .about-services__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .about-service { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 20px; }
        .about-service__icon { font-size: 32px; display: block; margin-bottom: 10px; }
        .about-service h3 { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
        .about-service p { font-size: 13px; color: var(--ink-muted); line-height: 1.6; margin: 0; }
        .about-reasons { display: flex; flex-direction: column; gap: 14px; }
        .about-reason { display: flex; gap: 16px; background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 18px; }
        .about-reason__icon { font-size: 28px; flex-shrink: 0; }
        .about-reason h3 { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
        .about-reason p { font-size: 13px; color: var(--ink-muted); line-height: 1.6; margin: 0; }
        .about-areas { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .about-area { background: #f4f5f8; color: var(--ink-muted); font-size: 13px; padding: 5px 14px; border-radius: 20px; }
        .about-brands { margin-bottom: 36px; }
        .about-brands__list { display: flex; flex-wrap: wrap; gap: 10px; }
        .about-brand { background: #eef2ff; color: var(--brand); font-size: 13px; font-weight: 600; padding: 6px 16px; border-radius: 20px; border: 1px solid #c7d2fe; }
        .about-cta { background: linear-gradient(135deg, #1d3eb8 0%, #152a85 100%); border-radius: 14px; padding: 32px; text-align: center; margin-bottom: 32px; }
        .about-cta h2 { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .about-cta p { font-size: 14px; color: rgba(255,255,255,0.8); margin-bottom: 20px; }
        @media (max-width: 768px) {
          .about-hero { flex-direction: column; padding: 24px; }
          .about-hero__h1 { font-size: 22px; }
          .about-hero__logo { width: 100%; flex-direction: row; justify-content: center; }
          .about-stats { grid-template-columns: repeat(2, 1fr); }
          .about-services__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
