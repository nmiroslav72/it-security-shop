// @ts-nocheck
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  orderNumber: z.string().min(3),
  customerEmail: z.string().email(),
  customerName: z.string().min(2),
  customerPhone: z.string().min(5),
  type: z.enum(["RETURN", "COMPLAINT"]),
  reason: z.string().min(10).max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Pronađi porudžbinu po broju + email-u (radi i za goste)
    const order = await prisma.order.findUnique({
      where: { orderNumber: data.orderNumber },
    });
    if (!order || order.customerEmail.toLowerCase() !== data.customerEmail.toLowerCase()) {
      return NextResponse.json(
        { error: "Porudžbina nije pronađena ili email ne odgovara." },
        { status: 404 }
      );
    }

    const created = await prisma.returnRequest.create({
      data: {
        orderId: order.id,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        type: data.type,
        reason: data.reason,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (e) {
    const msg = e instanceof z.ZodError ? "Neispravni podaci." : "Greška servera.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

