import Link from "next/link";
import { auth } from "@/auth";
import { RevealPriceButton } from "./RevealPriceButton";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  regularPrice: number | null;
  salePrice: number | null;
  showPrice: boolean;
  images: string[];
  brand: string | null;
  isBestseller: boolean;
  inStock: boolean;
}

export async function ProductCard({ product }: { product: Product }) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const hasPrice = product.showPrice && product.price && product.price > 0;
  const isOnSale = product.salePrice && product.regularPrice && product.salePrice < product.regularPrice;
  const isDahua = product.brand === "Dahua";

  // Da li treba sakriti cenu iza dugmeta
  const hidePrice = isDahua && !isLoggedIn && hasPrice;

  return (
    <div className={"pc" + (product.isBestseller ? " pc--best" : "")}>
      <Link href={"/shop/" + product.slug} className="pc__img-wrap">
        {product.images[0] ? (
          <img src={product.images[0]} alt={product.name} className="pc__img" />
        ) : (
          <div className="pc__no-img">P</div>
        )}
        {product.isBestseller && <span className="pc__badge">Bestseler</span>}
        {isOnSale && <span className="pc__sale-badge">-{Math.round((1 - product.salePrice! / product.regularPrice!) * 100)}%</span>}
        {!product.inStock && <span className="pc__stock-badge">Rasprodato</span>}
      </Link>

      <div className="pc__body">
        {product.brand && <p className="pc__brand">{product.brand}</p>}
        <Link href={"/shop/" + product.slug} className="pc__name">{product.name}</Link>

        <div className="pc__footer">
          {hidePrice ? (
            <RevealPriceButton
              price={product.price!}
              regularPrice={product.regularPrice}
              salePrice={product.salePrice}
            />
          ) : hasPrice ? (
            <div className="pc__price-wrap">
              {isOnSale && (
                <span className="pc__old-price">{product.regularPrice!.toLocaleString("sr-RS")} RSD</span>
              )}
              <span className="pc__price">{product.price!.toLocaleString("sr-RS")} RSD</span>
            </div>
          ) : (
            <span className="pc__inquiry">Cena na upit</span>
          )}
        </div>
      </div>

      <style>{`
        .pc { background: #fff; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08); overflow: hidden; transition: border-color 0.15s, transform 0.15s; display: flex; flex-direction: column; }
        .pc:hover { border-color: var(--brand); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
        .pc--best { border-color: var(--accent); }
        .pc__img-wrap { display: block; aspect-ratio: 1; background: #f4f5f8; overflow: hidden; position: relative; }
        .pc__img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.3s; }
        .pc:hover .pc__img { transform: scale(1.05); }
        .pc__no-img { display: flex; align-items: center; justify-content: center; height: 100%; font-size: 40px; opacity: 0.2; }
        .pc__badge { position: absolute; top: 8px; left: 8px; background: var(--accent); color: var(--ink); font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px; }
        .pc__sale-badge { position: absolute; top: 8px; right: 8px; background: #c62828; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px; }
        .pc__stock-badge { position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.6); color: #fff; font-size: 10px; padding: 3px 8px; border-radius: 4px; }
        .pc__body { padding: 12px; display: flex; flex-direction: column; flex: 1; }
        .pc__brand { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--ink-muted); margin-bottom: 4px; }
        .pc__name { font-size: 13px; font-weight: 500; color: var(--ink); text-decoration: none; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; flex: 1; margin-bottom: 10px; }
        .pc__name:hover { color: var(--brand); }
        .pc__footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: auto; }
        .pc__price-wrap { display: flex; flex-direction: column; }
        .pc__price { font-size: 15px; font-weight: 700; color: var(--brand); }
        .pc__old-price { font-size: 11px; color: var(--ink-muted); text-decoration: line-through; }
        .pc__inquiry { font-size: 12px; color: var(--ink-muted); font-style: italic; }
        .pc__login-price { font-size: 11px; color: var(--brand); text-decoration: none; font-weight: 600; }
        .pc__login-price:hover { text-decoration: underline; }
        .pc__reveal-btn { font-size: 11px; color: var(--brand); background: none; border: 1px solid var(--brand); border-radius: 4px; padding: 4px 10px; cursor: pointer; font-weight: 600; transition: background 0.15s, color 0.15s; }
        .pc__reveal-btn:hover { background: var(--brand); color: #fff; }
      `}</style>
    </div>
  );
}
