"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Initial = {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  shortDesc?: string;
  price?: number;
  showPrice?: boolean;
  stock?: number;
  category?: "CAMERAS" | "ALARMS" | "INTERCOMS" | "DVR";
  brand?: string;
  images?: string[];
  attributes?: Record<string, unknown>;
  isBestseller?: boolean;
  isFeatured?: boolean;
  isMonthlyOffer?: boolean;
  badge?: string | null;
  isActive?: boolean;
};

export function ProductForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPrice, setShowPrice] = useState(initial?.showPrice ?? true);
  const [isBestseller, setIsBestseller] = useState(initial?.isBestseller ?? false);
  const [isFeatured, setIsFeatured] = useState(initial?.isFeatured ?? false);
  const [isMonthlyOffer, setIsMonthlyOffer] = useState(initial?.isMonthlyOffer ?? false);
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);
  const [imagesText, setImagesText] = useState(
    (initial?.images ?? []).join("\n")
  );
  const [attrText, setAttrText] = useState(
    JSON.stringify(initial?.attributes ?? {}, null, 2)
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const fd = new FormData(e.currentTarget);
        let attributes: unknown = {};
        try {
          attributes = JSON.parse(attrText || "{}");
        } catch {
          setError("Atributi nisu validan JSON.");
          setLoading(false);
          return;
        }
        const badgeRaw = String(fd.get("badge") ?? "").trim();
        const payload = {
          name: fd.get("name"),
          slug: fd.get("slug"),
          description: fd.get("description"),
          shortDesc: fd.get("shortDesc"),
          price: Number(fd.get("price")),
          stock: Number(fd.get("stock") ?? 0),
          category: fd.get("category"),
          brand: fd.get("brand"),
          images: imagesText
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
          attributes,
          showPrice,
          isBestseller,
          isFeatured,
          isMonthlyOffer,
          badge: badgeRaw || null,
          isActive,
        };
        const url = initial?.id
          ? `/api/admin/products/${initial.id}`
          : `/api/admin/products`;
        const method = initial?.id ? "PUT" : "POST";
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setLoading(false);
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          setError(d.error ?? "Greška pri snimanju.");
          return;
        }
        router.push("/admin/products");
        router.refresh();
      }}
      className="grid gap-6 lg:grid-cols-2"
    >
      <div className="card space-y-4 p-6">
        <h2 className="text-lg font-bold">Osnovni podaci</h2>
        <div>
          <label className="label">Naziv *</label>
          <input name="name" required defaultValue={initial?.name} className="input" />
        </div>
        <div>
          <label className="label">Slug (URL) *</label>
          <input name="slug" required defaultValue={initial?.slug} className="input" />
        </div>
        <div>
          <label className="label">Kratak opis</label>
          <input
            name="shortDesc"
            defaultValue={initial?.shortDesc}
            className="input"
          />
        </div>
        <div>
          <label className="label">Pun opis *</label>
          <textarea
            name="description"
            required
            rows={5}
            defaultValue={initial?.description}
            className="input"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Cena (RSD) *</label>
            <input
              name="price"
              type="number"
              step="1"
              required
              defaultValue={initial?.price}
              className="input"
            />
          </div>
          <div>
            <label className="label">Zalihe</label>
            <input
              name="stock"
              type="number"
              defaultValue={initial?.stock ?? 0}
              className="input"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Kategorija *</label>
            <select
              name="category"
              required
              defaultValue={initial?.category ?? "CAMERAS"}
              className="input"
            >
              <option value="CAMERAS">Kamere</option>
              <option value="ALARMS">Alarmi</option>
              <option value="INTERCOMS">Interfoni</option>
              <option value="DVR">DVR snimači</option>
            </select>
          </div>
          <div>
            <label className="label">Brend *</label>
            <input
              name="brand"
              required
              defaultValue={initial?.brand}
              className="input"
            />
          </div>
        </div>
        <div>
          <label className="label">Badge na kartici (opciono)</label>
          <input
            name="badge"
            defaultValue={initial?.badge ?? ""}
            placeholder="npr. AKCIJA, NOVO, -15%, POPULARNO"
            className="input"
          />
          <p className="mt-1 text-xs text-ink-muted">
            Boja se automatski prilagođava: AKCIJA/% → crveno, NOVO → zeleno,
            POPULARNO → žuto, PRO → plavo.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card space-y-3 p-6">
          <h2 className="text-lg font-bold">Vidljivost i isticanje</h2>
          <Toggle
            checked={showPrice}
            onChange={setShowPrice}
            label="Prikaži cenu kupcima"
            hint="Ako je isključeno, na sajtu se prikazuje 'Cena na upit'."
          />
          <Toggle
            checked={isFeatured}
            onChange={setIsFeatured}
            label="Istaknut (na vrhu početne)"
            hint="Pojavljuje se u sekciji 'Aktuelne ponude' sa tabovima."
          />
          <Toggle
            checked={isBestseller}
            onChange={setIsBestseller}
            label="Bestseler"
            hint="Pojavljuje se u sekciji 'Najprodavaniji modeli' na početnoj."
          />
          <Toggle
            checked={isMonthlyOffer}
            onChange={setIsMonthlyOffer}
            label="Ponuda meseca"
            hint="Pojavljuje se u sekciji 'Ponuda meseca' iznad proizvoda u prodavnici (preporuka: 3 po kategoriji)."
          />
          <Toggle
            checked={isActive}
            onChange={setIsActive}
            label="Aktivan u prodavnici"
          />
        </div>

        <div className="card space-y-3 p-6">
          <h2 className="text-lg font-bold">Slike</h2>
          <p className="text-xs text-ink-muted">
            Po jedan URL po liniji (može biti URL slike ili putanja u /public).
          </p>
          <textarea
            value={imagesText}
            onChange={(e) => setImagesText(e.target.value)}
            rows={4}
            className="input font-mono text-xs"
            placeholder="/products/kamera-1.jpg"
          />
        </div>

        <div className="card space-y-3 p-6">
          <h2 className="text-lg font-bold">Atributi (JSON)</h2>
          <p className="text-xs text-ink-muted">
            Npr. kamere: <code>{`{"resolution":"4mpx","type":"IP","nightVision":true,"isKit":false}`}</code>
            <br />
            Alarmi: <code>{`{"equipment":["bežični detektori"],"productType":"detektori"}`}</code>
            <br />
            Interfoni: <code>{`{"interfonCategory":"video","productType":"monitor"}`}</code>
            <br />
            DVR snimači: <code>{`{"channels":"8","technology":"IP","hddSupport":"do 6TB"}`}</code>
          </p>
          <textarea
            value={attrText}
            onChange={(e) => setAttrText(e.target.value)}
            rows={6}
            className="input font-mono text-xs"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-red-800 lg:col-span-2">
          {error}
        </div>
      )}
      <div className="flex gap-3 lg:col-span-2">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Snimam…" : initial?.id ? "Sačuvaj izmene" : "Dodaj proizvod"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="btn-ghost"
        >
          Otkaži
        </button>
      </div>
    </form>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-3 rounded-lg border border-slate-200 p-3">
      <div>
        <p className="font-semibold">{label}</p>
        {hint && <p className="text-xs text-ink-muted">{hint}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-brand" : "bg-slate-300"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </label>
  );
}
