"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

type PaymentMethod = "CARD_ONLINE" | "CASH_ON_DELIVERY" | "BANK_TRANSFER";

export type CheckoutInitial = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  zip?: string | null;
};

export function CheckoutForm({
  initial,
  isLoggedIn,
}: {
  initial?: CheckoutInitial;
  isLoggedIn?: boolean;
}) {
  const router = useRouter();
  const { items, total, clear } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [method, setMethod] = useState<PaymentMethod>("CARD_ONLINE");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  if (items.length === 0) {
    return (
      <div className="container-app py-20 text-center">
        <h1 className="text-2xl font-bold">Korpa je prazna.</h1>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-8 sm:py-10">
      <div className="container-app">
        <h1 className="mb-6 text-2xl font-extrabold sm:text-3xl">
          Završetak porudžbine
        </h1>

        {isLoggedIn && (
          <div className="mb-5 rounded-xl bg-brand/5 p-4 text-sm text-brand">
            Polja su popunjena iz tvog profila — ako treba, izmeni pre slanja.
          </div>
        )}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitting(true);
            setError("");
            const fd = new FormData(e.currentTarget);
            const customer = Object.fromEntries(fd.entries());
            const res = await fetch("/api/checkout", {
              method: "POST",
              body: JSON.stringify({
                customer,
                paymentMethod: method,
                items: items.map((i) => ({
                  productId: i.id,
                  quantity: i.quantity,
                })),
              }),
              headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) {
              const data = await res.json().catch(() => ({}));
              setError(data.error ?? "Greška prilikom porudžbine.");
              setSubmitting(false);
              return;
            }
            const data = await res.json();
            clear();
            if (data.redirectUrl) {
              window.location.href = data.redirectUrl;
            } else {
              router.push(`/checkout/success?order=${data.orderNumber}`);
            }
          }}
          className="grid gap-6 lg:grid-cols-[1fr,360px] lg:gap-8"
        >
          <div className="space-y-6">
            <Section title="Podaci o kupcu">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Ime i prezime *"
                  name="name"
                  required
                  defaultValue={initial?.name ?? ""}
                />
                <Field
                  label="Email *"
                  name="email"
                  type="email"
                  required
                  defaultValue={initial?.email ?? ""}
                />
                <Field
                  label="Telefon *"
                  name="phone"
                  required
                  defaultValue={initial?.phone ?? ""}
                />
                <Field
                  label="Grad *"
                  name="city"
                  required
                  defaultValue={initial?.city ?? ""}
                />
                <Field
                  label="Adresa *"
                  name="address"
                  required
                  className="sm:col-span-2"
                  defaultValue={initial?.address ?? ""}
                />
                <Field
                  label="Poštanski broj *"
                  name="zip"
                  required
                  defaultValue={initial?.zip ?? ""}
                />
              </div>
              <div className="mt-4">
                <label className="label">Napomena (opciono)</label>
                <textarea name="notes" rows={3} className="input" />
              </div>
            </Section>

            <Section title="Način plaćanja">
              <div className="space-y-2">
                <PaymentOption
                  value="CARD_ONLINE"
                  current={method}
                  onChange={setMethod}
                  title="Online karticom"
                  desc="Visa / MasterCard / Maestro / Dina. Bezbedno plaćanje."
                />
                <PaymentOption
                  value="BANK_TRANSFER"
                  current={method}
                  onChange={setMethod}
                  title="Uplatom na račun"
                  desc="Šaljemo predračun na email."
                />
                <PaymentOption
                  value="CASH_ON_DELIVERY"
                  current={method}
                  onChange={setMethod}
                  title="Pouzećem"
                  desc="Plaćate kuriru pri preuzimanju."
                />
              </div>
            </Section>

            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-red-800">{error}</div>
            )}
          </div>

          <aside className="card sticky top-20 h-fit p-6">
            <h2 className="text-xl font-bold">Porudžbina</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between gap-2">
                  <span className="line-clamp-1">
                    {i.name} × {i.quantity}
                  </span>
                  <span className="shrink-0 font-semibold">
                    {i.showPrice ? formatPrice(i.price * i.quantity) : "—"}
                  </span>
                </li>
              ))}
            </ul>
            <div className="my-4 h-px bg-slate-200" />
            <div className="flex justify-between text-lg font-bold">
              <span>Ukupno</span>
              <span>{formatPrice(total())}</span>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-6 w-full disabled:opacity-50"
            >
              {submitting ? "Slanje…" : "Potvrdi porudžbinu"}
            </button>
            <p className="mt-3 text-xs text-ink-muted">
              Klikom potvrđujete da ste saglasni sa uslovima korišćenja.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6">
      <h2 className="mb-4 text-lg font-bold">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  className,
  ...props
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      <input className="input" {...props} />
    </div>
  );
}

function PaymentOption({
  value,
  current,
  onChange,
  title,
  desc,
}: {
  value: PaymentMethod;
  current: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
  title: string;
  desc: string;
}) {
  const active = value === current;
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
        active ? "border-brand bg-brand/5" : "border-slate-200 hover:bg-slate-50"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={active}
        onChange={() => onChange(value)}
        className="mt-0.5 h-4 w-4 text-brand focus:ring-brand"
      />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-ink-muted">{desc}</p>
      </div>
    </label>
  );
}
