// @ts-nocheck
"use client";

import { useCartStore } from "@/lib/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count, clearCart } = useCartStore();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty__icon">🛒</div>
        <h1 className="cart-empty__title">Korpa je prazna</h1>
        <p className="cart-empty__text">Dodajte proizvode u korpu da biste nastavili sa kupovinom.</p>
        <Link href="/shop" className="cart-empty__btn">Idi u prodavnicu</Link>

        <style>{`
          .cart-empty { text-align: center; padding: 80px 20px; }
          .cart-empty__icon { font-size: 64px; margin-bottom: 16px; }
          .cart-empty__title { font-size: 24px; font-weight: 700; color: var(--ink); margin-bottom: 10px; }
          .cart-empty__text { font-size: 15px; color: var(--ink-muted); margin-bottom: 24px; }
          .cart-empty__btn { display: inline-block; background: var(--brand); color: #fff; font-size: 15px; font-weight: 500; padding: 12px 28px; border-radius: 8px; text-decoration: none; }
          .cart-empty__btn:hover { background: var(--brand-dark); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Korpa ({count()} proizvoda)</h1>

      <div className="cart-layout">
        {/* Lista proizvoda */}
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item__img-wrap">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt={item.name} className="cart-item__img" />
                ) : (
                  <div className="cart-item__placeholder">📷</div>
                )}
              </div>

              <div className="cart-item__info">
                <Link href={`/shop/${item.slug}`} className="cart-item__name">
                  {item.name}
                </Link>
                <p className="cart-item__price-unit">
                  {item.price.toLocaleString("sr-RS")} RSD / kom
                </p>
              </div>

              <div className="cart-item__qty">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >−</button>
                <span className="qty-num">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >+</button>
              </div>

              <p className="cart-item__subtotal">
                {(item.price * item.quantity).toLocaleString("sr-RS")} RSD
              </p>

              <button
                className="cart-item__remove"
                onClick={() => removeItem(item.id)}
                aria-label="Ukloni"
              >×</button>
            </div>
          ))}

          <div className="cart-actions">
            <button onClick={clearCart} className="cart-clear">Isprazni korpu</button>
            <Link href="/shop" className="cart-continue">← Nastavi kupovinu</Link>
          </div>
        </div>

        {/* Sumarni box */}
        <div className="cart-summary">
          <h2 className="cart-summary__title">Pregled porudzbine</h2>

          <div className="cart-summary__rows">
            {items.map((item) => (
              <div key={item.id} className="cart-summary__row">
                <span>{item.name.slice(0, 30)}{item.name.length > 30 ? "..." : ""} ×{item.quantity}</span>
                <span>{(item.price * item.quantity).toLocaleString("sr-RS")} RSD</span>
              </div>
            ))}
          </div>

          <div className="cart-summary__divider" />

          <div className="cart-summary__total">
            <span>Ukupno</span>
            <span>{total().toLocaleString("sr-RS")} RSD</span>
          </div>

          <p className="cart-summary__note">
            Dostava se racuna pri porudzbini. Besplatna dostava za porudzbine preko 10.000 RSD.
          </p>

          <button
            className="cart-summary__checkout"
            onClick={() => router.push("/checkout")}
          >
            Nastavi na placanje →
          </button>

          <div className="cart-summary__secure">
            🔒 Sigurna kupovina &nbsp;|&nbsp; 📞 063224651
          </div>
        </div>
      </div>

      <style>{`
        .cart-page { max-width: 100%; }
        .cart-title { font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 24px; }
        .cart-layout { display: grid; grid-template-columns: 1fr 340px; gap: 24px; align-items: start; }

        /* Items */
        .cart-items { display: flex; flex-direction: column; gap: 12px; }
        .cart-item { display: flex; align-items: center; gap: 16px; background: #fff; border-radius: 10px; padding: 14px; border: 1px solid rgba(0,0,0,0.07); }
        .cart-item__img-wrap { width: 72px; height: 72px; border-radius: 6px; background: #f4f5f8; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; }
        .cart-item__img { width: 100%; height: 100%; object-fit: contain; }
        .cart-item__placeholder { font-size: 28px; opacity: 0.3; }
        .cart-item__info { flex: 1; min-width: 0; }
        .cart-item__name { font-size: 14px; font-weight: 500; color: var(--ink); text-decoration: none; display: block; margin-bottom: 4px; }
        .cart-item__name:hover { color: var(--brand); }
        .cart-item__price-unit { font-size: 12px; color: var(--ink-muted); }
        .cart-item__qty { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .qty-btn { width: 28px; height: 28px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.15); background: #fff; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .qty-btn:hover { background: #f0f2f8; }
        .qty-num { font-size: 14px; font-weight: 600; min-width: 24px; text-align: center; }
        .cart-item__subtotal { font-size: 15px; font-weight: 600; color: var(--brand); white-space: nowrap; flex-shrink: 0; min-width: 100px; text-align: right; }
        .cart-item__remove { width: 28px; height: 28px; border-radius: 50%; border: none; background: #fee2e2; color: #c62828; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cart-item__remove:hover { background: #fecaca; }
        .cart-actions { display: flex; align-items: center; justify-content: space-between; padding-top: 8px; }
        .cart-clear { font-size: 13px; color: #c62828; background: none; border: none; cursor: pointer; text-decoration: underline; }
        .cart-continue { font-size: 13px; color: var(--brand); text-decoration: none; }
        .cart-continue:hover { text-decoration: underline; }

        /* Summary */
        .cart-summary { background: #fff; border-radius: 12px; padding: 20px; border: 1px solid rgba(0,0,0,0.08); position: sticky; top: calc(var(--header-height) + 16px); }
        .cart-summary__title { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 16px; }
        .cart-summary__rows { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
        .cart-summary__row { display: flex; justify-content: space-between; font-size: 13px; color: var(--ink-muted); }
        .cart-summary__divider { height: 1px; background: rgba(0,0,0,0.08); margin: 12px 0; }
        .cart-summary__total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 12px; }
        .cart-summary__note { font-size: 12px; color: var(--ink-muted); margin-bottom: 16px; line-height: 1.5; }
        .cart-summary__checkout { width: 100%; padding: 14px; background: var(--brand); color: #fff; font-size: 15px; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: background 0.15s; margin-bottom: 12px; }
        .cart-summary__checkout:hover { background: var(--brand-dark); }
        .cart-summary__secure { font-size: 12px; color: var(--ink-muted); text-align: center; }

        @media (max-width: 768px) {
          .cart-layout { grid-template-columns: 1fr; }
          .cart-item { flex-wrap: wrap; }
          .cart-item__subtotal { min-width: auto; }
        }
      `}</style>
    </div>
  );
}
