import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IP Video Interfoni za Zgrade — IT Security Beograd",
  description: "Savremeni IP video interfoni za stambene zgrade. Prepoznavanje lica, mobilna aplikacija, srpski jezik. Od 159 po stanu. Besplatna prezentacija na vasoj adresi. Tel: 063224651.",
};

export default function InterfoniZaZgradePage() {
  return (
    <div className="iz-page">

      <div className="iz-hero">
        <div className="iz-hero__label">IT Security — Tehnicko obezbedenje</div>
        <h1 className="iz-hero__h1">IP Video Interfoni za Zgrade</h1>
        <p className="iz-hero__sub">Pametna resenja za sigurnost vase zgrade — srpski jezik, lokalna podrska i servis</p>
        <div className="iz-hero__badges">
          <span className="iz-badge">✓ Uvoznici</span>
          <span className="iz-badge">✓ Srpski jezik</span>
          <span className="iz-badge">✓ Lokalna podrska</span>
          <span className="iz-badge">✓ Garancija 3 god.</span>
        </div>
        <div className="iz-hero__btns">
          <a href="tel:063224651" className="iz-btn iz-btn--primary">📞 063224651 — Zakazite prezentaciju</a>
          <a href="#cena" className="iz-btn iz-btn--outline">Pogledaj cene →</a>
        </div>
      </div>

      <div className="iz-partners">
        <div className="iz-partners__icon">🤝</div>
        <div className="iz-partners__content">
          <h2 className="iz-partners__title">Radimo sa investitorima i izvodzacima radova</h2>
          <p className="iz-partners__text">
            Ako ste investitor ili izvodzac radova koji gradi ili rekonstruise stambeni objekat — tu smo za vas.
            Nudimo kompletan paket: projekat, isporuku opreme i ugradnju po najpovoljnijim cenama.
            Svaki projekat tretiramo individualno sa posebnim uslovima saradnje.
          </p>
          <div className="iz-partners__tags">
            <span>🏗️ Novogradnja</span>
            <span>🔄 Rekonstrukcija</span>
            <span>🏢 Stambene zajednice</span>
            <span>📋 Projektna dokumentacija</span>
          </div>
          <a href="tel:063224651" className="iz-btn iz-btn--primary iz-btn--mt">Kontaktirajte nas za partnerstvo</a>
        </div>
      </div>

      <div className="iz-section">
        <h2 className="iz-h2">Sta dobija vasa zgrada?</h2>
        <p className="iz-p">Za razliku od zastarelih analognih resenja, nas IP sistem garantuje stabilan rad, kristalno jasan video i dvosmerni zvuk — i to po ceni koja vas nece iznenaditi.</p>
        <div className="iz-features">
          <div className="iz-feature">
            <span className="iz-feature__icon">📋</span>
            <h3>Spisak stanara</h3>
            <p>Na pocetnom ekranu jasno i pregledno prikazan kompletan spisak stanara — bez zabune, bez trazenja po dugmicima.</p>
          </div>
          <div className="iz-feature">
            <span className="iz-feature__icon">📱</span>
            <h3>Slim Touch Monitor</h3>
            <p>Elegantan dizajn sa osetljivim ekranom koji se uklapa u svaki enterijer. Svaki stanar unosi sopstveno ime i sifru direktno sa monitora.</p>
          </div>
          <div className="iz-feature">
            <span className="iz-feature__icon">🤖</span>
            <h3>AI Glasovna Asistencija</h3>
            <p>Sistem glasovno vodi posetioce kroz pozivanje — jasno i prirodno, bez potrebe za uputstvima.</p>
          </div>
          <div className="iz-feature">
            <span className="iz-feature__icon">📹</span>
            <h3>Video Nadzor u Realnom Vremenu</h3>
            <p>Funkcija Monitor — pratite ulaz u svakom trenutku, sa bilo kog mesta, direktno sa telefona.</p>
          </div>
          <div className="iz-feature">
            <span className="iz-feature__icon">📲</span>
            <h3>Tuya Smart Aplikacija</h3>
            <p>Povezite interfon na mobilnu aplikaciju i otključavajte vrata, primajte pozive i upravljajte pristupom — gde god da se nalazite.</p>
          </div>
          <div className="iz-feature">
            <span className="iz-feature__icon">😊</span>
            <h3>Prepoznavanje Lica</h3>
            <p>Maksimalna bezbednost i brz pristup bez kljuca — sistem automatski prepoznaje stanare.</p>
          </div>
        </div>
      </div>

      <div className="iz-unlock">
        <h2 className="iz-h2 iz-h2--white">5 nacina otključavanja vrata</h2>
        <div className="iz-unlock__grid">
          <div className="iz-unlock__item"><span className="iz-unlock__icon">🔢</span><span className="iz-unlock__label">PIN Sifra</span></div>
          <div className="iz-unlock__item"><span className="iz-unlock__icon">💳</span><span className="iz-unlock__label">RFID Kartica</span></div>
          <div className="iz-unlock__item"><span className="iz-unlock__icon">😊</span><span className="iz-unlock__label">Prepoznavanje lica</span></div>
          <div className="iz-unlock__item"><span className="iz-unlock__icon">📱</span><span className="iz-unlock__label">Mobilna aplikacija</span></div>
          <div className="iz-unlock__item"><span className="iz-unlock__icon">📺</span><span className="iz-unlock__label">Video poziv na monitor</span></div>
        </div>
      </div>

      <div className="iz-section">
        <h2 className="iz-h2">Uredjaji sistema</h2>
        <div className="iz-devices">
          <div className="iz-device">
            <div className="iz-device__num">1</div>
            <h3>Spoljna jedinica sa 10 ekranom</h3>
            <p>LCD ekran visoke rezolucije sa osetljivim dodirnim interfejsom. Intuitivni Touch Screen sa Smart Keypad-om sa pozadinskim osvetljenjem.</p>
          </div>
          <div className="iz-device">
            <div className="iz-device__num">2</div>
            <h3>Unutrasnji monitor (WiFi)</h3>
            <p>Slim touch ekran za svaki stan. Upravljanje mobilnim telefonom, video monitoring u realnom vremenu, interkom komunikacija sa kristalno cistim zvukom.</p>
          </div>
          <div className="iz-device">
            <div className="iz-device__num">3</div>
            <h3>Mrezna oprema</h3>
            <p>PoE switch, interfonski prihvatnik, rek orman, napajanje — sve sto je potrebno za stabilan i pouzdan rad sistema.</p>
          </div>
        </div>
      </div>

      <div className="iz-section" id="cena">
        <h2 className="iz-h2">Primer kalkulacije — zgrada sa 24 stana</h2>
        <p className="iz-p iz-p--center">Sve cene su sa PDV-om</p>
        <div className="iz-pricing">
          <div className="iz-price-card">
            <div className="iz-price-card__badge">Vase kabliranje</div>
            <div className="iz-price-card__price">159 €<span>/po stanu</span></div>
            <div className="iz-price-card__total">24 × 159 € = 3.816 €</div>
            <ul className="iz-price-card__list">
              <li>✓ 24 monitora (Wi-Fi)</li>
              <li>✓ 1 spoljna jedinica</li>
              <li>✓ 1 rek orman</li>
              <li>✓ 1 PoE switch 24 porta</li>
              <li>✓ 1 interfonski prihvatnik</li>
              <li>✓ Napajanje za interfon</li>
              <li>✓ Montaza i pustanje u rad</li>
            </ul>
            <a href="tel:063224651" className="iz-btn iz-btn--primary iz-btn--full">Zatrazi ponudu</a>
          </div>
          <div className="iz-price-card iz-price-card--featured">
            <div className="iz-price-card__badge iz-price-card__badge--featured">Kljuc u ruke</div>
            <div className="iz-price-card__price">235 €<span>/po stanu</span></div>
            <div className="iz-price-card__total">24 × 235 € = 5.640 €</div>
            <ul className="iz-price-card__list">
              <li>✓ 24 monitora (Wi-Fi)</li>
              <li>✓ 1 spoljna jedinica</li>
              <li>✓ 1 rek orman</li>
              <li>✓ 1 PoE switch 24 porta</li>
              <li>✓ 1 interfonski prihvatnik</li>
              <li>✓ Napajanje za interfon</li>
              <li>✓ Montaza i pustanje u rad</li>
              <li>✓ UTP kabal Full Bakar Cat6</li>
              <li>✓ Razvlacenje kabla</li>
            </ul>
            <a href="tel:063224651" className="iz-btn iz-btn--primary iz-btn--full">Zatrazi ponudu</a>
          </div>
        </div>
        <div className="iz-warranty">
          <div className="iz-warranty__item"><span className="iz-warranty__num">3</span><span>godine garancije na monitore</span></div>
          <div className="iz-warranty__item"><span className="iz-warranty__num">2</span><span>godine garancije na spoljnu jedinicu</span></div>
        </div>
      </div>

      <div className="iz-services">
        <h2 className="iz-h2 iz-h2--white">Nase usluge</h2>
        <div className="iz-services__grid">
          <div className="iz-service"><span className="iz-service__icon">📜</span><h3>Licence</h3><p>Posedujemo sve licence MUP-a za projektovanje i montazu sistema tehnicke zastite.</p></div>
          <div className="iz-service"><span className="iz-service__icon">📐</span><h3>Projektovanje</h3><p>Izradujemo kompletan projekat interfonskog sistema u skladu sa zakonom.</p></div>
          <div className="iz-service"><span className="iz-service__icon">🔧</span><h3>Montaza</h3><p>Profesionalna ugradnja i pustanje sistema u rad sa obukom stanara.</p></div>
        </div>
      </div>

      <div className="iz-cta">
        <h2>Zakazite besplatnu prezentaciju</h2>
        <p>Dolazimo KOD VAS na adresu sa kompletnom opremom — uzivo vidite sve prednosti sistema pre bilo kakve odluke. Sigurni smo da cemo zajedno naci pravo resenje za vasu zgradu.</p>
        <div className="iz-cta__btns">
          <a href="tel:063224651" className="iz-btn iz-btn--yellow">📞 063224651 — Miroslav</a>
          <a href="mailto:diskontvideonadzora@diskontvideonadzora.rs" className="iz-btn iz-btn--outline-dark">✉️ diskontvideonadzora@diskontvideonadzora.rs</a>
        </div>
      </div>

      <style>{`
        .iz-page { max-width: 920px; margin: 0 auto; padding: 0 8px; }
        .iz-hero { background: linear-gradient(135deg, #1d3eb8 0%, #0d2070 100%); border-radius: 16px; padding: 40px 32px; margin-bottom: 28px; text-align: center; }
        .iz-hero__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.6); margin-bottom: 10px; }
        .iz-hero__h1 { font-size: 32px; font-weight: 800; color: #fff; margin-bottom: 12px; line-height: 1.2; }
        .iz-hero__sub { font-size: 16px; color: rgba(255,255,255,0.8); margin-bottom: 20px; }
        .iz-hero__badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 24px; }
        .iz-badge { background: rgba(255,255,255,0.12); color: #fff; font-size: 12px; padding: 4px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); }
        .iz-hero__btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
        .iz-partners { display: flex; gap: 20px; align-items: flex-start; background: #fff8e1; border: 2px solid #f59e0b; border-radius: 14px; padding: 24px; margin-bottom: 36px; }
        .iz-partners__icon { font-size: 40px; flex-shrink: 0; }
        .iz-partners__title { font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .iz-partners__text { font-size: 14px; line-height: 1.7; color: var(--ink-muted); margin-bottom: 12px; }
        .iz-partners__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .iz-partners__tags span { background: #fef3c7; color: #92400e; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; }
        .iz-btn { display: inline-block; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.15s; }
        .iz-btn--primary { background: #f6d000; color: #0b1020; }
        .iz-btn--outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.4); }
        .iz-btn--yellow { background: #f6d000; color: #0b1020; font-size: 16px; padding: 14px 32px; }
        .iz-btn--outline-dark { background: transparent; color: var(--brand); border: 2px solid var(--brand); font-size: 15px; padding: 13px 24px; }
        .iz-btn--full { width: 100%; text-align: center; margin-top: 16px; display: block; }
        .iz-btn--mt { margin-top: 4px; }
        .iz-section { margin-bottom: 40px; }
        .iz-h2 { font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 14px; }
        .iz-h2--white { color: #fff; }
        .iz-p { font-size: 14px; line-height: 1.8; color: var(--ink-muted); margin-bottom: 20px; }
        .iz-p--center { text-align: center; }
        .iz-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .iz-feature { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 20px; }
        .iz-feature__icon { font-size: 32px; display: block; margin-bottom: 10px; }
        .iz-feature h3 { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
        .iz-feature p { font-size: 13px; color: var(--ink-muted); line-height: 1.6; margin: 0; }
        .iz-unlock { background: linear-gradient(135deg, #1d3eb8 0%, #0d2070 100%); border-radius: 14px; padding: 32px; margin-bottom: 40px; text-align: center; }
        .iz-unlock__grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; margin-top: 20px; }
        .iz-unlock__item { background: rgba(255,255,255,0.1); border-radius: 10px; padding: 16px 20px; display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 120px; }
        .iz-unlock__icon { font-size: 28px; }
        .iz-unlock__label { font-size: 12px; font-weight: 600; color: #fff; text-align: center; }
        .iz-devices { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .iz-device { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 20px; }
        .iz-device__num { width: 36px; height: 36px; background: var(--brand); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; margin-bottom: 10px; }
        .iz-device h3 { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
        .iz-device p { font-size: 13px; color: var(--ink-muted); line-height: 1.6; margin: 0; }
        .iz-pricing { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .iz-price-card { background: #fff; border: 2px solid rgba(0,0,0,0.1); border-radius: 14px; padding: 24px; }
        .iz-price-card--featured { border-color: var(--brand); box-shadow: 0 4px 20px rgba(29,62,184,0.15); }
        .iz-price-card__badge { font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 10px; }
        .iz-price-card__badge--featured { color: var(--brand); }
        .iz-price-card__price { font-size: 36px; font-weight: 800; color: var(--brand); }
        .iz-price-card__price span { font-size: 14px; font-weight: 400; color: var(--ink-muted); }
        .iz-price-card__total { font-size: 14px; color: var(--ink-muted); margin-bottom: 16px; }
        .iz-price-card__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
        .iz-price-card__list li { font-size: 13px; color: var(--ink-muted); }
        .iz-warranty { display: flex; justify-content: center; gap: 32px; margin-top: 20px; }
        .iz-warranty__item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ink-muted); }
        .iz-warranty__num { font-size: 28px; font-weight: 800; color: var(--brand); }
        .iz-services { background: linear-gradient(135deg, #1d3eb8 0%, #0d2070 100%); border-radius: 14px; padding: 32px; margin-bottom: 40px; }
        .iz-services__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 20px; }
        .iz-service { background: rgba(255,255,255,0.1); border-radius: 10px; padding: 20px; }
        .iz-service__icon { font-size: 28px; display: block; margin-bottom: 8px; }
        .iz-service h3 { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .iz-service p { font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.6; margin: 0; }
        .iz-cta { background: #fff; border: 2px solid var(--brand); border-radius: 14px; padding: 32px; text-align: center; margin-bottom: 40px; }
        .iz-cta h2 { font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .iz-cta p { font-size: 14px; color: var(--ink-muted); line-height: 1.7; margin-bottom: 20px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .iz-cta__btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
        @media (max-width: 768px) {
          .iz-hero__h1 { font-size: 22px; }
          .iz-hero { padding: 24px; }
          .iz-partners { flex-direction: column; }
          .iz-features { grid-template-columns: 1fr; }
          .iz-devices { grid-template-columns: 1fr; }
          .iz-pricing { grid-template-columns: 1fr; }
          .iz-services__grid { grid-template-columns: 1fr; }
          .iz-warranty { flex-direction: column; align-items: center; gap: 16px; }
        }
      `}</style>
    </div>
  );
}
