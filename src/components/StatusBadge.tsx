// @ts-nocheck
export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PAID: "bg-green-100 text-green-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    COMPLETED: "bg-emerald-100 text-emerald-800",
    CANCELLED: "bg-red-100 text-red-800",
  };
  const labels: Record<string, string> = {
    PENDING: "Na čekanju",
    CONFIRMED: "Potvrđena",
    PAID: "Plaćena",
    SHIPPED: "Poslata",
    COMPLETED: "Završena",
    CANCELLED: "Otkazana",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        styles[status] ?? "bg-slate-100"
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}
