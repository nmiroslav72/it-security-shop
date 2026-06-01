// @ts-nocheck
import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="container-app py-20">
      <div className="card mx-auto max-w-xl p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-5 text-3xl font-extrabold">Hvala na porudžbini!</h1>
        <p className="mt-3 text-ink-muted">
          Tvoj broj porudžbine:
          {order ? (
            <span className="ml-2 rounded bg-slate-100 px-2 py-1 font-mono font-bold">
              {order}
            </span>
          ) : null}
        </p>
        <p className="mt-3 text-ink-muted">
          Poslali smo potvrdu na tvoj email. Kontaktiraćemo te u najkraćem roku za
          dogovor oko dostave i ugradnje.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Početna
          </Link>
          <Link href="/shop" className="btn-ghost">
            Nastavi kupovinu
          </Link>
        </div>
      </div>
    </div>
  );
}
