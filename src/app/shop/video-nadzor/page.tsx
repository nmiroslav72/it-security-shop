export const dynamic = "force-dynamic";
// @ts-nocheck
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video nadzor - kamere, snimaci, kompleti | IT Security Beograd",
  description: "Sistemi video nadzora - HD kamere, IP kamere, WiFi kamere, DVR i NVR snimaci, kompleti. Prodaja i ugradnja u Beogradu. Pozovite 063224651.",
};

const CATEGORIES = [
  { slug: "hd-kamere",                     label: "HD Kamere",             img: "/uploads/backup/2023/09/HAC-HFW1200CM-IL-A-0360B-S6_01.webp" },
  { slug: "ip-kamere",                     label: "IP Kamere",             img: "/uploads/backup/2023/09/IPC-HFW1230DS-SAW-0280B_01-2.webp" },
  { slug: "wifi-kamere-bezicne",           label: "WiFi Kamere",           img: "/uploads/2023/01/IPC-F42FEP-D_01.webp" },
  { slug: "dvr-digitalni-snimaci",         label: "DVR Digitalni Snimaci", img: "/uploads/2022/12/xvr5104hs-4kl-i3_main.webp" },
  { slug: "nvr-mrezni-snimaci",            label: "NVR Mrezni Snimaci",    img: "/uploads/2022/12/NVR2108HS-8P-I_main.webp" },
  { slug: "kompleti-video-nadzora",        label: "Kompleti Video Nadzora",img: "/uploads/backup/2023/09/tvt-ip-4-akmere-komplet-shop.webp" },
  { slug: "dodatna-oprema-za-videonadzor", label: "Dodatna Oprema",        img: "/uploads/2023/02/nvr-ulaz-sa-kamerama-i-bez.webp" },
];

async function getCounts() {
  const counts: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    const category = await prisma.category.findUnique({ where: { slug: cat.slug } });
    counts[cat.slug] = category
      ? await prisma.product.count({ where: { categoryId: category.id, active: true } })
      : 0;
  }
  return counts;
}

