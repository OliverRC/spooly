"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { magicLinkLogin } from "./actions";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(magicLinkLogin, {
    sent: false,
    email: "",
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {state.sent ? (
         <Card className="w-full max-w-sm">
         <CardHeader>
           <CardTitle className="text-center">Check your email</CardTitle>
           <CardContent className="text-center text-sm text-muted-foreground mt-4">
           We've sent a magic link. <br />
             Please check your inbox at <br />
             <span className="font-medium text-white">  {state.email}</span>
           </CardContent>
         </CardHeader>
       </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to Spooly</CardTitle>
            <CardDescription>
              Enter your email to register and sign in with a magic link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={action} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Sending..." : "Send Magic Link"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
