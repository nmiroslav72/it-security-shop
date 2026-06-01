// @ts-nocheck
"use client";

import { useState } from "react";

export function ReturnForm({ initialOrderNumber }: { initialOrderNumber?: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState<"RETURN" | "COMPLAINT">("RETURN");

  if (done) {
    return (
      <div className="rounded-2xl bg-emerald-50 p-6 text-center text-emerald-900">
        <p className="text-lg font-bold">Zahtev primljen!</p>
        <p className="mt-2 text-sm">
          Kontaktiraćemo te u roku od 24h na ostavljeni email i telefon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const fd = new FormData(e.currentTarget);
        const payload = {
          orderNumber: String(fd.get("orderNumber") ?? "").trim(),
          customerName: String(fd.get("customerName") ?? "").trim(),
          customerEmail: String(fd.get("customerEmail") ?? "").trim(),
          customerPhone: String(fd.get("customerPhone") ?? "").trim(),
          type,
          reason: String(fd.get("reason") ?? "").trim(),
        };
        const res = await fetch("/api/returns", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setLoading(false);
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          setError(d.error ?? "Greška. Pokušaj ponovo.");
          return;
        }
        setDone(true);
      }}
      className="space-y-4"
    >
      <fieldset className="grid gap-2 sm:grid-cols-2">
        <label
          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
            type === "RETURN"
              ? "border-brand bg-brand/5"
              : "border-slate-200 hover:bg-slate-50"
          }`}
        >
          <input
            type="radio"
            name="type"
            value="RETURN"
            checked={type === "RETURN"}
            onChange={() => setType("RETURN")}
            className="mt-1"
          />
          <span>
            <span className="block font-semibold">Povrat</span>
            <span className="block text-xs text-ink-muted">
              Odustajem od kupovine (u roku od 14 dana)
            </span>
          </span>
        </label>
        <label
          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
            type === "COMPLAINT"
              ? "border-brand bg-brand/5"
              : "border-slate-200 hover:bg-slate-50"
          }`}
        >
          <input
            type="radio"
            name="type"
            value="COMPLAINT"
            checked={type === "COMPLAINT"}
            onChange={() => setType("COMPLAINT")}
            className="mt-1"
          />
          <span>
            <span className="block font-semibold">Reklamacija</span>
            <span className="block text-xs text-ink-muted">
              Proizvod je neispravan ili oštećen
            </span>
          </span>
        </label>
      </fieldset>

      <div>
        <label className="label">Broj porudžbine *</label>
        <input
          name="orderNumber"
          required
          defaultValue={initialOrderNumber}
          placeholder="npr. ITS-2026-001"
          className="input font-mono"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Ime i prezime *</label>
          <input name="customerName" required className="input" />
        </div>
        <div>
          <label className="label">Telefon *</label>
          <input name="customerPhone" required className="input" inputMode="tel" />
        </div>
      </div>

      <div>
        <label className="label">Email (sa porudžbine) *</label>
        <input
          name="customerEmail"
          type="email"
          required
          className="input"
          inputMode="email"
        />
      </div>

      <div>
        <label className="label">Razlog *</label>
        <textarea
          name="reason"
          required
          rows={5}
          minLength={10}
          className="input"
          placeholder={
            type === "RETURN"
              ? "Razlog povrata (opciono detaljno)…"
              : "Opiši šta je neispravno, kada je problem nastao…"
          }
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
        {loading ? "Šaljem…" : "Pošalji zahtev"}
      </button>
    </form>
  );
}
