// @ts-nocheck
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      onClick={async () => {
        if (!confirm("Sigurno obrisati proizvod?")) return;
        setLoading(true);
        await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
        setLoading(false);
        router.refresh();
      }}
      disabled={loading}
      className="rounded-full px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {loading ? "…" : "Obriši"}
    </button>
  );
}
