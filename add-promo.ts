// Pokreni: npx tsx add-promo.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Obrisi stare i ubaci 4 nova
  await prisma.promoBanner.deleteMany();
  await prisma.promoBanner.createMany({
    data: [
      { title: "HD Kamere — Akcija", subtitle: "Snizenje do 30% na sve HD kamere", badge: "-30%", href: "/shop?category=hd-kamere", bgColor: "#1d3eb8", txtColor: "#ffffff", order: 1, active: true },
      { title: "Kompleti video nadzora", subtitle: "4 kamere + snimac 4K + HDD od 400 evra", badge: "400 EUR", href: "/shop?category=kompleti-video-nadzora", bgColor: "#0b1020", txtColor: "#f6d000", order: 2, active: true },
      { title: "Bezicni alarmi", subtitle: "Dahua i Ajax alarm kompleti na akciji", badge: "Akcija", href: "/shop?category=bezicni-alarmi", bgColor: "#c62828", txtColor: "#ffffff", order: 3, active: true },
      { title: "Video interfoni", subtitle: "Besplatna montaza uz kupovinu kompleta", badge: "Gratis", href: "/shop?category=video-interfoni", bgColor: "#f6d000", txtColor: "#0b1020", order: 4, active: true },
    ],
  });
  console.log("✅ 4 promo banera ubacena!");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
