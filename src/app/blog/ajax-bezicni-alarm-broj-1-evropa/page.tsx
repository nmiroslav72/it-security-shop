import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ajax bezicni alarm — broj 1 bezicni alarmni sistem u Evropi | IT Security Blog",
  description: "Zasto je Ajax bezicni alarm najprodavaniji u Evropi? Karakteristike, prednosti i zasto je Ajax idealan izbor za zastitu doma i poslovnog prostora.",
};

export default function BlogPost() {
  return (
    <article className="blog-post">
      <nav className="blog-breadcrumb">
        <Link href="/">Pocetna</Link>
        <span>/</span>
        <Link href="/blog">Blog</Link>
        <span>/</span>
        <span>Ajax bezicni alarm — broj 1 bezicni alar...</span>
      </nav>

      <div className="blog-post__header">
        <span className="blog-post__cat blog-cat--novosti">Novosti</span>
        <h1 className="blog-post__h1">Ajax bezicni alarm — broj 1 bezicni alarmni sistem u Evropi</h1>
        <p className="blog-post__date">2025-04-02</p>
      </div>

      <div className="blog-post__body">

      <p className="blog-lead">
        Ajax Systems je ukrajinskа kompanija koja je za kratko vreme postala broj jedan
        na trzistu bezicnih alarmnih sistema u Evropi. Ajax alarm kombinuje vrhunsku
        tehnologiju, jednostavnu instalaciju i pouzdanost koja nema premca.
      </p>

      <h2>Zasto je Ajax alarm broj 1 u Evropi?</h2>
      <ul>
        <li><strong>Sopstveni radio protokol</strong> — Jeweller protokol sa dometom do 2000m i kriptovanom komunikacijom</li>
        <li><strong>Baterije traju do 7 godina</strong> — senzori imaju izuzetno dug vek baterije</li>
        <li><strong>Otpornost na ometanje</strong> — sistem detektuje pokusaje ometanja signala i odmah javlja korisniku</li>
        <li><strong>Mobilna aplikacija</strong> — intuitivna aplikacija za upravljanje sistemom</li>
        <li><strong>Profesionalni dizajn</strong> — Ajax uredjaji izgledaju kao premium proizvodi</li>
      </ul>

      <h2>Karakteristike Ajax alarma</h2>
      <p>
        Ajax hub je centralna jedinica koja komunicira sa svim senzorima bezicno.
        Na jedan hub mozete dodati do 100 uredjaja — senzore pokreta, magnetne kontakte,
        detektore dima, sirene i jos mnogo toga. Sve se upravlja putem Ajax aplikacije.
      </p>

      <h2>Ajax MotionCam — senzor sa kamerom</h2>
      <p>
        Ajax MotionCam je revolucionaran senzor pokreta sa ugradenom kamerom.
        Kada se aktivira alarm, senzor pravi fotografiju i salje je korisniku.
        Na ovaj nacin mozete odmah videti da li je alarm lazni ili pravi.
      </p>

      <h2>Za koga je Ajax idealan?</h2>
      <ul>
        <li>Stanovi i kuce — brza instalacija bez busenja i kablova</li>
        <li>Vikendice i objekti bez struje — duge baterije i solarne opcije</li>
        <li>Iznajmljeni prostori — lako montiranje i demontiranje</li>
        <li>Poslovni prostori — profesionalno resenje sa pratnjom obezbedjenja</li>
      </ul>

      </div>

      <div className="blog-post__cta">
        <h3>Trebate video nadzor ili alarmni sistem?</h3>
        <p>IT Security — prodaja i ugradnja u Beogradu. Licencirani tehnicari, garancija 3 godine.</p>
        <a href="tel:063224651" className="blog-post__btn">📞 063224651</a>
        <Link href="/shop" className="blog-post__btn blog-post__btn--outline">Pogledaj ponudu</Link>
      </div>

      <style>{`
        .blog-post { max-width: 780px; margin: 0 auto; padding: 0 8px; }
        .blog-breadcrumb { display: flex; gap: 8px; font-size: 13px; color: var(--ink-muted); margin-bottom: 20px; flex-wrap: wrap; }
        .blog-breadcrumb a { color: var(--brand); text-decoration: none; }
        .blog-post__header { margin-bottom: 28px; }
        .blog-post__cat { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 4px; display: inline-block; margin-bottom: 12px; }
        .blog-cat--saveti { background: #dbeafe; color: #1e40af; }
        .blog-cat--novosti { background: #fce7f3; color: #9d174d; }
        .blog-post__h1 { font-size: 26px; font-weight: 700; color: var(--ink); line-height: 1.3; margin-bottom: 8px; }
        .blog-post__date { font-size: 13px; color: var(--ink-muted); }
        .blog-post__body h2 { font-size: 19px; font-weight: 700; color: var(--ink); margin: 24px 0 10px; }
        .blog-post__body p { font-size: 14px; line-height: 1.8; color: var(--ink-muted); margin-bottom: 14px; }
        .blog-lead { font-size: 16px !important; color: var(--ink) !important; font-weight: 500; border-left: 4px solid var(--brand); padding-left: 16px; margin-bottom: 24px !important; }
        .blog-post__body ul { padding-left: 20px; margin-bottom: 14px; }
        .blog-post__body ul li { font-size: 14px; line-height: 1.8; color: var(--ink-muted); margin-bottom: 6px; }
        .blog-post__cta { background: linear-gradient(135deg, #1d3eb8 0%, #152a85 100%); border-radius: 12px; padding: 24px; text-align: center; margin-top: 40px; }
        .blog-post__cta h3 { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .blog-post__cta p { font-size: 13px; color: rgba(255,255,255,0.8); margin-bottom: 16px; }
        .blog-post__btn { display: inline-block; background: #f6d000; color: #0b1020; font-size: 14px; font-weight: 700; padding: 10px 24px; border-radius: 8px; text-decoration: none; margin: 0 6px; }
        .blog-post__btn--outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.4); }
        @media (max-width: 640px) { .blog-post__h1 { font-size: 20px; } }
      `}</style>
    </article>
  );
}
