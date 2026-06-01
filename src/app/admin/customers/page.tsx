import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const users = await prisma.user
    .findMany({
      where: { role: "USER" },
      orderBy: { createdAt: "desc" },
      include: {
        orders: {
          select: { id: true, total: true, status: true },
        },
      },
    })
    .catch(() => []);

  // Sumiraj porudžbine i potrošnju
  const rows = users.map((u) => {
    const paid = u.orders.filter((o) =>
      ["PAID", "SHIPPED", "COMPLETED"].includes(o.status)
    );
    return {
      ...u,
      orderCount: u.orders.length,
      totalSpent: paid.reduce((s, o) => s + Number(o.total), 0),
    };
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">Korisnici</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Lista svih registrovanih korisnika i njihova istorija kupovine.
          </p>
        </div>
        <p className="text-sm text-ink-muted">
          Ukupno: <strong>{rows.length}</strong>
        </p>
      </div>

      <div className="card mt-6 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">Ime</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Telefon</th>
              <th className="px-4 py-3">Adresa</th>
              <th className="px-4 py-3 text-center">Porudžbine</th>
              <th className="px-4 py-3 text-right">Potrošeno</th>
              <th className="px-4 py-3">Član od</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-ink-muted"
                >
                  Nema registrovanih korisnika.
                </td>
              </tr>
            ) : (
              rows.map((u) => (
                <tr key={u.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium">
                    {u.name ?? <span className="text-ink-muted">—</span>}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    <a
                      href={`mailto:${u.email}`}
                      className="hover:text-brand"
                    >
                      {u.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {u.phone ? (
                      <a
                        href={`tel:${u.phone}`}
                        className="hover:text-brand"
                      >
                        {u.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {u.address ? `${u.address}, ${u.city ?? ""}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-center">{u.orderCount}</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatPrice(u.totalSpent)}
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {u.createdAt.toLocaleDateString("sr-RS")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
