import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage
    .findMany({ orderBy: { createdAt: "desc" } })
    .catch(() => []);

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Kontakt poruke</h1>

      <div className="mt-6 space-y-3">
        {messages.length === 0 ? (
          <div className="card p-10 text-center text-ink-muted">
            Još nema poruka iz kontakt forme.
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold">{m.subject}</p>
                  <p className="text-sm text-ink-muted">
                    {m.name} · {m.email}
                    {m.phone ? ` · ${m.phone}` : ""}
                  </p>
                </div>
                <p className="text-xs text-ink-muted">
                  {m.createdAt.toLocaleString("sr-RS")}
                </p>
              </div>
              <p className="mt-3 whitespace-pre-line text-ink">{m.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
