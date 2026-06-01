// @ts-nocheck
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Initial = {
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
};

export function ProfileForm({ initial }: { initial: Initial }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg(null);
        const fd = new FormData(e.currentTarget);
        const payload = {
          name: String(fd.get("name") ?? "").trim() || null,
          phone: String(fd.get("phone") ?? "").trim() || null,
          address: String(fd.get("address") ?? "").trim() || null,
          city: String(fd.get("city") ?? "").trim() || null,
          zip: String(fd.get("zip") ?? "").trim() || null,
        };
        const res = await fetch("/api/account/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setLoading(false);
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          setMsg({ type: "err", text: d.error ?? "Greška pri snimanju." });
          return;
        }
        setMsg({ type: "ok", text: "Podaci su sačuvani." });
        router.refresh();
      }}
      className="space-y-4"
    >
      <div>
        <label className="label">Email</label>
        <input
          value={initial.email}
          readOnly
          disabled
          className="input cursor-not-allowed bg-slate-50 text-ink-muted"
        />
        <p className="mt-1 text-xs text-ink-muted">
          Email ne može da se menja. Za promenu nas kontaktiraj.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Ime i prezime</label>
          <input
            name="name"
            defaultValue={initial.name}
            className="input"
            placeholder="Marko Marković"
          />
        </div>
        <div>
          <label className="label">Telefon</label>
          <input
            name="phone"
            defaultValue={initial.phone}
            className="input"
            placeholder="+381 60 ..."
            inputMode="tel"
          />
        </div>
      </div>

      <div>
        <label className="label">Adresa stanovanja</label>
        <input
          name="address"
          defaultValue={initial.address}
          className="input"
          placeholder="Knez Mihailova 10"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr,140px]">
        <div>
          <label className="label">Grad</label>
          <input
            name="city"
            defaultValue={initial.city}
            className="input"
            placeholder="Beograd"
          />
        </div>
        <div>
          <label className="label">Poštanski broj</label>
          <input
            name="zip"
            defaultValue={initial.zip}
            className="input"
            placeholder="11000"
            inputMode="numeric"
          />
        </div>
      </div>

      {msg && (
        <div
          className={`rounded-xl p-3 text-sm ${
            msg.type === "ok"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Snimam…" : "Sačuvaj izmene"}
      </button>
    </form>
  );
}
