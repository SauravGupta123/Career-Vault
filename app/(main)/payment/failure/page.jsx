"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, HelpCircle } from "lucide-react";



export default function PaymentFailed() {


  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg shadow-lg border-destructive/20">
        <CardHeader className="text-center">
          <div className="mx-auto bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Payment Failed</CardTitle>
          <CardDescription>
            We couldn't process your payment. Please check your payment details and try again.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Card className="bg-card/50 border border-muted">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">Common issues:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Insufficient funds in your account</li>
                    <li>• Incorrect card information</li>
                    <li>• Card expired or blocked for online transactions</li>
                    <li>• Bank declined the transaction</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="default" 
              className="flex-1"

            >
              Try Again
            </Button>
            
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </Link>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-6">
          <Link href="/dashboard">
            <Button 
              variant="ghost" 
              className="text-muted-foreground flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}