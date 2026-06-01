"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  price: string;
  cta: string;
  ctaHref: string;
  bg: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Akcijska ponuda",
    title: "4 sigurnosne kamere",
    highlight: "+ ugradnja",
    description:
      "Komplet od 4 HD kamere sa noćnim snimanjem, DVR-om i punom ugradnjom u Beogradu.",
    price: "800 €",
    cta: "Saznaj više",
    ctaHref: "/shop?kategorija=kamere&komplet=da",
    bg: "from-brand via-brand-dark to-ink",
  },
  {
    eyebrow: "Specijalni paket",
    title: "Alarm + 3 kamere",
    highlight: "kompletna zaštita",
    description:
      "Bežični alarmni sistem sa 3 IP kamere i mobilnom aplikacijom. Sve uključeno.",
    price: "700 €",
    cta: "Pogledaj ponudu",
    ctaHref: "/shop?kategorija=alarmi",
    bg: "from-ink via-brand-dark to-brand",
  },
  {
    eyebrow: "Profesionalna ugradnja",
    title: "Video interfon",
    highlight: "za vašu zgradu",
    description:
      "Moderni video interfoni sa mobilnom aplikacijom. Od jednog stana do velike zgrade.",
    price: "Kontaktirajte nas",
    cta: "Zatraži ponudu",
    ctaHref: "/contact",
    bg: "from-brand-dark via-ink to-ink",
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[560px] sm:h-[620px]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* dekorativni krugovi */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-brand-light/20 blur-3xl" />

            <div className="container-app relative flex h-full flex-col justify-center">
              <div className="max-w-2xl text-white">
                <p className="mb-4 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-ink">
                  {slide.eyebrow}
                </p>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                  {slide.title}
                  <br />
                  <span className="text-accent">{slide.highlight}</span>
                </h1>
                <p className="mt-5 max-w-xl text-lg text-white/85">
                  {slide.description}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <div className="text-4xl font-extrabold text-accent sm:text-5xl">
                    {slide.price}
                  </div>
                  <Link href={slide.ctaHref} className="btn-accent">
                    {slide.cta}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Strelice */}
        <button
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
          aria-label="Prethodni"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur-md transition hover:bg-white/25"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          aria-label="Sledeći"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur-md transition hover:bg-white/25"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Tačkice */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slajd ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-accent" : "w-2 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
