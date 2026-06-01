// @ts-nocheck
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function deleteProduct(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.product.delete({ where: { id } });
  redirect("/admin/products");
}

async function toggleActive(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const active = formData.get("active") === "true";
  await prisma.product.update({ where: { id }, data: { active: !active } });
  redirect("/admin/products");
}

async function toggleBestseller(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isBestseller = formData.get("isBestseller") === "true";
  await prisma.product.update({ where: { id }, data: { isBestseller: !isBestseller } });
  redirect("/admin/products");
}

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div>
      <div className="ap-header">
        <div>
          <h1 className="ap-title">Proizvodi</h1>
          <p className="ap-sub">{products.length} ukupno</p>
        </div>
        <Link href="/admin/products/new" className="ap-btn-primary">+ Novi proizvod</Link>
      </div>

      <div className="ap-table-wrap">
        <table className="ap-table">
          <thead>
            <tr>
              <th>Slika</th>
              <th>Naziv</th>
              <th>Kategorija</th>
              <th>Brend</th>
              <th>Cena</th>
              <th>Aktivan</th>
              <th>Bestseler</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className={!p.active ? "ap-row--inactive" : ""}>
                <td>
                  {p.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[0]} alt={p.name} className="ap-thumb" />
                  ) : (
                    <div className="ap-thumb ap-thumb--empty">?</div>
                  )}
                </td>
                <td className="ap-name">{p.name}</td>
                <td className="ap-cat">{p.category?.name ?? "—"}</td>
                <td>{p.brand ?? "—"}</td>
                <td className="ap-price">
                  {p.showPrice && p.price ? `${p.price.toLocaleString("sr-RS")} RSD` : "Na upit"}
                </td>
                <td>
                  <form action={toggleActive}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="active" value={String(p.active)} />
                    <button type="submit" className={`ap-toggle ${p.active ? "ap-toggle--on" : "ap-toggle--off"}`}>
                      {p.active ? "DA" : "NE"}
                    </button>
                  </form>
                </td>
                <td>
                  <form action={toggleBestseller}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="isBestseller" value={String(p.isBestseller)} />
                    <button type="submit" className={`ap-toggle ${p.isBestseller ? "ap-toggle--on" : "ap-toggle--off"}`}>
                      {p.isBestseller ? "DA" : "NE"}
                    </button>
                  </form>
                </td>
                <td className="ap-actions">
                  <Link href={`/admin/products/edit/${p.id}`} className="ap-btn-edit">Izmeni</Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="ap-btn-delete">Obrisi</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .ap-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; }
        .ap-title { font-size: 22px; font-weight: 700; color: #0b1020; }
        .ap-sub { font-size: 13px; color: #4a5168; margin-top: 2px; }
        .ap-btn-primary { background: #1d3eb8; color: #fff; font-size: 13px; font-weight: 500; padding: 8px 18px; border-radius: 6px; text-decoration: none; }
        .ap-btn-primary:hover { background: #152a85; }
        .ap-table-wrap { background: #fff; border-radius: 10px; overflow: auto; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .ap-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .ap-table th { text-align: left; padding: 12px 14px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #4a5168; border-bottom: 1px solid #e5e7eb; background: #f9fafb; }
        .ap-table td { padding: 10px 14px; border-bottom: 1px solid #f0f0f0; vertical-align: middle; }
        .ap-table tr:last-child td { border-bottom: none; }
        .ap-row--inactive { opacity: 0.5; }
        .ap-thumb { width: 48px; height: 48px; object-fit: contain; border-radius: 6px; background: #f4f5f8; }
        .ap-thumb--empty { display: flex; align-items: center; justify-content: center; color: #ccc; font-size: 18px; }
        .ap-name { font-weight: 500; max-width: 220px; }
        .ap-cat { color: #4a5168; }
        .ap-price { font-weight: 600; color: #1d3eb8; white-space: nowrap; }
        .ap-toggle { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; border: none; cursor: pointer; }
        .ap-toggle--on { background: #dcfce7; color: #166534; }
        .ap-toggle--off { background: #fee2e2; color: #991b1b; }
        .ap-actions { display: flex; gap: 6px; align-items: center; }
        .ap-btn-edit { font-size: 12px; color: #1d3eb8; text-decoration: none; padding: 4px 10px; border-radius: 4px; background: #eef2ff; }
        .ap-btn-edit:hover { background: #dde5ff; }
        .ap-btn-delete { font-size: 12px; color: #991b1b; padding: 4px 10px; border-radius: 4px; background: #fee2e2; border: none; cursor: pointer; }
        .ap-btn-delete:hover { background: #fecaca; }
      `}</style>
    </div>
  );
}
