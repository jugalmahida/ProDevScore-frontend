"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LoaderOne } from "@/components/ui/loader";

function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const { loading, error, forgetPassword } = useAuth();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await forgetPassword({ email });
    if (res) setSuccess(true);
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <p className="flex items-center gap-2 self-center font-medium text-2xl">
          ProDevScore/Forget-Password
        </p>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Forget Password</CardTitle>
            <CardDescription>
              {success
                ? `✔️ If your email is registered, we will send you reset password link into your mail ${email}`
                : "Forgotten your password, don't worry provide your registered email"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Email</Label>
                  </div>
                  <div className="relative">
                    <Input
                      disabled={loading}
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full cursor-pointer"
                >
                  Send Email
                </Button>
              </div>
            </form>
            {error && (
              <p className="mt-4 text-center text-md text-red-600">{error}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ForgetPassword() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <LoaderOne />
        </div>
      }
    >
      <ForgetPasswordForm />
    </Suspense>
  );
}
