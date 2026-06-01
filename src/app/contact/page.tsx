import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { SITE, telHref, mailHref } from "@/lib/site";
import { faqs } from "@/lib/faqs";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Kontakt — pošalji upit ili pozovi",
  description: `Kontakt podaci za ${SITE.name} — telefon ${SITE.phoneDisplay}, email ${SITE.email}, adresa ${SITE.address.street}, ${SITE.address.city}. Brza ponuda i besplatna procena.`,
  alternates: { canonical: "/contact" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50">
      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Header */}
      <section className="bg-gradient-to-br from-brand via-brand-dark to-ink py-12 text-white sm:py-16">
        <div className="container-app">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-accent sm:text-sm">
            Kontakt
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Tu smo za sva pitanja
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            Pozovi nas, piši nam ili svrati u našu kancelariju. Odgovaramo brzo —
            obično u istom danu.
          </p>
        </div>
      </section>

      <div className="container-app -mt-8 grid gap-4 pb-10 sm:-mt-10 sm:grid-cols-3 sm:gap-6">
        <InfoCard
          title="Pozovi"
          value={SITE.phoneDisplay}
          href={telHref}
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" strokeLinejoin="round" />
            </svg>
          }
        />
        <InfoCard
          title="Email"
          value={SITE.email}
          href={mailHref}
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          }
        />
        <InfoCard
          title="Adresa"
          value={`${SITE.address.street}, ${SITE.address.city}`}
          href="#mapa"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          }
        />
      </div>

      {/* FAQ + form */}
      <section className="section pt-0">
        <div className="container-app grid gap-10 lg:grid-cols-[1fr,1fr]">
          <div>
            <h2 className="section-title">Najčešća pitanja</h2>
            <p className="section-subtitle">
              Brzi odgovori na najčešća pitanja kupaca.
            </p>
            <div className="mt-6">
              <FAQ />
            </div>
          </div>

          <div>
            <h2 className="section-title">Pošalji poruku</h2>
            <p className="section-subtitle">Ostavi pitanje — odgovaramo brzo.</p>
            <div className="mt-6 card p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section id="mapa" className="pb-16">
        <div className="container-app">
          <h2 className="section-title mb-6">Lokacija</h2>
          <div className="overflow-hidden rounded-3xl shadow-card">
            <iframe
              src="https://www.google.com/maps?q=Nova%2018%20109%2C%20Beograd&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokacija IT Security"
              className="block"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({
  title,
  value,
  href,
  icon,
}: {
  title: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
          {title}
        </p>
        <p className="font-semibold text-ink">{value}</p>
      </div>
    </a>
  );
}
