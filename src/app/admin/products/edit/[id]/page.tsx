import { prisma } from "@/lib/prisma";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { redirect, notFound } from "next/navigation";

async function updateProduct(formData: FormData) {
  "use server";
  const id           = formData.get("id") as string;
  const name         = formData.get("name") as string;
  const price        = parseFloat(formData.get("price") as string) || null;
  const regularPrice = parseFloat(formData.get("regularPrice") as string) || null;
  const salePrice    = parseFloat(formData.get("salePrice") as string) || null;
  const categoryId   = formData.get("categoryId") as string || undefined;
  const imagesRaw    = (formData.get("images") as string).split("\n").map(s => s.trim()).filter(Boolean);
  const showPrice    = formData.get("showPrice") === "on";
  const inStock      = formData.get("inStock") === "on";
  const isBestseller = formData.get("isBestseller") === "on";
  const active       = formData.get("active") === "on";
  const brand        = formData.get("brand") as string || null;
  const description  = formData.get("description") as string || "";
  const rezolucija   = formData.get("rezolucija") as string || "";

  const attributes: Record<string, string> = {};
  if (rezolucija) attributes.rezolucija = rezolucija;

  await prisma.product.update({
    where: { id },
    data: {
      name, description, brand,
      price, regularPrice, salePrice,
      showPrice, inStock, isBestseller, active,
      images: imagesRaw,
      attributes,
      categoryId: categoryId || undefined,
    },
  });

  redirect("/admin/products");
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product    = await prisma.product.findUnique({ where: { id } });
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  if (!product) notFound();

  const attrs = product.attributes as Record<string, string>;
  const rezolucija = attrs?.rezolucija ?? "";

  return (
    <div className="pf-wrap">
      <div className="pf-header">
        <h1 className="pf-title">Izmena: {product.name}</h1>
      </div>

      <form action={updateProduct} className="pf-form">
        <input type="hidden" name="id" value={product.id} />
        <div className="pf-grid">

          <div className="pf-col">
            <div className="pf-card">
              <h3 className="pf-card__title">Osnovne informacije</h3>
              <label className="pf-label">Naziv proizvoda *
                <input name="name" required defaultValue={product.name} className="pf-input" />
              </label>
              <label className="pf-label">Opis
                <textarea name="description" className="pf-textarea" rows={5} defaultValue={product.description} />
              </label>
              <label className="pf-label">Brend
                <select name="brand" className="pf-select" defaultValue={product.brand ?? ""}>
                  <option value="">— Odaberi brend —</option>
                  {["Hikvision","Dahua","Uniview","TVT","Ajax","Paradox","Comelit","Imou"].map(b => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </label>
              <label className="pf-label">Kategorija
                <select name="categoryId" className="pf-select" defaultValue={product.categoryId ?? ""}>
                  <option value="">— Odaberi kategoriju —</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="pf-card">
              <h3 className="pf-card__title">Slike</h3>
              <ImageUploader name="images" defaultImages={product.images} />
            </div>
          </div>

          <div className="pf-col">
            <div className="pf-card">
              <h3 className="pf-card__title">Cena</h3>
              <label className="pf-label">Redovna cena (RSD)
                <input name="regularPrice" type="number" step="0.01" className="pf-input" defaultValue={product.regularPrice ?? ""} />
              </label>
              <label className="pf-label">Akcijska cena (RSD)
                <input name="salePrice" type="number" step="0.01" className="pf-input" defaultValue={product.salePrice ?? ""} />
              </label>
              <label className="pf-label">Cena za prikaz (RSD)
                <input name="price" type="number" step="0.01" className="pf-input" defaultValue={product.price ?? ""} />
              </label>
              <label className="pf-checkbox">
                <input name="showPrice" type="checkbox" defaultChecked={product.showPrice} />
                Prikazi cenu kupcima
              </label>
            </div>

            <div className="pf-card">
              <h3 className="pf-card__title">Atributi</h3>
              <label className="pf-label">Rezolucija
                <select name="rezolucija" className="pf-select" defaultValue={rezolucija}>
                  <option value="">— Odaberi —</option>
                  {["2MPX","4MPX","5MPX","6MPX","8MPX","10MPX","12MPX"].map(r => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="pf-card">
              <h3 className="pf-card__title">Status</h3>
              <label className="pf-checkbox">
                <input name="active" type="checkbox" defaultChecked={product.active} />
                Aktivan (vidljiv na sajtu)
              </label>
              <label className="pf-checkbox">
                <input name="inStock" type="checkbox" defaultChecked={product.inStock} />
                Na stanju
              </label>
              <label className="pf-checkbox">
                <input name="isBestseller" type="checkbox" defaultChecked={product.isBestseller} />
                Bestseler
              </label>
            </div>

            <div className="pf-actions">
              <a href="/admin/products" className="pf-btn-cancel">Odustani</a>
              <button type="submit" className="pf-btn-save">Sacuvaj izmene</button>
            </div>
          </div>
        </div>
      </form>

      <style>{`
        .pf-wrap { max-width: 1100px; }
        .pf-header { margin-bottom: 24px; }
        .pf-title { font-size: 22px; font-weight: 700; color: #0b1020; }
        .pf-grid { display: grid; grid-template-columns: 1fr 380px; gap: 20px; align-items: start; }
        .pf-col { display: flex; flex-direction: column; gap: 20px; }
        .pf-card { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .pf-card__title { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #4a5168; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0; }
        .pf-label { display: flex; flex-direction: column; gap: 5px; font-size: 13px; font-weight: 500; color: #0b1020; margin-bottom: 14px; }
        .pf-input, .pf-select, .pf-textarea { font-size: 13px; border: 1px solid #d1d5db; border-radius: 6px; padding: 8px 12px; background: #fff; color: #0b1020; width: 100%; transition: border-color 0.15s; font-family: inherit; }
        .pf-input:focus, .pf-select:focus, .pf-textarea:focus { outline: none; border-color: #1d3eb8; box-shadow: 0 0 0 3px rgba(29,62,184,0.1); }
        .pf-textarea { resize: vertical; }
        .pf-checkbox { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #0b1020; margin-bottom: 10px; cursor: pointer; }
        .pf-checkbox input { accent-color: #1d3eb8; width: 15px; height: 15px; }
        .pf-hint { font-size: 11px; color: #4a5168; margin-top: -8px; }
        .pf-actions { display: flex; gap: 10px; justify-content: flex-end; }
        .pf-btn-save { background: #1d3eb8; color: #fff; font-size: 14px; font-weight: 600; padding: 10px 24px; border-radius: 8px; border: none; cursor: pointer; }
        .pf-btn-save:hover { background: #152a85; }
        .pf-btn-cancel { background: #f0f0f0; color: #4a5168; font-size: 14px; font-weight: 500; padding: 10px 20px; border-radius: 8px; text-decoration: none; }
        .pf-btn-cancel:hover { background: #e0e0e0; }
        @media (max-width: 800px) { .pf-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
