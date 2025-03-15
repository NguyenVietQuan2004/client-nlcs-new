import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRECT!);
    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;
    const addressComponent = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.country,
      address?.postal_code,
      address?.state,
    ];
    const addressString = addressComponent.filter((item) => item !== null).join(`, `);

    if (event.type === "checkout.session.completed") {
      await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order`, {
        body: JSON.stringify({
          _id: session?.metadata?.orderId,
          is_paid: true,
          paid_at: new Date(),
          address: addressString,
          phone: session?.customer_details?.phone,
        }),
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      });
    }
  } catch (error: any) {
    return new NextResponse(`Webhook error ${error.message}`, { status: 400 });
  }

  return NextResponse.json({
    status: 200,
  });
}
