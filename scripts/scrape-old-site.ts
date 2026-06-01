/**
 * Scraper za diskontvideonadzora.rs
 *
 * Pokretanje:
 *   npm run scrape                    # sve kategorije
 *   npm run scrape -- kamere          # samo "kamere"
 *   npm run scrape -- --probe         # samo proba: skida 1 kategoriju, 3 proizvoda (debug)
 *
 * Output:
 *   data/scraped-products.json        # sve sa naših podataka
 *   public/products/scraped/<cat>/*   # downloadovane slike
 */
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { setTimeout as wait } from "node:timers/promises";
import * as cheerio from "cheerio";

const BASE = "https://diskontvideonadzora.rs";
const ROOT = process.cwd();
const OUT_JSON = join(ROOT, "data", "scraped-products.json");
const OUT_IMG_DIR = join(ROOT, "public", "products", "scraped");

// Mapiranje starih kategorija → naša Category + dodatni atributi
type CatMapEntry = {
  // Tačan URL na starom sajtu (WooCommerce ?product_cat= format)
  url: string;
  // Naziv koji se koristi u JSON-u (i kasnije pri importu)
  ourCategory: "CAMERAS" | "ALARMS" | "INTERCOMS" | "DVR";
  // Dodatni atributi koji se setuju za sve proizvode iz ove kategorije
  defaultAttributes?: Record<string, unknown>;
  // Ime foldera za slike i log
  shortName: string;
  label: string;
};

const CATEGORIES: CatMapEntry[] = [
  {
    label: "HD kamere",
    shortName: "kamere",
    url: `${BASE}/?product_cat=hd-kamere`,
    ourCategory: "CAMERAS",
    defaultAttributes: { type: "Analogna" },
  },
  {
    label: "IP kamere",
    shortName: "kamere",
    url: `${BASE}/?product_cat=ip-kamere`,
    ourCategory: "CAMERAS",
    defaultAttributes: { type: "IP" },
  },
  {
    label: "WiFi kamere",
    shortName: "kamere",
    url: `${BASE}/?product_cat=wifi-kamere-bezicne`,
    ourCategory: "CAMERAS",
    defaultAttributes: { type: "WiFi" },
  },
  {
    label: "DVR snimači",
    shortName: "dvr",
    url: `${BASE}/?product_cat=dvr-digitalni-snimaci`,
    ourCategory: "DVR",
    defaultAttributes: { technology: "Analogna" },
  },
  {
    label: "NVR mrežni snimači",
    shortName: "dvr",
    url: `${BASE}/?product_cat=nvr-mrezni-snimaci`,
    ourCategory: "DVR",
    defaultAttributes: { technology: "IP" },
  },
  {
    label: "Kompleti video nadzora",
    shortName: "kompleti",
    url: `${BASE}/?product_cat=kompleti-video-nadzora`,
    ourCategory: "CAMERAS",
    defaultAttributes: { isKit: true },
  },
  {
    label: "Žičani alarmi",
    shortName: "alarmi",
    url: `${BASE}/?product_cat=zicani-alarmi`,
    ourCategory: "ALARMS",
  },
  {
    label: "Bežični alarmi",
    shortName: "alarmi",
    url: `${BASE}/?product_cat=bezicni-alarmi`,
    ourCategory: "ALARMS",
  },
  {
    label: "Audio interfoni",
    shortName: "interfoni",
    url: `${BASE}/?product_cat=audio-interfoni`,
    ourCategory: "INTERCOMS",
    defaultAttributes: { interfonCategory: "audio" },
  },
  {
    label: "Video interfoni",
    shortName: "interfoni",
    url: `${BASE}/?product_cat=video-interfoni`,
    ourCategory: "INTERCOMS",
    defaultAttributes: { interfonCategory: "video" },
  },
];

type ScrapedProduct = {
  source: string;            // URL na starom sajtu
  ourCategory: "CAMERAS" | "ALARMS" | "INTERCOMS" | "DVR";
  shortName: string;         // ime kategorije za folder slika
  name: string;
  slug: string;
  brand: string;
  price: number;             // RSD
  shortDesc: string;
  description: string;
  images: string[];          // lokalne putanje (već download-ovane), npr. "/products/scraped/kamere/x.jpg"
  attributes: Record<string, unknown>;
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36";

async function fetchHtml(url: string, attempts = 3): Promise<string | null> {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": UA, "Accept-Language": "sr,en;q=0.7" },
      });
      if (res.ok) return await res.text();
      if (res.status === 404) return null;
    } catch {
      // retry
    }
    await wait(800 * (i + 1));
  }
  return null;
}

