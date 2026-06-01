"use client";

import { useCartStore } from "@/lib/cart";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const USLOVI = `SAOBRAZNOST I REKLAMACIJE

Zakonom o zastiti potrosaca Trgovac je odgovoran za nesaobraznost robe ugovoru koja se pojavi u roku od 24 meseca od kupovine.

OBAVEZE POTROSACA:
1. Da prilikom preuzimanja robe ustanovi njenu kompletnost i fizicku neostecenos.
2. Da se striktno pridrzava uputstva za upotrebu i odrzavanje robe.
3. Da obezbedi odgovarajuce ambijentalane uslove i strujno napajanje.
4. Da se pre prve upotrebe upozna sa uslovima Ugovorne izjave.
5. Da prilikom reklamacije robe obavezno prilozi originalni fiskalni racun.

REKLAMACIJA:
Prodavac je duzan da u roku od 8 dana od dana prijema reklamacije odgovori potrosacu. Rok za resavanje reklamacije ne moze biti duzi od 30 dana za tehnicku robu.

Prijavu reklamacija mozete uputiti na: nmiroslav72@yahoo.com ili pozivom na 063/224651.
Radno vreme internet prodavnice: 0-24h`;

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [usloviOpen, setUsloviOpen] = useState(false);
  const [usloviOk, setUsloviOk] = useState(false);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🛒</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Korpa je prazna</h1>
        <Link href="/shop" style={{ background: "var(--brand)", color: "#fff", padding: "12px 24px", borderRadius: 8, textDecoration: "none" }}>Idi u prodavnicu</Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!usloviOk) {
      setError("Morate prihvatiti uslove kupovine pre potvrde porudzbine.");
      return;
    }
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement)?.value ?? "";
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: get("firstName"), lastName: get("lastName"),
          email: get("email"), phone: get("phone"),
          address: get("address"), city: get("city"),
          postalCode: get("postalCode"), note: get("note"),
          paymentMethod,
          items: items.map((i) => ({ productId: i.id, quantity: i.quantity, price: i.price })),
          total: total(),
        }),
      });
      if (!res.ok) throw new Error();
      clearCart();
      router.push("/checkout/success");
    } catch {
      setError("Doslo je do greske. Pozovite nas na 063224651.");
      setLoading(false);
    }
  }

  return (
    <div className="co-page">
      <div className="co-header">
        <h1 className="co-title">Zavrsetak porudzbine</h1>
        <div className="co-steps">
          <span className="co-step-on">1. Podaci</span>
          <span className="co-step-sep">→</span>
          <span className="co-step-on">2. Placanje</span>
          <span className="co-step-sep">→</span>
          <span className="co-step-off">3. Potvrda</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="co-layout">
        <div className="co-left">

          <div className="co-card">
            <h2 className="co-card-title"><span className="co-num">1</span>Licni podaci</h2>
            <div className="co-row2">
              <label className="co-lbl">Ime *<input name="firstName" required className="co-in" placeholder="Nikola" /></label>
              <label className="co-lbl">Prezime *<input name="lastName" required className="co-in" placeholder="Jovanovic" /></label>
            </div>
            <div className="co-row2">
              <label className="co-lbl">Email *<input name="email" type="email" required className="co-in" placeholder="email@gmail.com" /></label>
              <label className="co-lbl">Telefon *<input name="phone" type="tel" required className="co-in" placeholder="06x xxx xxxx" /></label>
            </div>
          </div>

          <div className="co-card">
            <h2 className="co-card-title"><span className="co-num">2</span>Adresa dostave</h2>
            <label className="co-lbl">Ulica i broj *<input name="address" required className="co-in" placeholder="Knez Mihailova 1" /></label>
            <div className="co-row2">
              <label className="co-lbl">Grad *<input name="city" required className="co-in" placeholder="Beograd" /></label>
              <label className="co-lbl">Postanski broj<input name="postalCode" className="co-in" placeholder="11000" /></label>
            </div>
            <label className="co-lbl">Napomena<textarea name="note" className="co-in" rows={3} style={{ resize: "vertical" }} placeholder="Posebni zahtevi, vreme dostave..." /></label>
          </div>

          <div className="co-card">
            <h2 className="co-card-title"><span className="co-num">3</span>Nacin placanja</h2>
            <div className="co-pays">
              <label className={`co-pay${paymentMethod === "cod" ? " co-pay-on" : ""}`}>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                <span className="co-pay-icon">🚚</span>
                <div><strong>Pouzecem</strong><p>Placate pri preuzimanju od dostavljaca</p></div>
              </label>
              <label className={`co-pay${paymentMethod === "bank" ? " co-pay-on" : ""}`}>
                <input type="radio" name="payment" value="bank" checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} />
                <span className="co-pay-icon">🏦</span>
                <div><strong>Uplata na racun</strong><p>Podaci za uplatu stizu emailom</p></div>
              </label>
            </div>
          </div>

        </div>

        <div className="co-right">
          <div className="co-summary">
            <h2 className="co-sum-title">Vasa porudzbina</h2>
            <div className="co-sum-items">
              {items.map((item) => (
                <div key={item.id} className="co-sum-item">
                  <div className="co-sum-img">
                    {item.image
                      ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      : <span>📷</span>}
                  </div>
                  <div className="co-sum-info">
                    <p className="co-sum-name">{item.name}</p>
                    <p className="co-sum-qty">x {item.quantity}</p>
                  </div>
                  <p className="co-sum-price">{(item.price * item.quantity).toLocaleString("sr-RS")} RSD</p>
                </div>
              ))}
            </div>
            <div className="co-divider" />
            <div className="co-total-row"><span>Dostava</span><span style={{ color: "#166534", fontWeight: 600 }}>Besplatno</span></div>
            <div className="co-total-big"><span>Ukupno</span><span className="co-total-price">{total().toLocaleString("sr-RS")} RSD</span></div>
            <div className="co-divider" />

            <label className="co-uslovi-check">
              <input type="checkbox" checked={usloviOk} onChange={(e) => setUsloviOk(e.target.checked)} style={{ accentColor: "var(--brand)", width: 16, height: 16, flexShrink: 0, marginTop: 2 }} />
              <span>
                Procitao/la sam i prihvatam{" "}
                <button type="button" onClick={() => setUsloviOpen(true)} className="co-uslovi-link">
                  uslove kupovine i garancije
                </button>
              </span>
            </label>

            {error && <p className="co-error">{error}</p>}

            <button type="submit" className="co-submit" disabled={loading || !usloviOk}>
              {loading ? "Slanje..." : "Potvrdi porudzbinu →"}
            </button>

            <div className="co-secure">
              <span>🔒 Sigurna kupovina</span>
              <span>📞 063224651</span>
              <span>↩ Povrat 14 dana</span>
            </div>
          </div>
        </div>
      </form>

      {usloviOpen && (
        <div className="co-overlay" onClick={() => setUsloviOpen(false)}>
          <div className="co-modal" onClick={(e) => e.stopPropagation()}>
            <div className="co-modal-hd">
              <h3>Uslovi kupovine i garancije</h3>
              <button className="co-modal-x" onClick={() => setUsloviOpen(false)}>×</button>
            </div>
            <div className="co-modal-body">
              <pre className="co-modal-txt">{USLOVI}</pre>
            </div>
            <div className="co-modal-ft">
              <button className="co-modal-accept" onClick={() => { setUsloviOk(true); setUsloviOpen(false); }}>Prihvatam uslove</button>
              <button className="co-modal-cancel" onClick={() => setUsloviOpen(false)}>Zatvori</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .co-page{max-width:100%}
        .co-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px}
        .co-title{font-size:22px;font-weight:700;color:var(--ink)}
        .co-steps{display:flex;align-items:center;gap:8px;font-size:13px}
        .co-step-on{color:var(--brand);font-weight:600}
        .co-step-off{color:var(--ink-muted)}
        .co-step-sep{color:var(--ink-muted)}
        .co-layout{display:grid;grid-template-columns:1fr 360px;gap:20px;align-items:start}
        .co-card{background:#fff;border-radius:12px;padding:20px;border:1px solid rgba(0,0,0,.08);margin-bottom:16px;box-shadow:0 1px 4px rgba(0,0,0,.05)}
        .co-card-title{font-size:15px;font-weight:700;color:var(--ink);margin-bottom:18px;display:flex;align-items:center;gap:10px}
        .co-num{width:28px;height:28px;border-radius:50%;background:var(--brand);color:#fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .co-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .co-lbl{display:flex;flex-direction:column;gap:5px;font-size:13px;font-weight:500;color:var(--ink);margin-bottom:12px}
        .co-in{font-size:13px;border:1.5px solid #e5e7eb;border-radius:8px;padding:10px 13px;background:#fff;color:var(--ink);width:100%;font-family:inherit;transition:border-color .15s}
        .co-in:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px rgba(29,62,184,.08)}
        .co-pays{display:flex;flex-direction:column;gap:10px}
        .co-pay{display:flex;align-items:center;gap:14px;padding:14px 16px;border:2px solid #e5e7eb;border-radius:10px;cursor:pointer;transition:all .15s}
        .co-pay-on{border-color:var(--brand);background:#eef2ff}
        .co-pay input{accent-color:var(--brand);width:16px;height:16px}
        .co-pay-icon{font-size:22px;flex-shrink:0}
        .co-pay strong{font-size:14px;color:var(--ink);display:block;margin-bottom:2px}
        .co-pay p{font-size:12px;color:var(--ink-muted);margin:0}
        .co-summary{background:#fff;border-radius:12px;padding:20px;border:1px solid rgba(0,0,0,.08);position:sticky;top:calc(var(--header-height) + 16px);box-shadow:0 1px 4px rgba(0,0,0,.05)}
        .co-sum-title{font-size:16px;font-weight:700;color:var(--ink);margin-bottom:16px}
        .co-sum-items{display:flex;flex-direction:column;gap:10px;margin-bottom:14px}
        .co-sum-item{display:flex;align-items:center;gap:10px}
        .co-sum-img{width:48px;height:48px;border-radius:6px;background:#f4f5f8;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:18px}
        .co-sum-info{flex:1;min-width:0}
        .co-sum-name{font-size:12px;font-weight:500;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .co-sum-qty{font-size:11px;color:var(--ink-muted)}
        .co-sum-price{font-size:13px;font-weight:600;color:var(--brand);white-space:nowrap;flex-shrink:0}
        .co-divider{height:1px;background:rgba(0,0,0,.08);margin:12px 0}
        .co-total-row{display:flex;justify-content:space-between;font-size:13px;color:var(--ink-muted);margin-bottom:6px}
        .co-total-big{display:flex;justify-content:space-between;font-size:16px;font-weight:700;color:var(--ink);margin-top:4px}
        .co-total-price{color:var(--brand);font-size:20px}
        .co-uslovi-check{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--ink);cursor:pointer;line-height:1.5;margin:14px 0}
        .co-uslovi-link{background:none;border:none;color:var(--brand);text-decoration:underline;cursor:pointer;font-size:13px;font-family:inherit;padding:0}
        .co-error{background:#fee2e2;color:#991b1b;font-size:13px;padding:10px 14px;border-radius:6px;margin-bottom:12px}
        .co-submit{width:100%;padding:15px;background:var(--brand);color:#fff;font-size:16px;font-weight:600;border:none;border-radius:10px;cursor:pointer;transition:background .15s;margin-bottom:14px}
        .co-submit:hover:not(:disabled){background:var(--brand-dark)}
        .co-submit:disabled{opacity:.45;cursor:not-allowed}
        .co-secure{display:flex;justify-content:space-between;font-size:11px;color:var(--ink-muted)}
        .co-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px}
        .co-modal{background:#fff;border-radius:14px;width:100%;max-width:620px;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.2)}
        .co-modal-hd{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid rgba(0,0,0,.08)}
        .co-modal-hd h3{font-size:16px;font-weight:700;color:var(--ink)}
        .co-modal-x{background:none;border:none;font-size:24px;cursor:pointer;color:var(--ink-muted);line-height:1}
        .co-modal-body{flex:1;overflow-y:auto;padding:20px 24px}
        .co-modal-txt{font-size:13px;line-height:1.7;color:var(--ink-muted);white-space:pre-wrap;font-family:inherit}
        .co-modal-ft{padding:16px 24px;border-top:1px solid rgba(0,0,0,.08);display:flex;gap:10px;justify-content:flex-end}
        .co-modal-accept{background:var(--brand);color:#fff;font-size:14px;font-weight:600;padding:10px 22px;border:none;border-radius:8px;cursor:pointer}
        .co-modal-cancel{background:#f0f0f0;color:var(--ink-muted);font-size:14px;padding:10px 18px;border:none;border-radius:8px;cursor:pointer}
        @media(max-width:900px){.co-layout{grid-template-columns:1fr}.co-summary{position:static}}
        @media(max-width:540px){.co-row2{grid-template-columns:1fr}}
      `}</style>
    </div>
  );
}