export default async function VideoNadzorPage() {
  const counts = await getCounts();

  return (
    <div className="vn-page">
      <h1 className="vn-h1">Video nadzor - sistemi za zastitu imovine i poslovanja</h1>
      <p className="vn-intro">
        Kompletna ponuda opreme za video nadzor - HD kamere, IP kamere, WiFi kamere,
        DVR i NVR snimaci, kompleti i dodatna oprema. Prodaja i profesionalna ugradnja
        u Beogradu i okolini od 2008. godine. Garancija 3 godine na ugradene sisteme.
      </p>

      <div className="vn-grid">
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={"/shop?category=" + cat.slug} className="vn-card">
            <div className="vn-card__img-wrap">
              <img src={cat.img} alt={cat.label} className="vn-card__img" />
              <div className="vn-card__overlay">
                <span className="vn-card__label">{cat.label}</span>
                <span className="vn-card__count">{counts[cat.slug] ?? 0} proizvoda</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="vn-seo">

        <h2 className="vn-h2">Zasto je video nadzor neophodan?</h2>
        <p>Video nadzor je danas postao neophodnost za zastitu i nadzor imovine i poslovanja. Objekti koji imaju video nadzor u ogromnom procentu imaju manje napada od nezasticenih objekata. Poslovanje pokriveno video nadzorom dovodi do odgovornijeg ponasanja zaposlenih i mogucnosti da se sazna sta se stvarno desilo ako se dogodi sporna situacija. IT Security nudi kompletna resenja za video nadzor u Beogradu od 2008. godine.</p>

        <div className="vn-features">
          <div className="vn-feature">
            <span className="vn-feature__icon">📷</span>
            <h3 className="vn-h3">Vodeci brendovi</h3>
            <p>Hikvision, Dahua, Uniview, TVT - originalna oprema sa garancijom 2-3 godine</p>
          </div>
          <div className="vn-feature">
            <span className="vn-feature__icon">🔧</span>
            <h3 className="vn-h3">Profesionalna ugradnja</h3>
            <p>Licencirani projektant, iskusni tehnicari, projekat i prijava u MUP-u</p>
          </div>
          <div className="vn-feature">
            <span className="vn-feature__icon">🛡</span>
            <h3 className="vn-h3">Garancija 3 godine</h3>
            <p>Na sve ugradene sisteme video nadzora - servis i odrzavanje</p>
          </div>
          <div className="vn-feature">
            <span className="vn-feature__icon">📞</span>
            <h3 className="vn-h3">Podrska 7 dana u nedelji</h3>
            <p>Tehnicka podrska i konsultacije - 063224651</p>
          </div>
        </div>

        <h2 className="vn-h2">7 saveta za kupovinu video nadzora</h2>
        <img src="/uploads/7savetazakupovinuvideonadzora.png" alt="7 saveta za kupovinu video nadzora" className="vn-img" />

        <div className="vn-saveti">
          <div className="vn-savet">
            <div className="vn-savet__num">1</div>
            <div>
              <h3 className="vn-h3">Rezolucija kamere za video nadzor</h3>
              <p>Izabrati kamere sa najmanje 2MPX rezolucije ili vise. Sto je veca rezolucija kamere to cete imati kvalitetniju sliku. Rezolucija kamera za video nadzor je direktno povezana sa kvalitetom slike i mogucnoscu identifikacije lica i detalja na snimku.</p>
            </div>
          </div>
          <div className="vn-savet">
            <div className="vn-savet__num">2</div>
            <div>
              <h3 className="vn-h3">Rezolucija digitalnog snimaca DVR/NVR</h3>
              <p>Izabrati DVR ili NVR snimac koji podrzava istu rezoluciju kao kamere. Ako kamera ima 2MPX rezoluciju snimac treba da podrzava istu ili vecu rezoluciju snimanja. Ako snimac snima manju rezoluciju od kamere, gubite kvalitet slike koji kamera moze da pruzi.</p>
            </div>
          </div>
          <div className="vn-savet">
            <div className="vn-savet__num">3</div>
            <div>
              <h3 className="vn-h3">Velicina hard diska za video nadzor</h3>
              <p>Po Zakonu o bezbednosti korisnik je duzan da obezbedi mesec dana snimka. Iz tog razloga je vazan pravilan izbor kapaciteta hard diska. Veca rezolucija kamera znaci i vise podataka na disku - izaberite odgovarajuci kapacitet.</p>
            </div>
          </div>
          <div className="vn-savet">
            <div className="vn-savet__num">4</div>
            <div>
              <h3 className="vn-h3">IC nocno snimanje - daljina IC dioda</h3>
              <p>Kamere imaju ugradene IC diode za nocno snimanje. Daljina do koje se prostiru IC zraci moze biti 20, 30, 40, 50 ili 80 metara. Odredite koje su daljine koje zelite da pokrijete u mraku i izaberite kameru sa odgovarajucim dometom IC rasvete.</p>
            </div>
          </div>
          <div className="vn-savet">
            <div className="vn-savet__num">5</div>
            <div>
              <h3 className="vn-h3">Audio snimanje i two-way komunikacija</h3>
              <p>Ako zelite audio i zvucni snimak izaberite kamere koje imaju ugradeni mikrofon. Za two-way komunikaciju izaberite IP kameru sa ugradenim mikrofonom i zvucnikom. Napomena: pri audio snimanju morate istaknuti nalepnicu o tonskom snimanju.</p>
            </div>
          </div>
          <div className="vn-savet">
            <div className="vn-savet__num">6</div>
            <div>
              <h3 className="vn-h3">PTZ rotirajuce i varifokalne kamere</h3>
              <p>Ako zelite da pomerate kameru horizontalno i vertikalno i da uvecate sliku izaberite PTZ kamere. Ako treba samo da uvecate sliku izaberite varifokalnu kameru sa motorizovanim zumom. PTZ kamere imaju i mogucnost auto pracenja objekta.</p>
            </div>
          </div>
          <div className="vn-savet">
            <div className="vn-savet__num">7</div>
            <div>
              <h3 className="vn-h3">Brzina interneta za remote pristup kamerama</h3>
              <p>Da biste mogli da gledate kamere preko interneta morate imati odgovarajucu brzinu uploada. Jedna kamera od 2MPX trosi oko 2 Mbita upload brzine. Za 4 kamere u full rezoluciji od 2MPX potrebno je 8 Mbita uploada.</p>
            </div>
          </div>
        </div>

        <h2 className="vn-h2">Oprema za video nadzor - sta cini sistem?</h2>
        <p>Oprema koja cini sistem video nadzora su: kamere, DVR ili NVR digitalni snimaci, hard diskovi za cuvanje snimljenih podataka i dodatna oprema - napajanja, kablovi, nosaci kamera, switchevi i POE switchevi. Izbor kamere je jako vazan i treba voditi racuna o rezoluciji, obliku kamere (dome, bullet, eyeball) i smart funkcijama.</p>

        <h2 className="vn-h2">Smart funkcije video nadzora - AI zastita prostora</h2>
        <p>Kontrola i zastita prostora je dosta poboljsana upotrebom smart funkcija. Nasa oprema omogucava prepoznavanje ljudi, lica i vozila uz slanje alarma na mobilni telefon. Mnoge nase kamere imaju ugradenu smart IC rasvetu za nocno snimanje u boji ili Starlight cip za snimanje u uslovima losog osvetljenja.</p>

        <h2 className="vn-h2">Cene video nadzora i ugradnja u Beogradu</h2>
        <p>Kod nas na sajtu oprema ima najbolje cene na trzistu. Sistemi video nadzora koje nudimo kao kompleti sa ugradnjom i garancijom ce resiti vase probleme. Kompleti su pazljivo izabrani i nude najbolji odnos cene i kvaliteta. Ugradnja video nadzora je najpovoljnija uz kupljenu nasu opremu. Kao licencirano lice nudimo: projektovanje, montazu, odrzavanje i obuku korisnika. Kontakt 063224651 - dostupni smo 7 dana u nedelji.</p>

      </div>

      <style>{`
        .vn-page { max-width: 100%; }
        .vn-h1 { font-size: 24px; font-weight: 700; color: var(--ink); margin-bottom: 10px; }
        .vn-intro { font-size: 14px; line-height: 1.7; color: var(--ink-muted); margin-bottom: 24px; }
        .vn-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 40px; }
        .vn-card { display: block; text-decoration: none; border-radius: 10px; overflow: hidden; position: relative; background: #1d3eb8; aspect-ratio: 4/3; transition: transform 0.2s, box-shadow 0.2s; }
        .vn-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
        .vn-card__img-wrap { position: relative; width: 100%; height: 100%; }
        .vn-card__img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(20%); transition: filter 0.2s, transform 0.3s; }
        .vn-card:hover .vn-card__img { filter: grayscale(0%); transform: scale(1.05); }
        .vn-card__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%); display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 14px 10px; text-align: center; }
        .vn-card__label { font-size: 13px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.3; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }
        .vn-card__count { font-size: 11px; color: var(--accent); font-weight: 500; margin-top: 4px; }
        .vn-seo { padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.08); }
        .vn-h2 { font-size: 20px; font-weight: 700; color: var(--ink); margin: 28px 0 10px; }
        .vn-h3 { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
        .vn-seo p { font-size: 14px; line-height: 1.7; color: var(--ink-muted); margin-bottom: 16px; }
        .vn-features { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .vn-feature { background: #fff; border-radius: 8px; padding: 16px; text-align: center; border: 1px solid rgba(0,0,0,0.07); }
        .vn-feature__icon { font-size: 28px; display: block; margin-bottom: 8px; }
        .vn-feature p { font-size: 12px; color: var(--ink-muted); margin-bottom: 0; }
        .vn-img { width: 100%; max-width: 480px; display: block; margin: 16px auto 32px; border-radius: 12px; }
        .vn-saveti { display: flex; flex-direction: column; gap: 14px; margin: 24px 0 32px; }
        .vn-savet { display: flex; gap: 16px; align-items: flex-start; background: #fff; border-radius: 10px; padding: 16px; border: 1px solid rgba(0,0,0,0.07); }
        .vn-savet__num { width: 36px; height: 36px; border-radius: 50%; background: var(--brand); color: #fff; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .vn-savet h3 { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 5px; }
        .vn-savet p { font-size: 13px; line-height: 1.6; color: var(--ink-muted); margin: 0; }
        @media (max-width: 900px) { .vn-grid { grid-template-columns: repeat(2, 1fr); } .vn-features { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px) { .vn-grid { grid-template-columns: repeat(2, 1fr); } .vn-features { grid-template-columns: 1fr; } .vn-h1 { font-size: 20px; } }
      `}</style>
    </div>
  );
}
