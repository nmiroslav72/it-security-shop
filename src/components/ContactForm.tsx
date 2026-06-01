"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("sending");
        setError("");
        const fd = new FormData(e.currentTarget);
        const payload = Object.fromEntries(fd.entries());
        const res = await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          setStatus("ok");
          (e.target as HTMLFormElement).reset();
        } else {
          const data = await res.json().catch(() => ({}));
          setError(data.error ?? "Greška prilikom slanja.");
          setStatus("error");
        }
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Ime i prezime *</label>
          <input name="name" required className="input" placeholder="Pera Perić" />
        </div>
        <div>
          <label className="label">Email *</label>
          <input
            name="email"
            type="email"
            required
            className="input"
            placeholder="vas@email.com"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Telefon</label>
          <input name="phone" className="input" placeholder="+381 60 123 4567" />
        </div>
        <div>
          <label className="label">Tema *</label>
          <input name="subject" required className="input" placeholder="Ponuda za 4 kamere" />
        </div>
      </div>
      <div>
        <label className="label">Poruka *</label>
        <textarea
          name="message"
          required
          rows={5}
          className="input"
          placeholder="Opišite šta vam treba..."
        />
      </div>

      {status === "ok" && (
        <div className="rounded-xl bg-green-50 p-4 text-green-800">
          ✓ Hvala! Poruka je poslata. Javljamo se u najkraćem roku.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-xl bg-red-50 p-4 text-red-800">{error}</div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary disabled:opacity-50"
      >
        {status === "sending" ? "Šaljem…" : "Pošalji poruku"}
      </button>
    </form>
  );
}
