"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses = [
  { value: "PENDING", label: "Na čekanju" },
  { value: "CONFIRMED", label: "Potvrđena" },
  { value: "PAID", label: "Plaćena" },
  { value: "SHIPPED", label: "Poslata" },
  { value: "COMPLETED", label: "Završena" },
  { value: "CANCELLED", label: "Otkazana" },
];

export function OrderStatusForm({
  id,
  current,
}: {
  id: string;
  current: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(current);
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-3">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input"
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <button
        onClick={async () => {
          setLoading(true);
          await fetch(`/api/admin/orders/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: value }),
          });
          setLoading(false);
          router.refresh();
        }}
        disabled={loading || value === current}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? "…" : "Sačuvaj"}
      </button>
    </div>
  );
}
