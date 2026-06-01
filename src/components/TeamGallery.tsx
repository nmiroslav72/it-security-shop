"use client";

import Image from "next/image";
import { useState } from "react";

const gallery = [
  {
    src: "https://picsum.photos/seed/team1/1200/700",
    caption: "Postavljanje IP kamera na poslovni objekat",
  },
  {
    src: "https://picsum.photos/seed/team2/1200/700",
    caption: "Ugradnja video interfona u stambenoj zgradi",
  },
  {
    src: "https://picsum.photos/seed/team3/1200/700",
    caption: "Programiranje alarmne centrale Ajax",
  },
  {
    src: "https://picsum.photos/seed/team4/1200/700",
    caption: "Kompletan sistem video nadzora — instalacija",
  },
  {
    src: "https://picsum.photos/seed/team5/1200/700",
    caption: "Priprema kabliranja za 8-kamerni sistem",
  },
];

export function TeamGallery() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % gallery.length);
  const prev = () => setI((v) => (v - 1 + gallery.length) % gallery.length);

  return (
    <section className="section">
      <div className="container-app">
        <div className="text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-brand">
            Naš tim na terenu
          </p>
          <h2 className="section-title">Profesionalna ugradnja</h2>
          <p className="section-subtitle mx-auto">
            Iskusan tim sa višegodišnjim iskustvom u instalaciji sistema tehničkog
            obezbeđenja.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl bg-slate-100 shadow-card">
          <div className="relative aspect-[16/9]">
            {gallery.map((g, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={g.src}
                  alt={g.caption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 sm:p-10">
                  <p className="text-base font-medium text-white sm:text-lg">
                    {g.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prev}
            aria-label="Prethodna slika"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-card transition hover:bg-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Sledeća slika"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-card transition hover:bg-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            {i + 1} / {gallery.length}
          </div>
        </div>
      </div>
    </section>
  );
}
