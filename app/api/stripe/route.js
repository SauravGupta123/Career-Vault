import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { db } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const { amount } = await req.json();
    console.log("Processing payment for:", userId, "Amount:", amount);

    // Fetch user details from the database or Clerk
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user || !user.email) {
      throw new Error("User email not found");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`,
      customer_email: user.email, // Add the customer's email here
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Premium Access" },
            unit_amount: amount * 100, // Convert amount to cents
          },
          quantity: 1,
        },
      ],
    });

    console.log("Stripe Session Created:", session.id);
    return Response.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}