// @ts-nocheck
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ProfileForm } from "@/components/ProfileForm";
import { StatusBadge } from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Moj nalog",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account");
  }

  // Graceful fallback ako baza nije dostupna (Neon serverless cold start, mreža)
  let user: Awaited<ReturnType<typeof prisma.user.findUnique>> = null;
  let orders: Awaited<ReturnType<typeof prisma.order.findMany>> = [];
  let dbError = false;

  try {
    [user, orders] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          address: true,
          city: true,
          zip: true,
          createdAt: true,
        },
      }),
      prisma.order.findMany({
        where: {
          OR: [
            { userId: session.user.id },
            { customerEmail: session.user.email ?? "" },
          ],
        },
        orderBy: { createdAt: "desc" },
        include: { items: true, returnRequests: { select: { id: true, status: true } } },
      }),
    ]);
  } catch {
    dbError = true;
  }

  if (dbError) {
    return (
      <div className="bg-slate-50 py-12">
        <div className="container-app">
          <div className="card mx-auto max-w-2xl p-8 text-center">
            <h1 className="text-2xl font-extrabold text-ink">Trenutno nedostupno</h1>
            <p className="mt-3 text-sm text-ink-muted">
              Baza podataka se trenutno budi (Neon serverless). Sačekajte par sekundi i osvežite stranicu.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/account" className="btn-primary">Osveži</Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="btn-ghost">Odjavi se</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) redirect("/login");

  const totalSpent = orders
    .filter((o) => ["PAID", "SHIPPED", "COMPLETED"].includes(o.status))
    .reduce((s, o) => s + Number(o.total), 0);

  return (
    <div className="bg-slate-50 py-8 sm:py-12">
      <div className="container-app">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand sm:text-sm">
              Moj nalog
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Zdravo, {user.name ?? user.email.split("@")[0]}
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              Član od {user.createdAt.toLocaleDateString("sr-RS")}
            </p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Odjavi se
            </button>
          </form>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          <Stat label="Porudžbine" value={String(orders.length)} />
          <Stat
            label="Ukupno potrošeno"
            value={formatPrice(totalSpent)}
            accent
          />
          <Stat
            label="Aktivne porudžbine"
            value={String(
              orders.filter((o) => !["COMPLETED", "CANCELLED"].includes(o.status)).length
            )}
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr,1.4fr]">
          {/* Profil forma */}
          <div className="card p-6 sm:p-7">
            <h2 className="text-xl font-bold">Lični podaci</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Ovi podaci se automatski popunjavaju pri kupovini.
            </p>
            <div className="mt-6">
              <ProfileForm
                initial={{
                  email: user.email,
                  name: user.name ?? "",
                  phone: user.phone ?? "",
                  address: user.address ?? "",
                  city: user.city ?? "",
                  zip: user.zip ?? "",
                }}
              />
            </div>
          </div>

          {/* Istorija porudžbina */}
          <div className="card p-6 sm:p-7">
            <h2 className="text-xl font-bold">Istorija kupovine</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Pregled svih porudžbina koje su povezane sa ovim nalogom.
            </p>

            {orders.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-ink-muted">
                Još uvek nemate porudžbina.
                <div className="mt-3">
                  <Link href="/shop" className="btn-primary">
                    Idi u prodavnicu
                  </Link>
                </div>
              </div>
            ) : (
              <ul className="mt-6 space-y-3">
                {orders.map((o) => (
                  <li
                    key={o.id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-ink-muted">
                          #{o.orderNumber}
                        </span>
                        <StatusBadge status={o.status} />
                        {o.returnRequests.length > 0 && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                            Reklamacija u toku
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-ink">
                        {o.items.length}{" "}
                        {o.items.length === 1 ? "stavka" : "stavki"} ·{" "}
                        <strong>{formatPrice(Number(o.total))}</strong>
                      </p>
                      <p className="text-xs text-ink-muted">
                        {o.createdAt.toLocaleDateString("sr-RS", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/account/return?order=${o.orderNumber}`}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50"
                      >
                        Povrat / Reklamacija
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className={`card p-5 ${accent ? "border-brand/30 bg-brand/5" : ""}`}>
      <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">{value}</p>
    </div>
  );
}
