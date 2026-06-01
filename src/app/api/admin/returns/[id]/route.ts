// @ts-nocheck
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  status: z.enum(["PENDING", "IN_REVIEW", "APPROVED", "REJECTED", "RESOLVED"]).optional(),
  adminNote: z.string().max(2000).nullable().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const data = schema.parse(body);
    const updated = await prisma.returnRequest.update({
      where: { id },
      data,
    });
    return NextResponse.json(updated);
  } catch (e) {
    const msg = e instanceof z.ZodError ? "Neispravni podaci." : "Greška servera.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