async function downloadImage(url: string, destPath: string): Promise<boolean> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(dirname(destPath), { recursive: true });
    await writeFile(destPath, buf);
    return true;
  } catch {
    return false;
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[čć]/g, "c")
    .replace(/[š]/g, "s")
    .replace(/[ž]/g, "z")
    .replace(/[đ]/g, "dj")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function parsePriceRSD(text: string): number {
  const cleaned = text.replace(/\s| |RSD|din\.?|\.|,00/gi, "");
  const onlyDigits = cleaned.match(/\d+/g)?.join("") ?? "";
  const n = parseInt(onlyDigits, 10);
  return Number.isFinite(n) ? n : 0;
}

function absoluteUrl(href: string): string {
  if (!href) return "";
  if (href.startsWith("http")) return href;
  if (href.startsWith("//")) return "https:" + href;
  if (href.startsWith("/")) return BASE + href;
  return BASE + "/" + href;
}

/**
 * Iz HTML-a stranice kategorije izvlači linkove na proizvode.
 * Ovaj sajt koristi WooCommerce sa ?product= query param URL-ovima.
 */
function extractProductLinksFromCategory(html: string): string[] {
  const $ = cheerio.load(html);
  const set = new Set<string>();

  // Primarni selektor: svi linkovi koji sadrže ?product=
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") ?? "";
    if (href.includes("?product=") || href.includes("&product=")) {
      const abs = absoluteUrl(href);
      // Čistimo na samo ?product= deo (bez &add-to-cart i sl.)
      try {
        const u = new URL(abs);
        const prod = u.searchParams.get("product");
        if (prod) set.add(`${BASE}/?product=${prod}`);
      } catch {
        set.add(abs);
      }
    }
  });

  return Array.from(set);
}

/**
 * WooCommerce paginacija na ovom sajtu koristi ?paged=2 query param.
 */
function extractPaginationLinks(html: string, baseUrl: string): string[] {
  const $ = cheerio.load(html);
  const set = new Set<string>([baseUrl]);
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") ?? "";
    if (href.includes("paged=") || href.includes("page/")) {
      const abs = absoluteUrl(href);
      if (abs.includes(BASE)) set.add(abs);
    }
  });
  return Array.from(set);
}

/**
 * Iz HTML-a stranice proizvoda izvlači podatke.
 */
function extractProduct(html: string, url: string, cat: CatMapEntry): ScrapedProduct | null {
  const $ = cheerio.load(html);

  // Naziv
  const name =
    $("h1.product_title, h1.entry-title, h1.product-name, h1").first().text().trim() ||
    $("meta[property='og:title']").attr("content") ||
    "";
  if (!name) return null;

  // Cena
  const priceText =
    $("p.price, span.price, .price, [itemprop='price']").first().text().trim() ||
    $("meta[property='product:price:amount']").attr("content") ||
    "";
  const price = parsePriceRSD(priceText);

  // Opis
  const description =
    $("#tab-description, .woocommerce-product-details__short-description, .product-description, [itemprop='description']")
      .first()
      .text()
      .trim() ||
    $("meta[name='description']").attr("content") ||
    name;

  const shortDesc =
    $(".woocommerce-product-details__short-description, .summary p")
      .first()
      .text()
      .trim()
      .slice(0, 200) || description.slice(0, 160);

  // Slike — ovaj sajt koristi wp-content/uploads img src
  const imgUrls = new Set<string>();

  // 1. Galerija: data-large_image ili data-src sa wp-content
  $("img[src*='wp-content/uploads'], img[data-src*='wp-content/uploads'], img[data-large_image]").each((_, el) => {
    const $el = $(el);
    const candidates = [
      $el.attr("data-large_image"),
      $el.attr("data-src"),
      $el.attr("src"),
    ];
    for (const c of candidates) {
      if (c && c.includes("wp-content/uploads")) {
        // Pokušaj da dobiješ originalnu sliku (ukloni -700x700 ili slično)
        const original = c.replace(/-\d+x\d+(\.[a-z]+)$/i, "$1");
        imgUrls.add(absoluteUrl(original));
        break;
      }
    }
  });

  // 2. Fallback: og:image
  if (imgUrls.size === 0) {
    const og = $("meta[property='og:image']").attr("content");
    if (og) imgUrls.add(absoluteUrl(og));
  }

  // Brend — pokušaj iz WooCommerce brand atributa
  const knownBrands = [
    "Hikvision", "HiLook", "Hiwatch",
    "Dahua", "Imou",
    "Uniview", "Tiandy",
    "Ajax", "Paradox", "Risco",
    "Ultracell", "Bosch",
  ];

  // pa_brand-videonadzora atribut (specifično za ovaj sajt)
  let brand = $("[pa_brand-videonadzora], [data-pa_brand]").first().attr("pa_brand-videonadzora") ?? "";
  if (!brand) {
    // Pokušaj iz product meta tagova
    brand = $(".product_meta a").first().text().trim();
  }
  if (!brand) {
    // Izvuci iz naziva
    brand = knownBrands.find((b) => name.toLowerCase().includes(b.toLowerCase())) ?? name.split(/\s+/)[0] ?? "";
  }
  brand = brand || "Nepoznat";

  const slug = slugify(`${brand}-${name}`).slice(0, 80);

  return {
    source: url,
    ourCategory: cat.ourCategory,
    shortName: cat.shortName,
    name,
    slug,
    brand,
    price,
    shortDesc,
    description,
    images: Array.from(imgUrls), // vraćamo URL-ove starog sajta — main() će preuzeti i zameniti lokalnim putanjama
    attributes: { ...(cat.defaultAttributes ?? {}) },
  };
}

