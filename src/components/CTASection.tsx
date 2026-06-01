// @ts-nocheck
import Link from "next/link";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="section">
      <div className="container-app">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-accent via-yellow-400 to-accent-dark shadow-card">
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-ink/70">
                Spreman za sigurniji dom?
              </p>
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
                Pogledajte kompletnu ponudu u našoj prodavnici
              </h2>
              <p className="mt-4 text-lg text-ink/80">
                Više od 200 proizvoda — kamere, alarmi, interfoni, kompletni paketi.
                Stručan savet uz svaku porudžbinu.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop" className="btn-primary">
                  Otvori prodavnicu
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Kontaktiraj nas
                </Link>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image
                src="https://picsum.photos/seed/cta-kit/900/700"
                alt="Komplet sigurnosnih kamera"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
