// @ts-nocheck
"use client";

import { useState, useRef } from "react";

interface ImageUploaderProps {
  defaultImages?: string[];
  name?: string;
}

export function ImageUploader({ defaultImages = [], name = "images" }: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setError("");

    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res  = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (data.url) {
          setImages((prev) => [...prev, data.url]);
        } else {
          setError(data.error ?? "Greska pri uploadu");
        }
      } catch {
        setError("Greska pri uploadu");
      }
    }

    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function addUrl() {
    const url = prompt("Unesite URL slike:");
    if (url?.trim()) setImages((prev) => [...prev, url.trim()]);
  }

  return (
    <div className="iu-wrap">
      <textarea name={name} value={images.join("\n")} readOnly style={{ display: "none" }} />

      {images.length > 0 && (
        <div className="iu-previews">
          {images.map((img, i) => (
            <div key={i} className="iu-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Slika ${i + 1}`} className="iu-preview__img" />
              <button type="button" onClick={() => removeImage(i)} className="iu-preview__remove">×</button>
              {i === 0 && <span className="iu-preview__main">Glavna</span>}
            </div>
          ))}
        </div>
      )}

      <div className="iu-actions">
        <label className={`iu-btn-upload${uploading ? " iu-btn-upload--loading" : ""}`}>
          {uploading ? "Uploading..." : "Dodaj sliku sa racunara"}
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFileChange} disabled={uploading} style={{ display: "none" }} />
        </label>
        <button type="button" onClick={addUrl} className="iu-btn-url">+ URL</button>
      </div>

      {error && <p className="iu-error">{error}</p>}
      <p className="iu-hint">Prva slika je glavna. Mozete dodati vise slika.</p>

      <style>{`
        .iu-wrap { display: flex; flex-direction: column; gap: 12px; }
        .iu-previews { display: flex; flex-wrap: wrap; gap: 8px; }
        .iu-preview { position: relative; width: 90px; height: 90px; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
        .iu-preview__img { width: 100%; height: 100%; object-fit: contain; background: #f9fafb; }
        .iu-preview__remove { position: absolute; top: 3px; right: 3px; width: 20px; height: 20px; background: rgba(0,0,0,0.6); color: #fff; border: none; border-radius: 50%; cursor: pointer; font-size: 14px; line-height: 1; display: flex; align-items: center; justify-content: center; }
        .iu-preview__main { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(29,62,184,0.8); color: #fff; font-size: 9px; text-align: center; padding: 2px; font-weight: 600; }
        .iu-actions { display: flex; gap: 8px; }
        .iu-btn-upload { display: inline-flex; align-items: center; padding: 8px 14px; background: #1d3eb8; color: #fff; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer; }
        .iu-btn-upload--loading { opacity: 0.6; cursor: default; }
        .iu-btn-url { padding: 8px 14px; background: #f0f0f0; color: #4a5168; border-radius: 6px; font-size: 12px; font-weight: 500; border: none; cursor: pointer; }
        .iu-error { color: #991b1b; font-size: 12px; }
        .iu-hint { font-size: 11px; color: #4a5168; }
      `}</style>
    </div>
  );
}
