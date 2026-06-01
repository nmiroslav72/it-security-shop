# IT SECURITY — E-shop

Online prodavnica za sigurnosne kamere, alarme i interfone.
Stack: **Next.js 15 · React 19 · TypeScript · Tailwind CSS · Prisma · PostgreSQL · NextAuth v5**.

---

## Brzi pregled funkcionalnosti

- 🏠 **Početna** — hero slider sa akcijskim ponudama, predstavljanje usluga, najprodavaniji modeli, galerija sa terena, istorija od 2008, CTA blok, footer sa social linkovima.
- 🛒 **Prodavnica** — leva ploča sa checkbox filterima (po kategoriji), sortiranje, hover-zoom-grayscale na karticama, pojedinačna stranica proizvoda, dodavanje u korpu.
- ✉️ **Kontakt** — FAQ, kontakt forma (čuva u bazu), Google mapa, info kartice (telefon/email/adresa).
- 🧺 **Korpa & Checkout** — gost ili registrovani, više načina plaćanja (kartica, pouzeće, uplata na račun).
- 🔐 **Admin panel** (`/admin`) — pregled, CRUD proizvoda sa toggle-om "Prikaži cenu" / "Bestseler" / "Aktivan", lista i detalj porudžbina sa promenom statusa, prikaz kontakt poruka.
- 👤 **Korisnički nalozi** — login, registracija (opciono); kupovina kao gost je dozvoljena.

---

## Šta moraš da instaliraš pre prvog pokretanja

1. **Node.js 22 LTS** — https://nodejs.org/  
   Posle instalacije restartuj terminal pa proveri: `node --version`

2. **PostgreSQL baza** (jedna od opcija):
   - **Najlakše: Neon** (cloud, free tier) — registruj se na https://neon.tech, napravi novi project, kopiraj `DATABASE_URL`
   - Lokalni Postgres (Postgres.app, Postgres za Windows, Docker)

3. **Logo** — sačuvaj svoj logo kao `public/logo.png` (ili ostavi `public/logo.svg` placeholder).

---

## Prvo pokretanje (5 minuta)

```bash
# 1. instaliraj zavisnosti
npm install

# 2. iskopiraj env i popuni
cp .env.example .env.local
# pa otvori .env.local i popuni DATABASE_URL, AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# 3. kreiraj tabele u bazi
npx prisma db push

# 4. ubaci demo proizvode i admin nalog
npm run db:seed

# 5. pokreni dev server
npm run dev
```

Otvori http://localhost:3000

**Admin login:** podaci iz `.env.local` (default: `admin@itsecurity.rs` / `promeni-me-odmah`).
Admin panel: http://localhost:3000/admin

---

## Korisne komande

```bash
npm run dev          # pokreće dev server
npm run build        # produkcijski build
npm start            # pokreće build (posle npm run build)
npm run db:push      # primeni schema.prisma na bazu (development)
npm run db:migrate   # napravi novu migraciju (production)
npm run db:seed      # ubaci demo podatke
npm run db:studio    # GUI za bazu (Prisma Studio)
```

---

## Plaćanje karticama (Srbija)

⚠️ **Stripe ne radi za prodavce u Srbiji.**

Ovaj sajt je napravljen sa apstrahovanim payment provider-om
(`src/lib/payment.ts`). Trenutno radi u **mock** režimu (simulira uspešno
plaćanje). Kad firma dobije ugovor sa bankom za e-trgovinu, treba samo:

1. Promeniti `PAYMENT_PROVIDER` u `.env.local` (`monri` ili `nestpay`).
2. Popuniti `PAYMENT_MERCHANT_ID` i `PAYMENT_API_KEY`.
3. Implementirati TODO blok u `src/lib/payment.ts`.

**Preporuka:** počni sa **Monri** — najjednostavnija REST integracija u Srbiji.

Za sada, kupci uvek mogu da poruče i preko **pouzeća** ili **uplate na račun**.

---

## Struktura projekta

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Početna
│   ├── shop/               # Prodavnica + detalj proizvoda
│   ├── contact/            # Kontakt
│   ├── cart/               # Korpa
│   ├── checkout/           # Plaćanje + success
│   ├── login/, register/   # Auth
│   ├── admin/              # Admin panel
│   └── api/                # API rute
├── components/             # React komponente
├── lib/
│   ├── prisma.ts           # DB client
│   ├── auth.ts             # NextAuth config
│   ├── cart.ts             # Zustand store za korpu
│   ├── payment.ts          # Payment provider apstrakcija
│   └── utils.ts
├── types/
└── middleware.ts           # Štiti /admin rute
prisma/
├── schema.prisma           # DB šema
└── seed.ts                 # Demo podaci
public/
└── logo.svg                # Placeholder logo (zameni sa logo.png)
```

---

## Ubacivanje pravih proizvoda

1. Prijavi se kao admin (`/admin`)
2. Idi na **Proizvodi → + Novi proizvod**
3. Popuni naziv, opis, cenu, kategoriju, brend
4. **"Prikaži cenu"** toggle — ako je isključen, kupcima se prikazuje "Cena na upit"
5. **Atributi (JSON)** — koristi se za filtriranje. Primeri:
   - Kamere: `{"resolution":"4mpx","type":"IP","nightVision":true,"isKit":false}`
   - Alarmi: `{"equipment":["bežični detektori"],"productType":"detektori"}`
   - Interfoni: `{"interfonCategory":"video","productType":"monitor"}`
6. Slike — staviti URL-ove (po jedan po liniji). Najjednostavnije je da slike upload-uješ negde (Cloudinary, ImgBB) ili u `public/uploads/`.

---

## Deploy (kad bude vreme)

**Najbrža opcija: Vercel** (besplatno za male sajtove).
1. Napravi git repozitorijum, push-uj kod.
2. Idi na https://vercel.com, "Import Project".
3. Dodaj env varijable iz `.env.local`.
4. Deploy.

Domena se zatim povezuje za par minuta.

---

## TODO za boljitak (kasnije)

- [ ] Upload slika preko admin panela (trenutno samo URL)
- [ ] Email notifikacije (na novu porudžbinu / poruku)
- [ ] Implementacija Monri payment-a
- [ ] SEO sitemap i Open Graph slike
- [ ] PDF predračun za uplatu na račun
"# it-security-shop" 
