// @ts-nocheck
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [products, orders, messages, categories] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.category.count(),
  ]);

  const recentProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, price: true, active: true, createdAt: true },
  });

  const stats = [
    { label: "Ukupno proizvoda", value: products, href: "/admin/products", color: "#1d3eb8" },
    { label: "Kategorija",       value: categories, href: "/admin/products", color: "#059669" },
    { label: "Porudzbine",       value: orders,   href: "/admin/orders",   color: "#d97706" },
    { label: "Nove poruke",      value: messages, href: "/admin/messages", color: "#dc2626" },
  ];

  return (
    <div>
      <h1 className="dash-title">Pregled</h1>

      <div className="dash-stats">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="dash-stat">
            <span className="dash-stat__value" style={{ color: s.color }}>{s.value}</span>
            <span className="dash-stat__label">{s.label}</span>
          </Link>
        ))}
      </div>

      <div className="dash-section">
        <div className="dash-section__header">
          <h2 className="dash-section__title">Poslednje dodati proizvodi</h2>
          <Link href="/admin/products/new" className="dash-btn">+ Novi proizvod</Link>
        </div>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Cena</th>
                <th>Status</th>
                <th>Akcija</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.price ? `${p.price.toLocaleString("sr-RS")} RSD` : "Na upit"}</td>
                  <td>
                    <span className={`dash-badge ${p.active ? "dash-badge--green" : "dash-badge--red"}`}>
                      {p.active ? "Aktivan" : "Neaktivan"}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/products/edit/${p.id}`} className="dash-link">Izmeni</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .dash-title { font-size: 24px; font-weight: 700; color: #0b1020; margin-bottom: 24px; }
        .dash-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .dash-stat { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); text-decoration: none; display: flex; flex-direction: column; gap: 6px; transition: box-shadow 0.15s; }
        .dash-stat:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
        .dash-stat__value { font-size: 32px; font-weight: 700; line-height: 1; }
        .dash-stat__label { font-size: 13px; color: #4a5168; }
        .dash-section { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .dash-section__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .dash-section__title { font-size: 15px; font-weight: 600; color: #0b1020; }
        .dash-btn { background: #1d3eb8; color: #fff; font-size: 12px; padding: 6px 14px; border-radius: 6px; text-decoration: none; }
        .dash-table-wrap { overflow: auto; }
        .dash-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .dash-table th { text-align: left; padding: 10px 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #4a5168; border-bottom: 1px solid #f0f0f0; }
        .dash-table td { padding: 10px 12px; border-bottom: 1px solid #f9f9f9; }
        .dash-badge { font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 20px; }
        .dash-badge--green { background: #dcfce7; color: #166534; }
        .dash-badge--red { background: #fee2e2; color: #991b1b; }
        .dash-link { color: #1d3eb8; font-size: 12px; text-decoration: none; }
        .dash-link:hover { text-decoration: underline; }
        @media (max-width: 700px) { .dash-stats { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
