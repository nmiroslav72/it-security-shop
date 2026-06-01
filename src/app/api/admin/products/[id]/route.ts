// @ts-nocheck
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(2),
  shortDesc: z.string().optional().nullable(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative().optional(),
  category: z.enum(["CAMERAS", "ALARMS", "INTERCOMS", "DVR"]),
  brand: z.string().min(1),
  images: z.array(z.string()).default([]),
  attributes: z.record(z.string(), z.unknown()).default({}),
  showPrice: z.boolean().default(true),
  isBestseller: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isMonthlyOffer: z.boolean().default(false),
  badge: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const { id } = await params;
    const body = await req.json();
    const data = schema.parse(body);
    const updated = await prisma.product.update({ where: { id }, data });
    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath(`/shop/${updated.slug}`);
    return NextResponse.json(updated);
  } catch (e) {
    const msg = e instanceof z.ZodError ? "Neispravni podaci." : "Greška servera.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/shop");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Greška." }, { status: 400 });
  }
}
