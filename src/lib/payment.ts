// @ts-nocheck
/**
 * Payment provider apstrakcija.
 *
 * Trenutno implementiran "mock" — za development. Kad firma dobije ugovor sa
 * Monri / NestPay-om, samo dodaj implementaciju i preusmeri u initPayment().
 *
 * Stripe NE radi za prodavce u Srbiji. Domaće opcije:
 *  - Monri  (https://www.monri.com/) — najlakša integracija, REST API
 *  - NestPay (Halkbank, OTP, UniCredit, Intesa) — starija tehnologija (HTML form)
 *  - AllSecure / ChipCard
 */

export type PaymentInitInput = {
  orderNumber: string;
  amount: number; // u RSD
  currency: "RSD" | "EUR";
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
};

export type PaymentInitResult = {
  redirectUrl?: string; // ako gateway zahteva redirect
  reference?: string;   // referenca koju vraća gateway
};

export async function initPayment(input: PaymentInitInput): Promise<PaymentInitResult> {
  const provider = process.env.PAYMENT_PROVIDER ?? "mock";

  if (provider === "mock") {
    // Demo: simuliramo uspešno plaćanje (bez redirecta)
    return { reference: `MOCK-${input.orderNumber}` };
  }

  if (provider === "monri") {
    // TODO: Implementacija Monri Web Pay
    // POST https://ipgtest.monri.com/v2/transaction (test) / https://ipg.monri.com/v2/transaction (live)
    // Vrati { redirectUrl } sa Monri payment URL
    throw new Error("Monri integracija nije još implementirana — popuni env varijable i implementaciju.");
  }

  if (provider === "nestpay") {
    // TODO: NestPay HTML form integracija
    throw new Error("NestPay integracija nije još implementirana.");
  }

  throw new Error(`Nepoznat payment provider: ${provider}`);
}
