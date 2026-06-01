// @ts-nocheck
import type { Metadata } from "next";
import Link from "next/link";
import { ReturnForm } from "@/components/ReturnForm";

export const metadata: Metadata = {
  title: "Povrat ili reklamacija",
  description:
    "Prijavi povrat ili reklamaciju za porudžbinu. Obrada zahteva u roku od 24h.",
  robots: { index: false, follow: false },
};

export default async function ReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const sp = await searchParams;
  const orderNumber = sp.order ?? "";

  return (
    <div className="bg-slate-50 py-8 sm:py-12">
      <div className="container-app max-w-2xl">
        <Link
          href="/account"
          className="mb-4 inline-flex items-center gap-1 text-sm text-ink-muted hover:text-brand"
        >
          ← Nazad na nalog
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Povrat ili reklamacija
        </h1>
        <p className="mt-3 text-base text-ink-muted">
          Popuni obrazac — kontaktiraćemo te u roku od 24h. Po Zakonu o zaštiti
          potrošača, imaš pravo na povrat u roku od 14 dana od prijema robe.
        </p>

        <div className="card mt-8 p-6 sm:p-8">
          <ReturnForm initialOrderNumber={orderNumber} />
        </div>
      </div>
    </div>
  );
}

