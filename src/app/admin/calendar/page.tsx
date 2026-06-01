// @ts-nocheck
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

const monthNames = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "jun",
  "jul",
  "avgust",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
];
const dayShort = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
}
function parseYmd(s: string): Date | null {
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; day?: string }>;
}) {
  const sp = await searchParams;

  // Mesec za kalendar pregled
  const now = new Date();
  const monthCursor = sp.month
    ? parseYmd(`${sp.month}-01`) ?? new Date(now.getFullYear(), now.getMonth(), 1)
    : new Date(now.getFullYear(), now.getMonth(), 1);

  const year = monthCursor.getFullYear();
  const month = monthCursor.getMonth();
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 1);

  // Selektovan dan (default = danas ili prvi dan tekućeg meseca u prikazu)
  const selectedDay = sp.day ? parseYmd(sp.day) : startOfDay(now);

  // Učitaj sve porudžbine u mesecu (za bedževe na kalendaru)
  const monthOrders = await prisma.order
    .findMany({
      where: { createdAt: { gte: monthStart, lt: monthEnd } },
      select: { id: true, createdAt: true, total: true, status: true },
    })
    .catch(() => []);

  // Grupiši po datumu
  const byDay = new Map<
    string,
    { count: number; revenue: number }
  >();
  for (const o of monthOrders) {
    const k = ymd(o.createdAt);
    const cur = byDay.get(k) ?? { count: 0, revenue: 0 };
    cur.count += 1;
    cur.revenue += Number(o.total);
    byDay.set(k, cur);
  }

  // Detaljne porudžbine za izabrani dan
  let dayOrders: Awaited<ReturnType<typeof prisma.order.findMany>> = [];
  if (selectedDay) {
    const dayEnd = new Date(selectedDay);
    dayEnd.setDate(dayEnd.getDate() + 1);
    dayOrders = await prisma.order
      .findMany({
        where: { createdAt: { gte: selectedDay, lt: dayEnd } },
        orderBy: { createdAt: "desc" },
        include: { items: true },
      })
      .catch(() => []);
  }

  // Grid za kalendar — popuni prazne dane na početku i kraju nedelje
  const firstWeekday = (monthStart.getDay() + 6) % 7; // ponedeljak = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: ({ date: Date; key: string } | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({ date, key: ymd(date) });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  // Navigacija (prethodni / sledeći mesec)
  const prevMonth = new Date(year, month - 1, 1);
  const nextMonth = new Date(year, month + 1, 1);
  const monthParam = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

  // Sumiraj prikazani dan
  const dayRevenue = dayOrders.reduce((s, o) => s + Number(o.total), 0);
  const dayItems = dayOrders.reduce(
    (s, o) =>
      s +
      (o.items as { quantity: number }[]).reduce(
        (x, i) => x + i.quantity,
        0
      ),
    0
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">Kalendar</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Klikni na dan za detaljan pregled porudžbina.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/calendar?month=${monthParam(prevMonth)}`}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            ← Prethodni
          </Link>
          <span className="px-3 text-sm font-bold capitalize">
            {monthNames[month]} {year}.
          </span>
          <Link
            href={`/admin/calendar?month=${monthParam(nextMonth)}`}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Sledeći →
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr,1fr]">
        {/* Kalendar */}
        <div className="card p-4 sm:p-6">
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold uppercase tracking-wider text-ink-muted">
            {dayShort.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {cells.map((c, i) => {
              if (!c) return <div key={i} className="aspect-square" />;
              const data = byDay.get(c.key);
              const isToday = ymd(new Date()) === c.key;
              const isSelected = selectedDay && ymd(selectedDay) === c.key;
              return (
                <Link
                  key={c.key}
                  href={`/admin/calendar?month=${monthParam(monthStart)}&day=${c.key}`}
                  className={`flex aspect-square flex-col items-center justify-center rounded-lg p-1 text-xs transition ${
                    isSelected
                      ? "bg-brand text-white"
                      : data
                      ? "bg-brand/5 hover:bg-brand/10"
                      : "hover:bg-slate-50"
                  } ${isToday && !isSelected ? "ring-2 ring-accent" : ""}`}
                >
                  <span className="font-bold">{c.date.getDate()}</span>
                  {data && (
                    <span
                      className={`mt-0.5 text-[10px] ${
                        isSelected ? "text-white/90" : "text-brand"
                      }`}
                    >
                      {data.count} {data.count === 1 ? "por." : "porud."}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-ink-muted">
            <span className="mr-3 inline-flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-brand/20" />
              Dan sa porudžbinama
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-3 w-3 rounded ring-2 ring-accent" />
              Danas
            </span>
          </p>
        </div>

        {/* Detalji za dan */}
        <div className="card p-4 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold">
                {selectedDay
                  ? selectedDay.toLocaleDateString("sr-RS", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Izaberi dan"}
              </h2>
              <p className="text-xs text-ink-muted">
                {dayOrders.length} porudžbina · {dayItems} stavki ·{" "}
                <strong>{formatPrice(dayRevenue)}</strong>
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {dayOrders.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-ink-muted">
                Nema porudžbina za ovaj dan.
              </div>
            ) : (
              dayOrders.map((o) => (
                <Link
                  key={o.id}
                  href={`/admin/orders/${o.id}`}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <div>
                    <p className="font-mono text-xs">#{o.orderNumber}</p>
                    <p className="text-sm font-medium">{o.customerName}</p>
                    <p className="text-xs text-ink-muted">
                      {o.createdAt.toLocaleTimeString("sr-RS", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={o.status} />
                    <p className="mt-1 text-sm font-semibold">
                      {formatPrice(Number(o.total))}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

