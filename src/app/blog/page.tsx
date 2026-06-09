import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — IT Security saveti za video nadzor i bezbednost",
  description: "Korisni saveti i vodiči za video nadzor, alarmne sisteme i tehničku zaštitu. Naučite kako da izaberete pravu opremu, legalno instalirate sistem i pratite kamere sa mobilnog.",
};

const POSTS = [
  {
    slug: "video-nadzor-preko-mobilnog-telefona",
    title: "Video nadzor preko mobilnog telefona — pratite kamere sa bilo kog mesta",
    excerpt: "Saznajte kako da gledate kamere za video nadzor sa mobilnog telefona u realnom vremenu. Dahua i Hikvision aplikacije, podesavanje i saveti.",
    category: "Saveti",
    catClass: "saveti",
    date: "10. maj 2025.",
    readTime: "5 min",
    img: "/uploads/prednosti_ip_kamere.png",
  },
  {
    slug: "kamere-visoke-rezolucije-prednosti",
    title: "Kamere visoke rezolucije — prednosti 4K, 5MP i 4MP video nadzora",
    excerpt: "Zašto izabrati kameru visoke rezolucije? Poređenje 2MP, 4MP, 5MP i 4K kamera — kvalitet slike, prepoznavanje lica i identifikacija.",
    category: "Saveti",
    catClass: "saveti",
    date: "28. apr 2025.",
    readTime: "4 min",
    img: "/uploads/rezolucija-kamera-zastupljnost.gif",
  },
  {
    slug: "kako-izabrati-video-nadzor",
    title: "Kako izabrati video nadzor — kompletan vodič za kupovinu",
    excerpt: "Vodič za izbor sistema video nadzora — kako izabrati kamere, snimač i hard disk prema vašim potrebama i budžetu.",
    category: "Saveti",
    catClass: "saveti",
    date: "15. apr 2025.",
    readTime: "6 min",
    img: "/uploads/prednosti_ip_kamere.png",
  },
  {
    slug: "ajax-bezicni-alarm-broj-1-evropa",
    title: "Ajax bežični alarm — broj 1 bežični alarmni sistem u Evropi",
    excerpt: "Zašto je Ajax alarm najprodavaniji u Evropi? Karakteristike, prednosti i zašto je Ajax idealan izbor za zaštitu doma.",
    category: "Novosti",
    catClass: "novosti",
    date: "2. apr 2025.",
    readTime: "5 min",
    img: "/uploads/boma/HUB_2_PLUS_01.png",
  },
];

