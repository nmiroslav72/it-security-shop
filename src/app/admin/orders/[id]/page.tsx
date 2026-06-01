// @ts-nocheck
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import { OrderStatusForm } from "@/components/OrderStatusForm";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">{order.orderNumber}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Kreirano {order.createdAt.toLocaleString("sr-RS")}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,360px]">
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3">Proizvod</th>
                <th className="px-4 py-3 text-center">Količina</th>
                <th className="px-4 py-3 text-right">Cena</th>
                <th className="px-4 py-3 text-right">Ukupno</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((it) => (
                <tr key={it.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium">{it.productName}</td>
                  <td className="px-4 py-3 text-center">{it.quantity}</td>
                  <td className="px-4 py-3 text-right">
                    {formatPrice(Number(it.priceAtOrder))}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatPrice(Number(it.priceAtOrder) * it.quantity)}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-slate-200 bg-slate-50">
                <td colSpan={3} className="px-4 py-3 text-right font-bold">
                  Ukupno
                </td>
                <td className="px-4 py-3 text-right text-lg font-extrabold">
                  {formatPrice(Number(order.total))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-muted">
              Kupac
            </h3>
            <p className="font-semibold">{order.customerName}</p>
            <p className="text-sm">{order.customerEmail}</p>
            <p className="text-sm">{order.customerPhone}</p>
            <p className="mt-2 text-sm text-ink-muted">
              {order.shippingAddress}, {order.shippingZip} {order.shippingCity}
            </p>
            {order.notes && (
              <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">{order.notes}</p>
            )}
          </div>

          <div className="card p-5">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-muted">
              Plaćanje
            </h3>
            <p>
              {order.paymentMethod === "CARD_ONLINE" && "Online karticom"}
              {order.paymentMethod === "CASH_ON_DELIVERY" && "Pouzećem"}
              {order.paymentMethod === "BANK_TRANSFER" && "Uplatom na račun"}
            </p>
            <p className="text-sm text-ink-muted">Status: {order.paymentStatus}</p>
            {order.paymentRef && (
              <p className="text-xs text-ink-muted">Ref: {order.paymentRef}</p>
            )}
          </div>

          <div className="card p-5">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-muted">
              Promeni status
            </h3>
            <OrderStatusForm id={order.id} current={order.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
