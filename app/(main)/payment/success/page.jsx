"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateCredits } from "@/actions/user";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, FileText, MessageSquare, PenLine } from "lucide-react";

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
    else {
      router.push("/");
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <BadgeCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Payment Successful 🎉</CardTitle>
          <CardDescription>
            Your credits have been updated. You now have access to premium features!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card hover:bg-accent/10 transition-colors">
              <CardHeader className="p-4 pb-2 text-center">
                <FileText className="h-8 w-8 text-primary mx-auto" />
              </CardHeader>
              <CardContent className="p-4 pt-1 text-center">
                <h3 className="font-medium">Resume Builder</h3>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href="/resume" className="w-full">
                  <Button className="w-full" size="sm">
                    Build Resume
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="bg-card hover:bg-accent/10 transition-colors">
              <CardHeader className="p-4 pb-2 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto" />
              </CardHeader>
              <CardContent className="p-4 pt-1 text-center">
                <h3 className="font-medium">Mock Interview</h3>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href="/interview" className="w-full">
                  <Button className="w-full" size="sm">
                    Prepare Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="bg-card hover:bg-accent/10 transition-colors">
              <CardHeader className="p-4 pb-2 text-center">
                <PenLine className="h-8 w-8 text-primary mx-auto" />
              </CardHeader>
              <CardContent className="p-4 pt-1 text-center">
                <h3 className="font-medium">Cover Letter</h3>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href="/ai-cover-letter" className="w-full">
                  <Button className="w-full" size="sm">
                    Create Letter
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-6">
          <Button 
            variant="outline" 
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}