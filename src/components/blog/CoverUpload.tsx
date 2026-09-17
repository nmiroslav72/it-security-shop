// @ts-nocheck
"use client";

import { useState } from "react";

export default function CoverUpload({ initial }) {
  const [url, setUrl] = useState(initial ?? "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onPick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) setErr(data.error || "Greska pri uploadu");
      else setUrl(data.url);
    } catch {
      setErr("Greska pri uploadu");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div className="cu">
      <input type="hidden" name="coverImage" value={url} />
      <div className="cu__row">
        <label className="cu__btn">
          {busy ? "Otpremam…" : "Izaberi sliku"}
          <input type="file" accept="image/*" onChange={onPick} disabled={busy} hidden />
        </label>
        <input
          className="cu__url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="/uploads/... ili https://…"
        />
      </div>
      {err && <p className="cu__err">{err}</p>}
      {url && <img src={url} alt="" className="cu__prev" />}

      <style>{`
        .cu { display:flex; flex-direction:column; gap:8px; }
        .cu__row { display:flex; gap:8px; align-items:center; }
        .cu__btn { flex:none; background:#1d3eb8; color:#fff; font-size:13px; padding:9px 14px; border-radius:6px; cursor:pointer; white-space:nowrap; }
        .cu__url { flex:1; border:1px solid #e2e5ee; border-radius:6px; padding:9px 11px; font-size:14px; font-family:inherit; }
        .cu__err { color:#dc2626; font-size:12px; margin:0; }
        .cu__prev { max-width:220px; border-radius:8px; margin-top:4px; }
      `}</style>
    </div>
  );
}
