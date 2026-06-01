import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ReturnStatusSelect } from "@/components/ReturnStatusSelect";

export const dynamic = "force-dynamic";

const typeLabels: Record<string, string> = {
  RETURN: "Povrat",
  COMPLAINT: "Reklamacija",
};

const statusLabels: Record<string, string> = {
  PENDING: "Primljeno",
  IN_REVIEW: "U pregledu",
  APPROVED: "Odobreno",
  REJECTED: "Odbijeno",
  RESOLVED: "Rešeno",
};

export default async function AdminReturnsPage() {
  const items = await prisma.returnRequest
    .findMany({
      orderBy: { createdAt: "desc" },
      include: { order: { select: { orderNumber: true, customerName: true, total: true } } },
    })
    .catch(() => []);

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Povrati i reklamacije</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Pregled svih prijava povrata i reklamacija. Promeni status iz dropdown-a.
      </p>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="card p-10 text-center text-ink-muted">
            Još nema prijava povrata ili reklamacija.
          </div>
        ) : (
          items.map((r) => (
            <article key={r.id} className="card p-5">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${
                        r.type === "COMPLAINT"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {typeLabels[r.type]}
                    </span>
                    <span className="text-xs text-ink-muted">
                      {r.createdAt.toLocaleString("sr-RS")}
                    </span>
                  </div>
                  <p className="mt-2 font-bold">{r.customerName}</p>
                  <p className="text-sm text-ink-muted">
                    <a href={`mailto:${r.customerEmail}`} className="hover:text-brand">
                      {r.customerEmail}
                    </a>
                    {" · "}
                    <a href={`tel:${r.customerPhone}`} className="hover:text-brand">
                      {r.customerPhone}
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Porudžbina:{" "}
                    <Link
                      href={`/admin/orders`}
                      className="font-mono font-semibold text-brand hover:underline"
                    >
                      #{r.order.orderNumber}
                    </Link>{" "}
                    · {r.order.customerName}
                  </p>
                </div>
                <ReturnStatusSelect
                  id={r.id}
                  status={r.status}
                  initialNote={r.adminNote ?? ""}
                />
              </header>

              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                  Razlog
                </p>
                <p className="mt-1 whitespace-pre-line text-sm text-ink">
                  {r.reason}
                </p>
              </div>

              <p className="mt-3 text-xs text-ink-muted">
                Status: <strong>{statusLabels[r.status]}</strong>
                {r.adminNote && (
                  <>
                    {" · "}Beleška: <span className="italic">{r.adminNote}</span>
                  </>
                )}
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
