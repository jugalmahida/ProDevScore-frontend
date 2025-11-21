"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
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
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { loginWithGithubAction } from "@/actions/auth.action";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login, loading, error, verifyCode, loginWithGithub } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login({ email, password });
    if (res === "USER_UNVERIFIED") {
      setOtp("");
      setShowVerificationPopup(true);
    } else if (res === undefined) {
      // Login successful (no return value means success)
      setRedirecting(true);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const successMessage = await verifyCode({ email, code: parseInt(otp) });
    if (successMessage) {
      setShowVerificationPopup(false);
      setRedirecting(true);
    }
  };

  // Show loading overlay during redirect
  if (redirecting) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>Login with your Github account</CardDescription>
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
                    Login with Github
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>

                {error && (
                  <p className="text-center text-md mb-2 text-red-600">
                    {error}
                  </p>
                )}

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="yourname@example.com"
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
                  <div className="flex items-center">
                    <Link
                      href="/forget-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </Field>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Verification Dialog */}
      <Dialog
        open={showVerificationPopup}
        onOpenChange={setShowVerificationPopup}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Verify your account</DialogTitle>
            <DialogDescription>
              We sent a 4-digit verification code to{" "}
              <strong className="text-foreground">{email}</strong>. Please enter
              it below to verify your account.
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
