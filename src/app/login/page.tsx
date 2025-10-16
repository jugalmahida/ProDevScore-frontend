import { LoginForm } from "@/components/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <p className="flex items-center gap-2 self-center font-medium text-3xl">
          ProDevScore/Login
        </p>
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

// Optional: Loading skeleton
function LoginFormSkeleton() {
  return (
    <div className="w-full max-w-sm animate-pulse">
      <div className="h-[400px] rounded-lg bg-gray-200" />
    </div>
  );
}
