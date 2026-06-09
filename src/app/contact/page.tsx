import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — IT Security video nadzor Beograd",
  description: "Kontaktirajte IT Security za video nadzor, alarmne sisteme i interfone u Beogradu. Adresa: Sutjeska 7, lok. 50c, Palilula, Beograd. Tel: 063224651.",
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <h1 className="contact-h1">Kontakt — IT Security Beograd</h1>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-card">
            <span className="contact-card__icon">📍</span>
            <div>
              <h2 className="contact-card__title">Adresa</h2>
              <p>Sutjeska 7, lokal 50c</p>
              <p>Palilula, Beograd</p>
            </div>
          </div>

          <div className="contact-card">
            <span className="contact-card__icon">📞</span>
            <div>
              <h2 className="contact-card__title">Telefon</h2>
              <a href="tel:063224651" className="contact-link">063224651</a>
              <p className="contact-hours">Pon-Ned: 09:00 - 21:00</p>
            </div>
          </div>

          <div className="contact-card">
            <span className="contact-card__icon">✉️</span>
            <div>
              <h2 className="contact-card__title">Email</h2>
              <a href="mailto:nmiroslav72@yahoo.com" className="contact-link">nmiroslav72@yahoo.com</a>
            </div>
          </div>

          <div className="contact-card">
            <span className="contact-card__icon">🕐</span>
            <div>
              <h2 className="contact-card__title">Radno vreme</h2>
              <p>Ponedeljak - Petak: 10:00 - 16:00</p>
              <p>Subota: 10:00 - 14:00</p>
              <p>Nedelja: <strong>Neradimo</strong></p>
              <p className="contact-warning">⚠️ Molimo vas da pre dolaska pozovete jer smo cesto na terenu.</p>
            </div>
          </div>

          <div className="contact-card">
            <span className="contact-card__icon">🚗</span>
            <div>
              <h2 className="contact-card__title">Dolazak</h2>
              <p>Parking ispred objekta. Javni prevoz: autobus 26, 27, 37.</p>
            </div>
          </div>
        </div>

        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.5!2d20.4789!3d44.8178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa5b0000001%3A0x1!2sSutjeska+7%2C+Beograd!5e0!3m2!1ssr!2srs!4v1"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="IT Security lokacija - Sutjeska 7, Palilula, Beograd"
          />
          <a
            href="https://www.google.com/maps/search/Sutjeska+7+Palilula+Beograd"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-directions"
          >
            📍 Otvori u Google Maps →
          </a>
        </div>
      </div>

      <div className="contact-cta">
        <h2>Besplatna procena i ponuda</h2>
        <p>Pozovite nas za besplatnu procenu i ponudu za video nadzor, alarmni sistem ili interfon. Dolazimo na teren u Beogradu i okolini.</p>
        <a href="tel:063224651" className="contact-cta__btn">📞 Pozovite 063224651</a>
      </div>

      <style>{`
        .contact-page { max-width: 1000px; margin: 0 auto; padding: 0 8px; }
        .contact-h1 { font-size: 26px; font-weight: 700; color: var(--ink); margin-bottom: 28px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 40px; }
        .contact-info { display: flex; flex-direction: column; gap: 14px; }
        .contact-card { display: flex; gap: 14px; background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 16px; }
        .contact-card__icon { font-size: 28px; flex-shrink: 0; }
        .contact-card__title { font-size: 13px; font-weight: 700; color: var(--ink); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .contact-card p { font-size: 14px; color: var(--ink-muted); line-height: 1.6; margin: 0; }
        .contact-link { font-size: 16px; font-weight: 700; color: var(--brand); text-decoration: none; display: block; }
        .contact-link:hover { text-decoration: underline; }
        .contact-hours { font-size: 12px; color: var(--ink-muted); margin-top: 2px; }
        .contact-map { display: flex; flex-direction: column; gap: 12px; }
        .contact-directions { display: inline-block; background: var(--brand); color: #fff; font-size: 14px; font-weight: 600; padding: 10px 20px; border-radius: 8px; text-decoration: none; text-align: center; }
        .contact-directions:hover { opacity: 0.9; }
        .contact-cta { background: linear-gradient(135deg, #1d3eb8 0%, #152a85 100%); border-radius: 14px; padding: 32px; text-align: center; margin-bottom: 32px; }
        .contact-cta h2 { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .contact-cta p { font-size: 14px; color: rgba(255,255,255,0.8); margin-bottom: 20px; max-width: 500px; margin-left: auto; margin-right: auto; }
        .contact-warning { font-size: 12px; color: #b45309; background: #fff8e1; border-radius: 6px; padding: 6px 10px; margin-top: 6px; }
        .contact-cta__btn { display: inline-block; background: #f6d000; color: #0b1020; font-size: 16px; font-weight: 700; padding: 14px 32px; border-radius: 8px; text-decoration: none; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } .contact-h1 { font-size: 20px; } }
      `}</style>
    </div>
  );
}
