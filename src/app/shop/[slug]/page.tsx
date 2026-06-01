// @ts-nocheck
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!product) return { title: "Proizvod nije pronadjen" };

  const title = `${product.name} - cena i ugradnja | IT Security Beograd`;
  const description = product.description?.slice(0, 155) ||
    `${product.name} - prodaja i ugradnja u Beogradu. ${product.brand ? product.brand + ". " : ""}Garancija 2 godine. Pozovite 063224651.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug, active: true },
    include: { category: true },
  });

  if (!product) notFound();

  const attrs = product.attributes as Record<string, string>;
  const images = product.images ?? [];
  const mainImage = images[0] ?? null;

  // Related products from same category
  const related = product.categoryId
    ? await prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          active: true,
          NOT: { id: product.id },
        },
        take: 4,
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="pp-page">

      {/* JSON-LD strukturirani podaci za Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description || product.name,
            brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
            image: product.images,
            sku: product.sku || product.slug,
            offers: {
              "@type": "Offer",
              priceCurrency: "RSD",
              price: product.showPrice && product.price ? product.price : undefined,
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              seller: {
                "@type": "Organization",
                name: "IT Security",
                telephone: "+381-63-224651",
              },
            },
          }),
        }}
      />

      {/* Breadcrumb */}
      <nav className="pp-breadcrumb">
        <Link href="/shop">Prodavnica</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link href={`/shop?category=${product.category.slug}`}>
              {product.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Main product section */}
      <div className="pp-main">

        {/* Slike */}
        <div className="pp-gallery">
          <div className="pp-gallery__main">
            {mainImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mainImage} alt={product.name} className="pp-gallery__img" />
            ) : (
              <div className="pp-gallery__placeholder">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.2">
                  <rect x="8" y="16" width="64" height="48" rx="4" stroke="#0b1020" strokeWidth="2"/>
                  <circle cx="40" cy="40" r="12" stroke="#0b1020" strokeWidth="2"/>
                  <circle cx="62" cy="22" r="4" fill="#0b1020"/>
                </svg>
              </div>
            )}
            {product.isBestseller && (
              <span className="pp-badge">Bestseler</span>
            )}
          </div>

          {/* Thumbnail galerija */}
          {images.length > 1 && (
            <div className="pp-gallery__thumbs">
              {images.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={img} alt={`${product.name} ${i + 1}`} className="pp-gallery__thumb" />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pp-info">
          {product.brand && (
            <p className="pp-info__brand">{product.brand}</p>
          )}
          <h1 className="pp-info__name">{product.name}</h1>

          {/* Cena */}
          <div className="pp-info__price-wrap">
            {product.showPrice && product.price ? (
              <>
                {product.salePrice && product.regularPrice && product.salePrice < product.regularPrice && (
                  <span className="pp-info__old-price">
                    {product.regularPrice.toLocaleString("sr-RS")} RSD
                  </span>
                )}
                <span className="pp-info__price">
                  {product.price.toLocaleString("sr-RS")} RSD
                </span>
                {product.salePrice && product.regularPrice && (
                  <span className="pp-info__discount">
                    -{Math.round((1 - product.salePrice / product.regularPrice) * 100)}%
                  </span>
                )}
              </>
            ) : (
              <span className="pp-info__inquiry">Cena na upit</span>
            )}
          </div>

          {/* Dostupnost */}
          <div className={`pp-info__stock ${product.inStock ? "in" : "out"}`}>
            {product.inStock ? "Na stanju" : "Nije na stanju"}
          </div>

          {/* Atributi */}
          {Object.keys(attrs).length > 0 && (
            <div className="pp-info__attrs">
              {Object.entries(attrs).map(([key, val]) => (
                <div key={key} className="pp-info__attr">
                  <span className="pp-info__attr-key">{key}:</span>
                  <span className="pp-info__attr-val">{val}</span>
                </div>
              ))}
            </div>
          )}

          {/* Dugmad */}
          <div className="pp-info__actions">
            <AddToCartButton product={{
              id: product.id,
              name: product.name,
              price: product.price,
              showPrice: product.showPrice,
              images: product.images,
              slug: product.slug,
            }} large />
            <Link href="/contact" className="pp-info__upit">Posalji upit</Link>
          </div>

          {/* Info ikonice */}
          <div className="pp-info__badges">
            <div className="pp-info__badge">🚚 Dostava za 24h</div>
            <div className="pp-info__badge">🛡 Garancija 2 godine</div>
            <div className="pp-info__badge">↩ Povrat 14 dana</div>
            <div className="pp-info__badge">📞 Podrska 063224651</div>
          </div>
        </div>
      </div>

      {/* Opis */}
      {product.description && (
        <div className="pp-desc">
          <h2 className="pp-desc__title">Opis proizvoda — {product.name}</h2>
          <div className="pp-desc__text">{product.description}</div>
        </div>
      )}

      {/* Slicni proizvodi */}
      {related.length > 0 && (
        <div className="pp-related">
          <h2 className="pp-related__title">Slicni proizvodi iz kategorije {product.category?.name ?? ""}</h2>
          <div className="pp-related__grid">
            {related.map((p) => (
              <Link key={p.id} href={`/shop/${p.slug}`} className="pp-rel-card">
                <div className="pp-rel-card__img-wrap">
                  {p.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[0]} alt={p.name} className="pp-rel-card__img" />
                  ) : (
                    <div className="pp-rel-card__placeholder">📷</div>
                  )}
                </div>
                <div className="pp-rel-card__info">
                  <p className="pp-rel-card__name">{p.name}</p>
                  <p className="pp-rel-card__price">
                    {p.showPrice && p.price
                      ? `${p.price.toLocaleString("sr-RS")} RSD`
                      : "Cena na upit"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .pp-page { max-width: 100%; }

        /* Breadcrumb */
        .pp-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-muted); margin-bottom: 20px; flex-wrap: wrap; }
        .pp-breadcrumb a { color: var(--brand); text-decoration: none; }
        .pp-breadcrumb a:hover { text-decoration: underline; }

        /* Main */
        .pp-main { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }

        /* Gallery */
        .pp-gallery__main { background: #f4f5f8; border-radius: 12px; overflow: hidden; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; position: relative; }
        .pp-gallery__img { width: 100%; height: 100%; object-fit: contain; }
        .pp-gallery__placeholder { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
        .pp-badge { position: absolute; top: 12px; left: 12px; background: var(--accent); color: var(--ink); font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 4px; }
        .pp-gallery__thumbs { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
        .pp-gallery__thumb { width: 72px; height: 72px; object-fit: contain; border-radius: 6px; border: 2px solid transparent; cursor: pointer; background: #f4f5f8; }
        .pp-gallery__thumb:hover { border-color: var(--brand); }

        /* Info */
        .pp-info { display: flex; flex-direction: column; gap: 16px; }
        .pp-info__brand { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--ink-muted); }
        .pp-info__name { font-size: 22px; font-weight: 700; color: var(--ink); line-height: 1.3; }
        .pp-info__price-wrap { display: flex; align-items: center; gap: 10px; }
        .pp-info__price { font-size: 28px; font-weight: 700; color: var(--brand); }
        .pp-info__old-price { font-size: 18px; color: var(--ink-muted); text-decoration: line-through; }
        .pp-info__discount { background: #fee2e2; color: #c62828; font-size: 13px; font-weight: 600; padding: 3px 8px; border-radius: 4px; }
        .pp-info__inquiry { font-size: 20px; color: var(--ink-muted); font-style: italic; }
        .pp-info__stock { font-size: 13px; font-weight: 500; padding: 4px 10px; border-radius: 4px; width: fit-content; }
        .pp-info__stock.in { background: #dcfce7; color: #166534; }
        .pp-info__stock.out { background: #fee2e2; color: #991b1b; }
        .pp-info__attrs { display: flex; flex-direction: column; gap: 6px; background: #f4f5f8; border-radius: 8px; padding: 12px 16px; }
        .pp-info__attr { display: flex; gap: 8px; font-size: 13px; }
        .pp-info__attr-key { font-weight: 600; color: var(--ink); text-transform: capitalize; min-width: 80px; }
        .pp-info__attr-val { color: var(--ink-muted); }
        .pp-info__actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .pp-info__upit { display: inline-flex; align-items: center; padding: 12px 20px; border-radius: 8px; background: #f0f2f8; color: var(--brand); font-size: 14px; font-weight: 500; text-decoration: none; }
        .pp-info__upit:hover { background: #e0e4f4; }
        .pp-info__badges { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
        .pp-info__badge { font-size: 12px; color: var(--ink-muted); background: #f9fafb; border: 1px solid rgba(0,0,0,0.07); border-radius: 6px; padding: 8px 10px; }

        /* Opis */
        .pp-desc { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 32px; border: 1px solid rgba(0,0,0,0.07); }
        .pp-desc__title { font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,0.07); }
        .pp-desc__text { font-size: 14px; line-height: 1.8; color: var(--ink-muted); white-space: pre-line; }

        /* Related */
        .pp-related { margin-bottom: 32px; }
        .pp-related__title { font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 16px; }
        .pp-related__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .pp-rel-card { display: block; text-decoration: none; background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 10px; overflow: hidden; transition: border-color 0.15s, transform 0.15s; }
        .pp-rel-card:hover { border-color: var(--brand); transform: translateY(-2px); }
        .pp-rel-card__img-wrap { height: 120px; background: #f4f5f8; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .pp-rel-card__img { width: 100%; height: 100%; object-fit: contain; }
        .pp-rel-card__placeholder { font-size: 36px; opacity: 0.3; }
        .pp-rel-card__info { padding: 10px; }
        .pp-rel-card__name { font-size: 12px; font-weight: 500; color: var(--ink); line-height: 1.3; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .pp-rel-card__price { font-size: 13px; font-weight: 600; color: var(--brand); }

        @media (max-width: 768px) {
          .pp-main { grid-template-columns: 1fr; }
          .pp-related__grid { grid-template-columns: repeat(2, 1fr); }
          .pp-info__name { font-size: 18px; }
          .pp-info__price { font-size: 22px; }
        }
      `}</style>
    </div>
  );
}