export default function BlogPage() {
  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1 className="blog-h1">Blog — Saveti i vodiči</h1>
        <p className="blog-sub">Korisni tekstovi o video nadzoru, alarmnim sistemima i tehničkoj zaštiti od naših stručnjaka.</p>
      </div>

      <div className="blog-featured">
        <Link href={"/blog/" + POSTS[0].slug} className="blog-featured__card">
          <div className="blog-featured__img-wrap">
            <img src={POSTS[0].img} alt={POSTS[0].title} className="blog-featured__img" />
          </div>
          <div className="blog-featured__body">
            <span className={"blog-cat blog-cat--" + POSTS[0].catClass}>{POSTS[0].category}</span>
            <h2 className="blog-featured__title">{POSTS[0].title}</h2>
            <p className="blog-featured__excerpt">{POSTS[0].excerpt}</p>
            <div className="blog-featured__meta">
              <span>🗓 {POSTS[0].date}</span>
              <span>⏱ {POSTS[0].readTime} čitanja</span>
            </div>
            <span className="blog-featured__btn">Čitaj članak →</span>
          </div>
        </Link>
      </div>

      <h2 className="blog-h2">Svi članci</h2>
      <div className="blog-grid">
        {POSTS.slice(1).map(post => (
          <Link key={post.slug} href={"/blog/" + post.slug} className="blog-card">
            <div className="blog-card__img-wrap">
              <img src={post.img} alt={post.title} className="blog-card__img" />
            </div>
            <div className="blog-card__body">
              <span className={"blog-cat blog-cat--" + post.catClass}>{post.category}</span>
              <h3 className="blog-card__title">{post.title}</h3>
              <p className="blog-card__excerpt">{post.excerpt}</p>
              <div className="blog-card__meta">
                <span>🗓 {post.date}</span>
                <span>⏱ {post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="blog-cta">
        <h2>Trebate savet o video nadzoru?</h2>
        <p>Pozovite nas — besplatna konsultacija i procena za vaš objekat.</p>
        <a href="tel:063224651" className="blog-cta__btn">📞 063224651</a>
      </div>

      <style>{`
        .blog-page { max-width: 900px; margin: 0 auto; padding: 0 8px; }
        .blog-header { margin-bottom: 28px; }
        .blog-h1 { font-size: 26px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .blog-h2 { font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 16px; }
        .blog-sub { font-size: 15px; color: var(--ink-muted); line-height: 1.6; }
        .blog-cat { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 4px; display: inline-block; margin-bottom: 10px; }
        .blog-cat--saveti { background: #dbeafe; color: #1e40af; }
        .blog-cat--novosti { background: #fce7f3; color: #9d174d; }
        .blog-featured { margin-bottom: 36px; }
        .blog-featured__card { display: grid; grid-template-columns: 1fr 1fr; gap: 0; background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 14px; overflow: hidden; text-decoration: none; transition: box-shadow 0.15s; }
        .blog-featured__card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .blog-featured__img-wrap { aspect-ratio: 4/3; overflow: hidden; }
        .blog-featured__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .blog-featured__card:hover .blog-featured__img { transform: scale(1.03); }
        .blog-featured__body { padding: 28px; display: flex; flex-direction: column; }
        .blog-featured__title { font-size: 20px; font-weight: 700; color: var(--ink); line-height: 1.4; margin-bottom: 10px; }
        .blog-featured__excerpt { font-size: 14px; color: var(--ink-muted); line-height: 1.7; flex: 1; margin-bottom: 16px; }
        .blog-featured__meta { display: flex; gap: 16px; font-size: 12px; color: var(--ink-muted); margin-bottom: 16px; }
        .blog-featured__btn { display: inline-block; color: var(--brand); font-size: 14px; font-weight: 600; }
        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 36px; }
        .blog-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; overflow: hidden; text-decoration: none; transition: box-shadow 0.15s, transform 0.15s; display: flex; flex-direction: column; }
        .blog-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); transform: translateY(-2px); }
        .blog-card__img-wrap { aspect-ratio: 16/9; overflow: hidden; }
        .blog-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .blog-card:hover .blog-card__img { transform: scale(1.05); }
        .blog-card__body { padding: 16px; display: flex; flex-direction: column; flex: 1; }
        .blog-card__title { font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.4; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .blog-card:hover .blog-card__title { color: var(--brand); }
        .blog-card__excerpt { font-size: 12px; color: var(--ink-muted); line-height: 1.6; flex: 1; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .blog-card__meta { display: flex; gap: 12px; font-size: 11px; color: var(--ink-muted); }
        .blog-cta { background: linear-gradient(135deg, #1d3eb8 0%, #152a85 100%); border-radius: 14px; padding: 28px; text-align: center; margin-bottom: 32px; }
        .blog-cta h2 { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .blog-cta p { font-size: 14px; color: rgba(255,255,255,0.8); margin-bottom: 16px; }
        .blog-cta__btn { display: inline-block; background: #f6d000; color: #0b1020; font-size: 15px; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; }
        @media (max-width: 768px) {
          .blog-featured__card { grid-template-columns: 1fr; }
          .blog-grid { grid-template-columns: 1fr; }
          .blog-h1 { font-size: 20px; }
        }
      `}</style>
    </div>
  );
}
