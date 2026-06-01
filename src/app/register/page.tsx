"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="container-app py-16">
      <div className="card mx-auto max-w-md p-8">
        <h1 className="mb-1 text-2xl font-extrabold">Kreiraj nalog</h1>
        <p className="mb-6 text-sm text-ink-muted">
          Registracija je opciona — možeš poručiti i kao gost.
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setLoading(true);
            const fd = new FormData(e.currentTarget);
            const payload = Object.fromEntries(fd.entries());
            const res = await fetch("/api/register", {
              method: "POST",
              body: JSON.stringify(payload),
              headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) {
              const d = await res.json().catch(() => ({}));
              setError(d.error ?? "Greška prilikom registracije.");
              setLoading(false);
              return;
            }
            // automatic login
            await signIn("credentials", {
              email: payload.email,
              password: payload.password,
              redirect: false,
            });
            setLoading(false);
            router.push("/");
            router.refresh();
          }}
          className="space-y-4"
        >
          <div>
            <label className="label">Ime i prezime</label>
            <input name="name" required className="input" />
          </div>
          <div>
            <label className="label">Email</label>
            <input name="email" type="email" required className="input" />
          </div>
          <div>
            <label className="label">Telefon (opciono)</label>
            <input name="phone" className="input" />
          </div>
          <div>
            <label className="label">Lozinka (min. 6 karaktera)</label>
            <input name="password" type="password" required minLength={6} className="input" />
          </div>
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</div>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Kreiram…" : "Registruj se"}
          </button>
          <p className="text-center text-sm text-ink-muted">
            Već imaš nalog?{" "}
            <Link href="/login" className="font-semibold text-brand hover:underline">
              Prijavi se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
