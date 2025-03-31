"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateCredits } from "@/actions/user";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, FileText, MessageSquare, FileEdit } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg shadow-lg border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Payment Successful!</CardTitle>
          <CardDescription>
            Your credits have been updated. You now have access to premium features.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card/50 border border-primary/10 hover:border-primary/30 transition-all duration-200">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-center">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-center">
                <h3 className="font-medium">Resume Builder</h3>
                <p className="text-sm text-muted-foreground mt-1">Create professional resumes</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href="/resume" className="w-full">
                  <Button variant="default" size="sm" className="w-full">
                    Build Resume
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="bg-card/50 border border-primary/10 hover:border-primary/30 transition-all duration-200">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-center">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-center">
                <h3 className="font-medium">Mock Interviews</h3>
                <p className="text-sm text-muted-foreground mt-1">Practice with AI interviews</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href="/interview" className="w-full">
                  <Button variant="default" size="sm" className="w-full">
                    Prepare Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="bg-card/50 border border-primary/10 hover:border-primary/30 transition-all duration-200">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-center">
                  <FileEdit className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-center">
                <h3 className="font-medium">Cover Letters</h3>
                <p className="text-sm text-muted-foreground mt-1">Generate tailored letters</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href="/ai-cover-letter" className="w-full">
                  <Button variant="default" size="sm" className="w-full">
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
            className="w-full sm:w-auto"
          >
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}