export const dynamic = 'force-dynamic';
// @ts-nocheck
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/ProductCard";
import { SortSelect } from "@/components/shop/SortSelect";
import Link from "next/link";

const PER_PAGE = 16;

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string | string[];
    rezolucija?: string | string[];
    sort?: string;
    page?: string;
  }>;
}

async function getProducts(params: {
  category?: string;
  brand?: string | string[];
  rezolucija?: string | string[];
  sort?: string;
  page?: string;
}) {
  const where: Record<string, unknown> = { active: true, category: { slug: { notIn: ["dodatna-oprema-za-videonadzor"] } } };

  const VIDEO_NADZOR_SLUGS = ["hd-kamere","ip-kamere","wifi-kamere-bezicne","dvr-digitalni-snimaci","nvr-mrezni-snimaci"];
  const ALARMI_SLUGS = ["zicani-alarmi","bezicni-alarmi"];
  if (params.category === "video-nadzor") {
    where.category = { slug: { in: VIDEO_NADZOR_SLUGS } };
  } else if (params.category === "alarmi") {
    where.category = { slug: { in: ALARMI_SLUGS } };
  } else if (params.category) {
    where.category = { slug: params.category };
  }

  const brands = [params.brand ?? []].flat().filter(Boolean);
  if (brands.length) {
    where.brand = { in: brands };
  }

  // Rezolucija filter — gleda u attributes JSON polje
  const rezolucije = [params.rezolucija ?? []].flat().filter(Boolean);
  if (rezolucije.length) {
    where.OR = rezolucije.map((r) => ({
      attributes: { path: ["rezolucija"], equals: r },
    }));
  }

  // Ako sortiramo po ceni, iskljuci proizvode bez cene
  if (params.sort === "price_asc" || params.sort === "price_desc") {
    where.price = { not: null };
    where.showPrice = true;
  }

  type OrderBy = { price?: "asc" | "desc"; createdAt?: "asc" | "desc" };
  let orderBy: OrderBy = { createdAt: "desc" };
  if (params.sort === "price_asc")  orderBy = { price: "asc" };
  if (params.sort === "price_desc") orderBy = { price: "desc" };
  if (params.sort === "newest")     orderBy = { createdAt: "desc" };

  const page  = Math.max(1, parseInt(params.page ?? "1"));
  const skip  = (page - 1) * PER_PAGE;

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip, take: PER_PAGE }),
    prisma.product.count({ where }),
  ]);

  

  return { products, total, page, totalPages: Math.ceil(total / PER_PAGE) };
}

function buildUrl(base: URLSearchParams, page: number) {
  const p = new URLSearchParams(base);
  p.set("page", String(page));
  return `/shop?${p.toString()}`;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const { products, total, page, totalPages } = await getProducts(params);

  const categoryLabel = params.category
    ? params.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Svi proizvodi";

  const baseParams = new URLSearchParams();
  if (params.category) baseParams.set("category", params.category);
  if (params.sort)     baseParams.set("sort", params.sort);
  [params.brand ?? []].flat().filter(Boolean).forEach((b) => baseParams.append("brand", b));
  [params.rezolucija ?? []].flat().filter(Boolean).forEach((r) => baseParams.append("rezolucija", r));

  // Paginacija — brojevi stranica
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="shop-page">
      {/* Toolbar */}
      <div className="shop-page__toolbar">
        <h1 className="shop-page__heading">
          {categoryLabel}
          <span className="shop-page__count">{total} proizvoda</span>
        </h1>
        <SortSelect current={params.sort ?? ""} />
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="shop-page__empty">
          <p>Nema proizvoda za odabrane filtere.</p>
        </div>
      ) : (
        <div className="shop-page__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Paginacija */}
      {totalPages > 1 && (
        <div className="pagination">
          {page > 1 ? (
            <Link href={buildUrl(baseParams, page - 1)} className="pg-btn pg-btn--arrow">&larr;</Link>
          ) : (
            <span className="pg-btn pg-btn--arrow pg-btn--disabled">&larr;</span>
          )}

          {pages.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="pg-dots">...</span>
            ) : (
              <Link
                key={p}
                href={buildUrl(baseParams, p as number)}
                className={`pg-btn${p === page ? " pg-btn--active" : ""}`}
              >
                {p}
              </Link>
            )
          )}

          {page < totalPages ? (
            <Link href={buildUrl(baseParams, page + 1)} className="pg-btn pg-btn--arrow">&rarr;</Link>
          ) : (
            <span className="pg-btn pg-btn--arrow pg-btn--disabled">&rarr;</span>
          )}

          <span className="pg-info">Strana {page} od {totalPages} &nbsp;({total} proizvoda)</span>
        </div>
      )}

      <style>{`
        .shop-page__toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; gap: 12px; }
        .shop-page__heading { font-size: 18px; font-weight: 600; color: var(--ink); display: flex; align-items: baseline; gap: 10px; }
        .shop-page__count { font-size: 13px; font-weight: 400; color: var(--ink-muted); }
        .shop-page__sort { font-size: 13px; border: 1px solid rgba(0,0,0,0.12); border-radius: 6px; padding: 6px 12px; background: #fff; color: var(--ink); cursor: pointer; }
        .shop-page__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
        .shop-page__empty { text-align: center; padding: 60px 20px; color: var(--ink-muted); font-size: 15px; }
        .pagination { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; padding: 8px 0 24px; border-top: 1px solid rgba(0,0,0,0.07); margin-top: 8px; }
        .pg-btn { min-width: 36px; height: 36px; padding: 0 10px; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 13px; font-weight: 500; text-decoration: none; color: var(--ink); background: #fff; border: 1px solid rgba(0,0,0,0.12); transition: all 0.15s; }
        .pg-btn:hover { border-color: var(--brand); color: var(--brand); }
        .pg-btn--active { background: var(--brand); color: #fff; border-color: var(--brand); }
        .pg-btn--active:hover { background: var(--brand-dark); }
        .pg-btn--disabled { opacity: 0.35; cursor: default; pointer-events: none; }
        .pg-btn--arrow { font-size: 15px; }
        .pg-dots { font-size: 13px; color: var(--ink-muted); padding: 0 4px; }
        .pg-info { margin-left: auto; font-size: 12px; color: var(--ink-muted); }
        @media (max-width: 1200px) { .shop-page__grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 860px)  { .shop-page__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .shop-page__grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
