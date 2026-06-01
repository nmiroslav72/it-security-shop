// @ts-nocheck
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { initPayment } from "@/lib/payment";
import { auth } from "@/lib/auth";

const schema = z.object({
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5),
    address: z.string().min(3),
    city: z.string().min(2),
    zip: z.string().min(3),
    notes: z.string().optional(),
  }),
  paymentMethod: z.enum(["CARD_ONLINE", "CASH_ON_DELIVERY", "BANK_TRANSFER"]),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const session = await auth().catch(() => null);

    if (data.items.length === 0) {
      return NextResponse.json({ error: "Korpa je prazna." }, { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: { id: { in: data.items.map((i) => i.productId) } },
    });

    let subtotal = 0;
    const orderItems = data.items.map((item) => {
      const p = products.find((x) => x.id === item.productId);
      if (!p) throw new Error("Proizvod nije pronađen.");
      const price = Number(p.price);
      subtotal += price * item.quantity;
      return {
        productId: p.id,
        productName: p.name,
        quantity: item.quantity,
        priceAtOrder: price,
      };
    });

    const orderNumber = generateOrderNumber();
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session?.user?.id,
        customerName: data.customer.name,
        customerEmail: data.customer.email,
        customerPhone: data.customer.phone,
        shippingAddress: data.customer.address,
        shippingCity: data.customer.city,
        shippingZip: data.customer.zip,
        notes: data.customer.notes,
        paymentMethod: data.paymentMethod,
        subtotal,
        shippingCost: 0,
        total: subtotal,
        items: { create: orderItems },
      },
    });

    let redirectUrl: string | undefined;
    if (data.paymentMethod === "CARD_ONLINE") {
      const origin = req.headers.get("origin") ?? "http://localhost:3000";
      const result = await initPayment({
        orderNumber,
        amount: subtotal,
        currency: "RSD",
        customerEmail: data.customer.email,
        successUrl: `${origin}/checkout/success?order=${orderNumber}`,
        cancelUrl: `${origin}/checkout?cancelled=1`,
      });
      redirectUrl = result.redirectUrl;
      if (result.reference) {
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentRef: result.reference },
        });
      }
    }

    return NextResponse.json({ orderNumber, redirectUrl });
  } catch (e) {
    console.error(e);
    const msg = e instanceof z.ZodError ? "Neispravni podaci." : "Greška servera.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

