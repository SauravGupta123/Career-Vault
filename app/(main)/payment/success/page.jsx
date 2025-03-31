"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateCredits } from "@/actions/user";
import Link from "next/link";

function PaymentSuccessContent() {
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
    else{
      router.push("/");
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-6 border border-gray-700 rounded-xl bg-gray-900 shadow-lg text-center max-w-md">
        <h2 className="text-2xl font-bold">Payment Successful 🎉</h2>
        <p className="mt-2 text-gray-400">
          Your credits have been updated. You now have access to premium features!
        </p>

        <div className="mt-6 space-y-4">
          <Link href="/resume">
            <button className="w-full px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
              Build Resume
            </button>
          </Link>
          <Link href="/interview">
            <button className="w-full px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600">
              Mock Interview Preparation
            </button>
          </Link>
          <Link href="/ai-cover-letter">
            <button className="w-full px-6 py-2 bg-purple-500 rounded-lg hover:bg-purple-600">
              AI Cover Letter
            </button>
          </Link>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-800"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}