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
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Suspense, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { LoaderOne } from "@/components/ui/loader";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { Redirecting } from "@/components/Redirecting";

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, verifyCode, loading, error, loginWithGithub, redirecting } =
    useAuth();
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await register({ fullName, email, password });
    if (success) {
      // On success, clear the OTP and show the popup
      setOtp("");
      setShowVerificationPopup(true);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const successMessage = await verifyCode({ email, code: parseInt(otp) });

    if (successMessage) {
      // On success: close popup and let redirecting state handle the rest
      setShowVerificationPopup(false);
    }
  };

  // Show redirecting component during redirect
  if (redirecting) {
    return (
      <Redirecting
        message="Registration Successful!"
        submessage="Welcome! Redirecting you to dashboard..."
      />
    );
  }

  return (
    <>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <p className="flex items-center gap-2 self-center font-medium text-3xl">
            ProDevScore/Register
          </p>
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome</CardTitle>
                <CardDescription>
                  Continue with your Github account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <Button
                        className="cursor-pointer"
                        variant="outline"
                        type="button"
                        onClick={loginWithGithub}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-github-icon lucide-github"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        Continue with Github
                      </Button>
                    </Field>
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                      Or continue with
                    </FieldSeparator>
                    {error && !showVerificationPopup && (
                      <p className="text-center text-md text-red-600">
                        {error}
                      </p>
                    )}

                    <Field>
                      <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Due"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={loading}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>

                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                          tabIndex={-1}
                          disabled={loading}
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.993 9.993 0 012.096-3.373M6.462 6.462A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.961 9.961 0 01-4.154 5.909M3 3l18 18"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </Field>
                    <Button
                      disabled={loading}
                      type="submit"
                      className="w-full cursor-pointer"
                    >
                      {loading ? "Registering..." : "Register"}
                    </Button>

                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="underline underline-offset-4"
                      >
                        Sign In
                      </Link>
                    </div>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog
        open={showVerificationPopup}
        onOpenChange={setShowVerificationPopup}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Check your email</DialogTitle>
            <DialogDescription>
              We sent a 4-digit verification code to{" "}
              <strong className="text-foreground">{email}</strong>. Please enter
              it below to complete your registration.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleVerify}>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && showVerificationPopup && (
                <p className="text-center text-md text-red-600">{error}</p>
              )}
            </div>
            <DialogFooter>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={otp.length < 4 || loading}
              >
                {loading ? "Verifying..." : "Verify Account"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function Register() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <LoaderOne />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
