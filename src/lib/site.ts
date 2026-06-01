// @ts-nocheck
export const SITE = {
  name: "IT SECURITY",
  legalName: "IT SECURITY",
  tagline: "Video nadzor, alarmi i interfoni od 2008.",
  description:
    "Prodaja i ugradnja sigurnosnih kamera, alarmnih sistema i interfona u Beogradu i celoj Srbiji. Hikvision, Dahua, Ajax, Paradox. Iskustvo od 2008. godine.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://itsecurity.rs",
  locale: "sr_RS",
  language: "sr",
  founded: "2008",

  phoneDisplay: "+381 63 224 651",
  phoneE164: "+38163224651",

  email: "nmiroslav72@yahoo.com",

  address: {
    street: "109 Nova 18",
    city: "Beograd",
    region: "Beograd",
    postalCode: "11000",
    country: "RS",
    countryName: "Srbija",
  },

  geo: {
    latitude: 44.7866,
    longitude: 20.4489,
  },

  hours: "Pon–Pet 09:00–17:00, Sub 09:00–13:00",

  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
} as const;

export const telHref = `tel:${SITE.phoneE164}`;
export const mailHref = `mailto:${SITE.email}`;
