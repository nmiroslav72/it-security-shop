/**
 * Import skripta — čita data/scraped-products.json i ubacuje u bazu.
 *
 * Pokretanje:
 *   npm run import-scraped              # ubacuje sve, isActive=false (admin pregleda pa aktivira)
 *   npm run import-scraped -- --active  # ubacuje aktivne odmah
 *   npm run import-scraped -- --replace # briše postojeće proizvode iz scraped JSON-a pa ponovo ubacuje
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();
const ROOT = process.cwd();
const IN_JSON = join(ROOT, "data", "scraped-products.json");

type ScrapedProduct = {
  source: string;
  ourCategory: "CAMERAS" | "ALARMS" | "INTERCOMS" | "DVR";
  shortName: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  shortDesc: string;
  description: string;
  images: string[];
  attributes: Record<string, unknown>;
};

async function main() {
  const args = process.argv.slice(2);
  const setActive = args.includes("--active");
  const replace = args.includes("--replace");

  const raw = await readFile(IN_JSON, "utf-8").catch(() => null);
  if (!raw) {
    console.error(`Ne mogu da pročitam ${IN_JSON}. Prvo pokreni: npm run scrape`);
    process.exit(1);
  }

  const products: ScrapedProduct[] = JSON.parse(raw);
  console.log(`Učitano ${products.length} proizvoda iz JSON-a.`);

  if (replace) {
    const slugs = products.map((p) => p.slug);
    const del = await prisma.product.deleteMany({ where: { slug: { in: slugs } } });
    console.log(`Obrisano postojećih: ${del.count}`);
  }

  let created = 0;
  let skipped = 0;
  let errored = 0;

  for (const p of products) {
    if (!p.name || !p.slug) {
      skipped++;
      continue;
    }
    if (p.images.length === 0) {
      console.log(`⚠ "${p.name}" nema slika — preskačem`);
      skipped++;
      continue;
    }

    try {
      const exists = await prisma.product.findUnique({ where: { slug: p.slug } });
      if (exists) {
        skipped++;
        continue;
      }

      await prisma.product.create({
        data: {
          slug: p.slug,
          name: p.name,
          shortDesc: p.shortDesc || undefined,
          description: p.description || p.name,
          price: p.price || 0,
          showPrice: p.price > 0, // ako nemamo cenu, sakrij i prikaži "Cena na upit"
          stock: 0,
          category: { connect: { id: p.ourCategory.id } },
          brand: p.brand || "Nepoznat",
          images: p.images,
          attributes: p.attributes ?? {},
          isActive: setActive,
        },
      });
      created++;
      process.stdout.write(`✓ ${p.name}\n`);
    } catch (e) {
      errored++;
      console.error(`✗ ${p.name}: ${(e as Error).message}`);
    }
  }

  console.log(`\n📦 Gotovo. Kreirano: ${created}, preskočeno: ${skipped}, grešaka: ${errored}`);
  if (!setActive) {
    console.log(
      `\nProizvodi su uneti kao NEAKTIVNI. Otvori /admin/products i ručno aktiviraj željene,`
    );
    console.log(`ili pokreni: npm run import-scraped -- --active --replace`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
