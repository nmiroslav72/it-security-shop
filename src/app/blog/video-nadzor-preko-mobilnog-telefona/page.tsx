// @ts-nocheck
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Video nadzor preko mobilnog telefona — pracenje kamera sa bilo kog mesta | IT Security Blog",
  description: "Saznajte kako da gledate kamere za video nadzor sa mobilnog telefona u realnom vremenu. Dahua i Hikvision aplikacije, podesavanje i saveti.",
};

export default function BlogPost() {
  return (
    <article className="blog-post">
      <nav className="blog-breadcrumb">
        <Link href="/">Pocetna</Link>
        <span>/</span>
        <Link href="/blog">Blog</Link>
        <span>/</span>
        <span>Video nadzor preko mobilnog telefona — p...</span>
      </nav>

      <div className="blog-post__header">
        <span className="blog-post__cat blog-cat--saveti">Saveti</span>
        <h1 className="blog-post__h1">Video nadzor preko mobilnog telefona — pracenje kamera sa bilo kog mesta</h1>
        <p className="blog-post__date">2025-05-10</p>
      </div>

      <div className="blog-post__body">

      <p className="blog-lead">
        Moderna tehnologija omogucava da pratite vas video nadzor sa mobilnog telefona
        sa bilo kog mesta na svetu — dok ste na poslu, putovanju ili odmoru.
        Sve sto vam treba je pametni telefon i internet konekcija.
      </p>

      <h2>Kako funkcionise pracenje kamera sa mobilnog?</h2>
      <p>
        IP kamere i NVR/DVR snimaci se povezuju na lokalnu mrezu koja ima pristup internetu.
        Putem mobilne aplikacije mozete u realnom vremenu pratiti sliku sa svih kamera,
        pregledati snimke, primati obavestenja o detekciji pokreta i upravljati sistemom.
      </p>

      <h2>Koje aplikacije koristiti?</h2>
      <ul>
        <li><strong>DMSS (Dahua)</strong> — aplikacija za Dahua kamere i snimace, dostupna za iOS i Android</li>
        <li><strong>Hik-Connect (Hikvision)</strong> — aplikacija za Hikvision opremu sa naprednim funkcijama</li>
        <li><strong>iDMSS Plus</strong> — napredna Dahua aplikacija za profesionalne korisnike</li>
      </ul>

      <h2>Kolika brzina interneta je potrebna?</h2>
      <p>
        Za pracenje jedne kamere Full HD rezolucije (2MPX) potrebno je oko 2 Mbita upload brzine
        na mestu gde se nalazi snimac. Za 4 kamere potrebno je oko 8 Mbita uploada.
        Mozete gledati kamere i sa slabijim internetom ali ce kvalitet slike biti nizi.
      </p>

      <h2>Obavestenja o detekciji pokreta</h2>
      <p>
        Podesite da vas sistem salje push notifikaciju na mobilni telefon svaki put kada
        kamera detektuje pokret, osobu ili vozilo. Na ovaj nacin imate zastitu 24/7
        i odmah znate ako se nesto desi.
      </p>

      <h2>Saveti za stabilno pracenje</h2>
      <ul>
        <li>Koristite stabilan internet sa fiksnom IP adresom ili DDNS servisom</li>
        <li>Podesite P2P (cloud) konekciju za jednostavno povezivanje bez otvaranja portova</li>
        <li>Smanjite rezoluciju za mobilni pregled da ustediete na protoku</li>
        <li>Ukljucite snimanje na SD karticu za lokalni backup</li>
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
