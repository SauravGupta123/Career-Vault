"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentCard() {
  const [loading, setLoading] = useState(false);
  const defaultAmount = 10; // Default $10 payment

  const handlePayment = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: defaultAmount }),
    });

    const { sessionId } = await res.json();
    if (sessionId) {
      stripe.redirectToCheckout({ sessionId });
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <Card className="w-96 p-6 border border-gray-700 rounded-xl bg-gray-900 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-2xl">Premium Plan</CardTitle>
          <p className="text-gray-400 text-sm mt-1">Unlock all premium features</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-white">${defaultAmount}</p>
            <p className="text-gray-400">One-time payment</p>
          </div>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>✅ Unlimited access</li>
            <li>✅ Priority support</li>
            <li>✅ No ads</li>
          </ul>
          <Button 
            onClick={handlePayment} 
            disabled={loading} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
          >
            {loading ? "Processing..." : "Get Started"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
