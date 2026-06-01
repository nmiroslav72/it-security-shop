import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kako izabrati video nadzor — kompletni vodic za kupovinu | IT Security Blog",
  description: "Vodic za izbor sistema video nadzora — kako izabrati kamere, snimac i hard disk prema vasim potrebama i budzetu. Saveti strucnjaka.",
};

export default function BlogPost() {
  return (
    <article className="blog-post">
      <nav className="blog-breadcrumb">
        <Link href="/">Pocetna</Link>
        <span>/</span>
        <Link href="/blog">Blog</Link>
        <span>/</span>
        <span>Kako izabrati video nadzor — kompletni v...</span>
      </nav>

      <div className="blog-post__header">
        <span className="blog-post__cat blog-cat--saveti">Saveti</span>
        <h1 className="blog-post__h1">Kako izabrati video nadzor — kompletni vodic za kupovinu</h1>
        <p className="blog-post__date">2025-04-15</p>
      </div>

      <div className="blog-post__body">

      <p className="blog-lead">
        Izbor sistema video nadzora moze biti komplikovan ako ne znate sta traziti.
        Ovaj vodic ce vam pomoci da izaberete pravi sistem prema vasim potrebama i budzetu.
      </p>

      <h2>1. Odredite broj kamera</h2>
      <p>
        Procenite koliko ulaza, prolaza i prostorija zelite da nadzirete. Za stan je
        obicno dovoljan sistem sa 2-4 kamere. Za kucu 4-8 kamera, a za poslovni prostor
        zavisi od velicine i specificnih potreba.
      </p>

      <h2>2. Izaberite tip kamera</h2>
      <ul>
        <li><strong>HD analogne kamere</strong> — povoljnije, jednostavno kablovanje, dobar kvalitet</li>
        <li><strong>IP kamere</strong> — visi kvalitet slike, pametne funkcije, mrežno povezivanje</li>
        <li><strong>WiFi kamere</strong> — idealne gde nije moguce razvlaciti kablove</li>
        <li><strong>PTZ kamere</strong> — za pracenje velikih povrsina, motorizovani zum</li>
      </ul>

      <h2>3. Izaberite snimac</h2>
      <p>
        DVR snimac je za HD analogne kamere, a NVR za IP kamere. Vazno je da snimac
        podrzava istu rezoluciju kao kamere — ako imate 5MPX kamere, snimac mora
        podrzavati 5MPX snimanje.
      </p>

      <h2>4. Kapacitet hard diska</h2>
      <p>
        Po Zakonu o bezbednosti obavezno je cuvati snimke 30 dana. Za 4 kamere od 2MPX
        sa snimanjem 24/7 potrebno je oko 1TB. Za 4 kamere od 5MPX preporucujemo 2TB.
      </p>

      <h2>5. Profesionalna ugradnja</h2>
      <p>
        Ugradnja mora biti obavljena od strane licencirane firme sa planom, projektom
        i prijavom u MUP-u. Nelegalni video nadzor nosi ozbiljne pravne posledice.
        IT Security poseduje sve potrebne licence.
      </p>

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