async function scrapeCategory(cat: CatMapEntry, limit: number | null): Promise<ScrapedProduct[]> {
  console.log(`\n📂 ${cat.label} (${cat.shortName})`);
  console.log(`  → ulazna stranica: ${cat.url}`);

  const firstHtml = await fetchHtml(cat.url);
  if (!firstHtml) {
    console.log(`  ⚠ Ne mogu da učitam stranicu. Preskačem.`);
    return [];
  }

  const pages = extractPaginationLinks(firstHtml, cat.url);
  console.log(`  → stranica: ${pages.length}`);

  const productUrls = new Set<string>();
  for (const pageUrl of pages) {
    const html = pageUrl === cat.url ? firstHtml : await fetchHtml(pageUrl);
    if (!html) continue;
    const links = extractProductLinksFromCategory(html);
    links.forEach((l) => productUrls.add(l));
    await wait(400);
  }
  console.log(`  → pronađeno proizvoda: ${productUrls.size}`);

  let urls = Array.from(productUrls);
  if (limit && limit > 0) urls = urls.slice(0, limit);

  const products: ScrapedProduct[] = [];
  let i = 0;
  for (const url of urls) {
    i++;
    process.stdout.write(`  [${i}/${urls.length}] `);
    const html = await fetchHtml(url);
    if (!html) {
      console.log(`× ${url}`);
      continue;
    }
    const product = extractProduct(html, url, cat);
    if (!product) {
      console.log(`× ${url} (nema imena)`);
      continue;
    }
    // Preuzmi slike
    const localImages: string[] = [];
    let imgIdx = 0;
    for (const imgUrl of product.images) {
      imgIdx++;
      const ext = (imgUrl.match(/\.(jpg|jpeg|png|webp)/i)?.[1] ?? "jpg").toLowerCase();
      const fileName = `${product.slug}-${imgIdx}.${ext}`;
      const destPath = join(OUT_IMG_DIR, cat.shortName, fileName);
      const ok = await downloadImage(imgUrl, destPath);
      if (ok) {
        localImages.push(`/products/scraped/${cat.shortName}/${fileName}`);
      }
    }
    product.images = localImages;
    products.push(product);
    console.log(`✓ ${product.name} (${product.images.length} slika)`);
    await wait(300); // mali predah, ne lupamo na server
  }

  return products;
}

async function main() {
  const args = process.argv.slice(2).filter(Boolean);
  const probe = args.includes("--probe");
  const onlyArg = args.find((a) => !a.startsWith("--"));

  const cats = onlyArg
    ? CATEGORIES.filter((c) => c.shortName === onlyArg.toLowerCase() || c.label.toLowerCase().includes(onlyArg.toLowerCase()))
    : CATEGORIES;

  if (cats.length === 0) {
    console.log(`Nepoznata kategorija: ${onlyArg}`);
    const unique = [...new Set(CATEGORIES.map((c) => c.shortName))];
    console.log(`Dostupne: ${unique.join(", ")}`);
    process.exit(1);
  }

  if (!existsSync(dirname(OUT_JSON))) {
    await mkdir(dirname(OUT_JSON), { recursive: true });
  }
  await mkdir(OUT_IMG_DIR, { recursive: true });

  const all: ScrapedProduct[] = [];
  for (const cat of cats) {
    const limit = probe ? 3 : null;
    const scraped = await scrapeCategory(cat, limit);
    all.push(...scraped);
    if (probe) break;
  }

  await writeFile(OUT_JSON, JSON.stringify(all, null, 2), "utf-8");
  console.log(`\n✅ Snimljeno ${all.length} proizvoda u ${OUT_JSON}`);
  console.log(`   Slike u: ${OUT_IMG_DIR}`);
  console.log(`\nSledeći korak: npm run import-scraped`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
