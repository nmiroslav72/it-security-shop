"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const options = [
  { value: "PENDING", label: "Primljeno" },
  { value: "IN_REVIEW", label: "U pregledu" },
  { value: "APPROVED", label: "Odobreno" },
  { value: "REJECTED", label: "Odbijeno" },
  { value: "RESOLVED", label: "Rešeno" },
];

export function ReturnStatusSelect({
  id,
  status,
  initialNote,
}: {
  id: string;
  status: string;
  initialNote: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [note, setNote] = useState(initialNote);
  const [saving, setSaving] = useState(false);
  const [editingNote, setEditingNote] = useState(false);

  async function update(payload: { status?: string; adminNote?: string | null }) {
    setSaving(true);
    const res = await fetch(`/api/admin/returns/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) router.refresh();
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <select
        disabled={saving}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          update({ status: e.target.value });
        }}
        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {editingNote ? (
        <div className="flex gap-2">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Beleška za interno…"
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
          />
          <button
            type="button"
            disabled={saving}
            onClick={async () => {
              await update({ adminNote: note || null });
              setEditingNote(false);
            }}
            className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white"
          >
            Snimi
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setEditingNote(true)}
          className="text-xs font-semibold text-brand hover:underline"
        >
          {note ? "Izmeni belešku" : "+ Dodaj belešku"}
        </button>
      )}
    </div>
  );
}
