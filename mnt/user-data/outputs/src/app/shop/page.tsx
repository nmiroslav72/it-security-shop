import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/ProductCard";

interface ShopPageProps {
  searchParams: {
    category?: string;
    brand?: string | string[];
    res?: string | string[];
    type?: string | string[];
    sort?: string;
  };
}

async function getProducts(searchParams: ShopPageProps["searchParams"]) {
  const where: Record<string, unknown> = { active: true };

  if (searchParams.category) {
    where.category = searchParams.category;
  }

  const brands = [searchParams.brand ?? []].flat().filter(Boolean);
  if (brands.length) {
    where.brand = { in: brands };
  }

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (searchParams.sort === "price_asc") orderBy = { price: "asc" };
  if (searchParams.sort === "price_desc") orderBy = { price: "desc" };

  return prisma.product.findMany({ where, orderBy, take: 60 });
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const products = await getProducts(searchParams);

  const categoryLabel =
    searchParams.category
      ? searchParams.category
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())
      : "Svi proizvodi";

  return (
    <div className="shop-page">
      {/* Toolbar */}
      <div className="shop-page__toolbar">
        <h1 className="shop-page__heading">
          {categoryLabel}
          <span className="shop-page__count">{products.length} proizvoda</span>
        </h1>
        <form className="shop-page__sort-form">
          <input type="hidden" name="category" value={searchParams.category ?? ""} />
          <select name="sort" className="shop-page__sort" defaultValue={searchParams.sort ?? ""}>
            <option value="">Po popularnosti</option>
            <option value="price_asc">Cena: rastuće</option>
            <option value="price_desc">Cena: opadajuće</option>
            <option value="newest">Najnovije</option>
          </select>
        </form>
      </div>

      {/* Product grid — 4 columns */}
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

      <style>{`
        .shop-page {}
        .shop-page__toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          gap: 12px;
        }
        .shop-page__heading {
          font-size: 18px;
          font-weight: 600;
          color: var(--ink);
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .shop-page__count {
          font-size: 13px;
          font-weight: 400;
          color: var(--ink-muted);
        }
        .shop-page__sort {
          font-size: 13px;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 6px;
          padding: 6px 12px;
          background: #fff;
          color: var(--ink);
        }
        .shop-page__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .shop-page__empty {
          text-align: center;
          padding: 60px 20px;
          color: var(--ink-muted);
          font-size: 15px;
        }
        @media (max-width: 1200px) {
          .shop-page__grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 860px) {
          .shop-page__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .shop-page__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
