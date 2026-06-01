import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "./AddToCartButton";

interface Product {
  id: string;
  name: string;
  brand: string | null;
  price: number | null;
  showPrice: boolean;
  isBestseller: boolean;
  images: string[];
  slug: string;
}

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];

  return (
    <div className="product-card">
      <Link href={`/shop/${product.slug}`} className="product-card__image-wrap">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="product-card__image"
          />
        ) : (
          <div className="product-card__placeholder">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.25">
              <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="32" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>
        )}
        {product.isBestseller && (
          <span className="product-card__badge product-card__badge--best">
            Bestseler
          </span>
        )}
      </Link>

      <div className="product-card__body">
        {product.brand && (
          <p className="product-card__brand">{product.brand}</p>
        )}
        <Link href={`/shop/${product.slug}`} className="product-card__name">
          {product.name}
        </Link>
        <div className="product-card__footer">
          {product.showPrice && product.price !== null ? (
            <span className="product-card__price">
              {product.price.toLocaleString("sr-RS")} RSD
            </span>
          ) : (
            <span className="product-card__inquiry">Cena na upit</span>
          )}
          <AddToCartButton product={product} />
        </div>
      </div>

      <style>{`
        .product-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
        }
        .product-card:hover {
          border-color: var(--brand);
          box-shadow: 0 4px 20px rgba(29,62,184,0.12);
          transform: translateY(-2px);
        }
        .product-card__image-wrap {
          display: block;
          position: relative;
          height: 160px;
          background: #f4f5f8;
          overflow: hidden;
        }
        .product-card__image {
          object-fit: contain;
          transition: transform 0.3s;
        }
        .product-card:hover .product-card__image {
          transform: scale(1.05);
        }
        .product-card__placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
        }
        .product-card__badge {
          position: absolute;
          top: 8px;
          left: 8px;
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
        }
        .product-card__badge--best {
          background: var(--accent);
          color: var(--ink);
        }
        .product-card__body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .product-card__brand {
          font-size: 11px;
          color: var(--ink-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .product-card__name {
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.35;
          text-decoration: none;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .product-card__name:hover { color: var(--brand); }
        .product-card__footer {
          margin-top: auto;
          padding-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .product-card__price {
          font-size: 15px;
          font-weight: 600;
          color: var(--brand);
        }
        .product-card__inquiry {
          font-size: 12px;
          color: var(--ink-muted);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
