import Link from "next/link";

const services = [
  {
    title: "Sigurnosne kamere",
    description:
      "IP, analogne i WiFi kamere vodećih svetskih proizvođača — Hikvision, Dahua, Imou. Profesionalna ugradnja u Beogradu i Srbiji.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path d="M16 10l6-3v10l-6-3" />
        <circle cx="9" cy="12" r="2.5" />
      </svg>
    ),
    href: "/shop?kategorija=kamere",
  },
  {
    title: "Alarmni sistemi",
    description:
      "Bežični i žičani alarmi za stan, kuću ili poslovni prostor. Ajax, Paradox, Dahua — sa 24/7 nadzorom.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" strokeLinejoin="round" />
        <path d="M9.5 12l2 2 3.5-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    href: "/shop?kategorija=alarmi",
  },
  {
    title: "Interfoni",
    description:
      "Audio i video interfoni za stambene i poslovne objekte. Sa mobilnom aplikacijom za daljinski pristup.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="8" r="2" />
        <path d="M9 13h6M9 16h6" strokeLinecap="round" />
      </svg>
    ),
    href: "/shop?kategorija=interfoni",
  },
];

export function ServicesSection() {
  return (
    <section className="section">
      <div className="container-app">
        <div className="text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-brand">
            Šta nudimo
          </p>
          <h2 className="section-title">Kompletna tehnička zaštita</h2>
          <p className="section-subtitle mx-auto">
            Prodaja i profesionalna ugradnja sigurnosnih kamera, alarmnih sistema i
            interfona. Koristimo opremu vodećih svetskih brendova.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group card relative overflow-hidden p-8 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-ink-muted">{s.description}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Pogledaj ponudu
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition group-hover:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
