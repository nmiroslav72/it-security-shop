
export default function PostForm({ action, initial, onDelete }) {
  return (
    <>
      <form action={action} className="bf">
        <label className="bf__l">Naslov
          <input name="title" defaultValue={initial?.title ?? ""} required />
        </label>
        <label className="bf__l">Slug (URL) <span className="bf__hint">— ostavi prazno da se izvede iz naslova</span>
          <input name="slug" defaultValue={initial?.slug ?? ""} placeholder="npr. kako-odabrati-ip-kameru" />
        </label>
        <label className="bf__l">Kratak opis (excerpt)
          <textarea name="excerpt" rows={2} defaultValue={initial?.excerpt ?? ""} />
        </label>
        <label className="bf__l">Naslovna slika (URL)
          <input name="coverImage" defaultValue={initial?.coverImage ?? ""} placeholder="/uploads/... ili https://..." />
        </label>
        <label className="bf__l">Tekst (HTML)
          <textarea name="content" rows={16} defaultValue={initial?.content ?? ""} />
        </label>
        <div className="bf__row">
          <label className="bf__l">Meta naslov (SEO)
            <input name="metaTitle" defaultValue={initial?.metaTitle ?? ""} />
          </label>
          <label className="bf__l">Meta opis (SEO)
            <input name="metaDescription" defaultValue={initial?.metaDescription ?? ""} />
          </label>
        </div>
        <div className="bf__checks">
          <label><input type="checkbox" name="published" defaultChecked={initial?.published ?? false} /> Objavljen</label>
          <label><input type="checkbox" name="isFeatured" defaultChecked={initial?.isFeatured ?? false} /> Izdvojen</label>
        </div>
        <button type="submit" className="bf__save">Sacuvaj</button>
      </form>

      {onDelete && (
        <form action={onDelete} style={{ marginTop: 12 }}>
          <button type="submit" className="bf__del">Izbrisi tekst</button>
        </form>
      )}

      <style>{`
        .bf { background:#fff; border-radius:10px; padding:20px; box-shadow:0 1px 4px rgba(0,0,0,.08); display:flex; flex-direction:column; gap:16px; max-width:760px; }
        .bf__l { display:flex; flex-direction:column; gap:6px; font-size:13px; font-weight:600; color:#0b1020; }
        .bf__hint { font-weight:400; color:#4a5168; }
        .bf input, .bf textarea { border:1px solid #e2e5ee; border-radius:6px; padding:9px 11px; font-size:14px; font-family:inherit; }
        .bf__row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .bf__checks { display:flex; gap:20px; font-size:13px; font-weight:600; color:#0b1020; }
        .bf__save { align-self:flex-start; background:#1d3eb8; color:#fff; border:0; padding:10px 22px; border-radius:6px; font-size:14px; cursor:pointer; }
        .bf__del { background:#fff; color:#dc2626; border:1px solid #fecaca; padding:8px 16px; border-radius:6px; font-size:13px; cursor:pointer; }
        @media (max-width:700px){ .bf__row{ grid-template-columns:1fr; } }
      `}</style>
    </>
  );
}
