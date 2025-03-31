"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateCredits } from "@/actions/user";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      console.log("Payment successful, updating credits...");
      updateCredits()
        .then((res) => console.log("Credits Updated:", res))
        .catch((err) => console.error("Error Updating Credits:", err));
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-6 border border-gray-700 rounded-xl bg-gray-900 shadow-lg text-center">
        <h2 className="text-2xl font-bold">Payment Successful 🎉</h2>
        <p className="mt-2 text-gray-400">Your credits have been updated.</p>
        <button onClick={() => router.push("/dashboard")} className="mt-4 px-6 py-2 bg-blue-500 rounded-lg">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
