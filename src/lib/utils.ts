export function formatPrice(price: number | string): string {
  const n = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency: "RSD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[čćšđž]/g, (c) => ({ č: "c", ć: "c", š: "s", đ: "d", ž: "z" })[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateOrderNumber(): string {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `IT-${yyyy}${mm}${dd}-${random}`;
}
