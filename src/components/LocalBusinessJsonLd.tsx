// @ts-nocheck
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": "https://diskontvideonadzora.rs/#business",
    name: "IT Security",
    legalName: "IT Security d.o.o.",
    description:
      "Prodaja i profesionalna ugradnja sistema video nadzora, alarmnih sistema i interfona. Iskustvo od 2008. Licencirani izvođač tehničke zaštite.",
    url: "https://diskontvideonadzora.rs",
    telephone: "+381-63-224651",
    email: "diskontvideonadzora@diskontvideonadzora.rs",
    foundingDate: "2008",
    image: "https://diskontvideonadzora.rs/og-default.jpg",
    logo: "https://diskontvideonadzora.rs/og-default.jpg",
    priceRange: "€€",
    currenciesAccepted: "RSD",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sutjeska 7/50c",
      addressLocality: "Beograd",
      addressRegion: "Palilula",
      postalCode: "11060",
      addressCountry: "RS",
    },
    areaServed: [
      { "@type": "City", name: "Beograd" },
      { "@type": "AdministrativeArea", name: "Novi Beograd" },
      { "@type": "AdministrativeArea", name: "Zemun" },
      { "@type": "AdministrativeArea", name: "Palilula" },
      { "@type": "AdministrativeArea", name: "Voždovac" },
      { "@type": "AdministrativeArea", name: "Zvezdara" },
    ],
    sameAs: [],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
