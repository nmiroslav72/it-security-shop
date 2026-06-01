// @ts-nocheck
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kamere za video nadzor — prednosti visoke rezolucije 4K, 5MP, 4MP | IT Security Blog",
  description: "Zasto izabrati kameru visoke rezolucije? Poredjenje 2MP, 4MP, 5MP i 4K kamera za video nadzor — kvalitet slike, prepoznavanje lica i identifikacija.",
};

export default function BlogPost() {
  return (
    <article className="blog-post">
      <nav className="blog-breadcrumb">
        <Link href="/">Pocetna</Link>
        <span>/</span>
        <Link href="/blog">Blog</Link>
        <span>/</span>
        <span>Kamere za video nadzor — prednosti visok...</span>
      </nav>

      <div className="blog-post__header">
        <span className="blog-post__cat blog-cat--saveti">Saveti</span>
        <h1 className="blog-post__h1">Kamere za video nadzor — prednosti visoke rezolucije 4K, 5MP, 4MP</h1>
        <p className="blog-post__date">2025-04-28</p>
      </div>

      <div className="blog-post__body">

      <p className="blog-lead">
        Rezolucija kamere je najvazniji faktor kvaliteta video nadzora. Veca rezolucija
        znaci jasniju sliku, bolju mogucnost identifikacije lica i tablica, i vise detalja
        pri uvecavanju snimka.
      </p>

      <h2>Poredjenje rezolucija kamera</h2>
      <ul>
        <li><strong>2MPX (1080p)</strong> — Full HD standard, dovoljan za manjecprostore i hodnike</li>
        <li><strong>4MPX (2560x1440)</strong> — odlican balans kvaliteta i cene, popularan za kuce i stanove</li>
        <li><strong>5MPX (2560x1920)</strong> — nase najprodavanije, znatno bolja slika od 1080p</li>
        <li><strong>8MPX / 4K (3840x2160)</strong> — maksimalni kvalitet, idealan za parkinge i velike prostore</li>
      </ul>

      <h2>Prednosti kamera visoke rezolucije</h2>
      <p>
        Kamera od 5MPX daje vise od dva puta vise piksela od Full HD kamere.
        To znaci da mozete uvecati deo snimka i jasno videti lice osobe, broj tablice
        ili druge detalje koji su na Full HD snimku nejasni ili neprepoznatljivi.
      </p>

      <h2>Kada je veca rezolucija obavezna?</h2>
      <ul>
        <li>Parking i ulazna vrata — identifikacija tablica i lica</li>
        <li>Poslovni prostori — pracenje zaposlenih i kupaca</li>
        <li>Magacini i hale — pokrivenost velikih povrsina jednom kamerom</li>
        <li>Bankovi i zlatare — maksimalna preciznost snimka</li>
      </ul>

      <h2>Trend na trzistu</h2>
      <p>
        Prema istrazivanjiema IPVM, kamere od 5MPX i vise preuzimaju vodece mesto na trzistu.
        Cena visokoresolucionih kamera je znacajno pala poslednjih godina, pa je danas
        razlika u ceni izmedju 2MPX i 5MPX kamera minimalna u odnosu na razliku u kvalitetu.
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
