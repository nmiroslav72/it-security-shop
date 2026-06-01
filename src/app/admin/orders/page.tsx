// @ts-nocheck
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order
    .findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { items: true } } },
    })
    .catch(() => []);

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Porudžbine</h1>

      <div className="card mt-6 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">Broj</th>
              <th className="px-4 py-3">Kupac</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Stavki</th>
              <th className="px-4 py-3 text-right">Ukupno</th>
              <th className="px-4 py-3">Plaćanje</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Datum</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-ink-muted">
                  Još nema porudžbina.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs">
                    <Link href={`/admin/orders/${o.id}`} className="hover:text-brand">
                      {o.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-medium">{o.customerName}</td>
                  <td className="px-4 py-3 text-ink-muted">{o.customerEmail}</td>
                  <td className="px-4 py-3 text-center">{o._count.items}</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatPrice(Number(o.total))}
                  </td>
                  <td className="px-4 py-3 text-xs">{paymentLabel(o.paymentMethod)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {o.createdAt.toLocaleDateString("sr-RS")}
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

function paymentLabel(m: string) {
  return (
    {
      CARD_ONLINE: "Kartica",
      CASH_ON_DELIVERY: "Pouzeće",
      BANK_TRANSFER: "Uplata na račun",
    }[m] ?? m
  );
}

