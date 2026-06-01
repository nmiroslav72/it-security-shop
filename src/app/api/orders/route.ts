import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, address, city, postalCode, note, paymentMethod, items, total } = body;

    if (!firstName || !lastName || !email || !phone || !address || !city || !items?.length) {
      return NextResponse.json({ error: "Nedostaju obavezna polja" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        firstName, lastName, email, phone,
        address, city,
        postalCode: postalCode || "",
        note: note || "",
        paymentMethod: paymentMethod === "bank" ? "BANK" : "COD",
        total,
        status: "PENDING",
        items: {
          create: items.map((item: { productId: string; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    const paymentText = paymentMethod === "bank" ? "Uplata na racun" : "Pouzecem";

    const itemsHtml = items.map((item: { name?: string; quantity: number; price: number }) =>
      `<tr><td style="padding:8px;border-bottom:1px solid #eee">${item.name || "Proizvod"}</td><td style="padding:8px;text-align:center;border-bottom:1px solid #eee">${item.quantity}</td><td style="padding:8px;text-align:right;border-bottom:1px solid #eee">${(item.price * item.quantity).toLocaleString("sr-RS")} RSD</td></tr>`
    ).join("");

    const kupacHtml = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto"><div style="background:#1d3eb8;padding:24px;text-align:center"><h1 style="color:#f6d000;margin:0">IT Security</h1><p style="color:rgba(255,255,255,0.8);margin:6px 0 0">Porudzbina je primljena!</p></div><div style="padding:28px"><p>Postovani <strong>${firstName} ${lastName}</strong>,</p><p style="color:#4a5168">Hvala vam na porudzbini! Kontaktirati cemo vas u najkracem roku.</p><div style="background:#f4f5f8;border-radius:8px;padding:16px;margin:20px 0"><p style="margin:0 0 6px"><strong>Broj porudzbine:</strong> #${order.id.slice(-8).toUpperCase()}</p><p style="margin:0 0 6px"><strong>Nacin placanja:</strong> ${paymentText}</p><p style="margin:0"><strong>Adresa:</strong> ${address}, ${city}</p></div><table style="width:100%;border-collapse:collapse"><thead><tr style="background:#f4f5f8"><th style="padding:10px 8px;text-align:left">Proizvod</th><th style="padding:10px 8px;text-align:center">Kol.</th><th style="padding:10px 8px;text-align:right">Cena</th></tr></thead><tbody>${itemsHtml}</tbody><tfoot><tr><td colspan="2" style="padding:12px 8px;font-weight:700">Ukupno:</td><td style="padding:12px 8px;font-weight:700;font-size:18px;color:#1d3eb8;text-align:right">${total.toLocaleString("sr-RS")} RSD</td></tr></tfoot></table><div style="border-top:2px solid #f4f5f8;padding-top:20px;margin-top:20px"><p style="color:#4a5168">Za pitanja: <strong>063224651</strong></p></div></div><div style="background:#0b1020;padding:16px;text-align:center"><p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0">IT Security 2025 | Beograd</p></div></div>`;

    const adminHtml = `<div style="font-family:Arial,sans-serif;max-width:600px"><div style="background:#0b1020;padding:20px"><h2 style="color:#f6d000;margin:0">Nova porudzbina!</h2></div><div style="padding:20px;background:#fff"><p><strong>Kupac:</strong> ${firstName} ${lastName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Telefon:</strong> ${phone}</p><p><strong>Adresa:</strong> ${address}, ${city} ${postalCode}</p><p><strong>Placanje:</strong> ${paymentText}</p>${note ? `<p><strong>Napomena:</strong> ${note}</p>` : ""}<hr/><table style="width:100%;border-collapse:collapse">${itemsHtml}</table><hr/><p style="font-size:18px;font-weight:700;color:#1d3eb8">Ukupno: ${total.toLocaleString("sr-RS")} RSD</p><p style="font-size:12px;color:#999">ID: ${order.id}</p></div></div>`;

    console.log("SENDING EMAIL TO:", email, "AND ADMIN TO: nmiroslav72@yahoo.com");

    await Promise.all([
      transporter.sendMail({
        from: `"IT Security Shop" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `Porudzbina primljena #${order.id.slice(-8).toUpperCase()} — IT Security`,
        html: kupacHtml,
      }),
      transporter.sendMail({
        from: `"IT Security Shop" <${process.env.GMAIL_USER}>`,
        to: "nmiroslav72@yahoo.com",
        subject: `NOVA PORUDZBINA od ${firstName} ${lastName} — ${total.toLocaleString("sr-RS")} RSD`,
        html: adminHtml,
      }),
    ]);

    console.log("EMAILS SENT OK");
    return NextResponse.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Greska pri kreiranju porudzbine" }, { status: 500 });
  }
}
