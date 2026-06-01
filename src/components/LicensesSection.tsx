// @ts-nocheck
const items = [
  {
    title: "Licence Ministarstva unutrašnjih poslova",
    body: "Posedujemo sve neophodne MUP licence za postavljanje i održavanje sistema video nadzora i tehničke zaštite, u skladu sa Zakonom o privatnom obezbeđenju.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l9 4v6c0 5.5-3.8 10-9 11-5.2-1-9-5.5-9-11V6l9-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "3 godine garancije",
    body: "Na svu instaliranu opremu obezbeđujemo proizvođačku garanciju, a na samu uslugu ugradnje dajemo dodatnu garanciju — 3 godine bez briga.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: "Plan i projekat",
    body: "Pre svake ugradnje izrađujemo tehnički plan i projektnu dokumentaciju — pozicije kamera, kabliranje, snimač i uglovi pokrivenosti — sve transparentno i u dogovoru sa klijentom.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h6M9 9h2" />
      </svg>
    ),
  },
  {
    title: "Prijava sistema policiji",
    body: "Po završenoj instalaciji vršimo zvaničnu prijavu sistema video nadzora nadležnoj policijskoj upravi — sa sertifikatom o usklađenosti i predajom dokumentacije klijentu.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
      </svg>
    ),
  },
];

export function LicensesSection() {
  return (
    <section className="section bg-gradient-to-br from-slate-50 via-white to-blue-50/40">
      <div className="container-app">
        <div className="text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand sm:text-sm">
            Sertifikati i garancije
          </p>
          <h2 className="section-title">Sve po zakonu — i sa pokrićem</h2>
          <p className="section-subtitle mx-auto">
            Radimo isključivo sa potrebnim licencama i pratećom dokumentacijom.
            Svaki sistem dolazi sa garancijom, projektnom dokumentacijom i prijavom
            nadležnim organima.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {items.map((it) => (
            <article
              key={it.title}
              className="card group flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                {it.icon}
              </div>
              <h3 className="text-lg font-bold text-ink">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{it.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-brand/20 bg-brand/5 p-5 text-center text-sm text-ink-muted lg:mt-10">
          <strong className="text-ink">Napomena:</strong> Po zahtevu klijenta dostavljamo
          kopije licenci, sertifikate o ugradnji i potvrdu o prijavi sistema nadležnoj
          policijskoj upravi. Sve usluge su u skladu sa važećim Zakonom o privatnom obezbeđenju.
        </div>
      </div>
    </section>
  );
}
