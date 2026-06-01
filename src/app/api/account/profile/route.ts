// @ts-nocheck
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2).max(120).nullable().optional(),
  phone: z.string().max(40).nullable().optional(),
  address: z.string().max(200).nullable().optional(),
  city: z.string().max(80).nullable().optional(),
  zip: z.string().max(20).nullable().optional(),
});

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Niste prijavljeni." }, { status: 401 });
  }
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        city: true,
        zip: true,
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    const msg = e instanceof z.ZodError ? "Neispravni podaci." : "Greška servera.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

