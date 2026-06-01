// @ts-nocheck
export function HistorySection() {
  const yearsSince = new Date().getFullYear() - 2008;

  return (
    <section className="section bg-gradient-to-br from-ink via-brand-dark to-brand text-white">
      <div className="container-app">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-accent">
              Naša priča
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Više od {yearsSince} godina iskustva u tehničkom obezbeđenju
            </h2>
            <p className="mt-5 text-lg text-white/85">
              IT SECURITY posluje od <strong className="text-accent">2008. godine</strong>.
              Tokom decenije i po, postavili smo na hiljade sistema video nadzora,
              alarmnih sistema i interfona — od malih stanova do velikih poslovnih
              kompleksa.
            </p>
            <p className="mt-4 text-white/80">
              Naša filozofija je jednostavna: kvalitetna oprema vodećih svetskih
              brendova, pažljiva ugradnja od strane sertifikovanih tehničara i
              kontinuirana podrška nakon montaže. Klijenti nam veruju jer rezultati
              govore za sebe.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Stat number={`${yearsSince}+`} label="Godina iskustva" />
            <Stat number="3.500+" label="Realizovanih instalacija" />
            <Stat number="24/7" label="Tehnička podrška" />
            <Stat number="100%" label="Kvalitet brendova" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
      <div className="text-4xl font-extrabold text-accent sm:text-5xl">{number}</div>
      <div className="mt-1 text-sm text-white/80">{label}</div>
    </div>
  );
}
