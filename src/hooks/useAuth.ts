import { useState, useEffect } from "react";
import {
  ForgetPasswordPayload,
  GithubCallBack,
  LoginPayload,
  RegisterPayload,
  User,
  VerifyCodePayload,
  VerifyTokenAndSetPasswordPayload,
} from "@/lib/types/auth";
import {
  forgetPasswordAction,
  getCurrentUserAction,
  loginAction,
  loginWithGithubAction,
  loginWithGithubCallBackAction,
  logoutAction,
  registerAction,
  verifyCodeAction,
  verifyTokenAndSetPasswordAction,
} from "@/actions/auth.action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [githubCallbackStatus, setGithubCallbackStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");

  const register = async (payload: RegisterPayload): Promise<boolean> => {
    setError(null);
    setLoading(true);
    const response = await registerAction(payload);
    if (!response?.success) {
      setError(response?.message);
      setLoading(false);
      return false;
    }
    setLoading(false);
    return true;
  };

  const loginWithGithub = async () => {
    setError(null);
    const response = await loginWithGithubAction();
    if (!response?.success) {
      setError(response?.message);
    }
    if (response.data?.url) {
      router.push(response.data.url);
    }
  };

  const loginWithGithubCallback = async (payload: GithubCallBack) => {
    setError(null);
    setGithubCallbackStatus("loading");

    if (!payload.code || !payload.state) {
      setError("Missing authorization code or state");
      setGithubCallbackStatus("error");
      return;
    }

    try {
      const response = await loginWithGithubCallBackAction(payload);
      if (!response?.success) {
        setError(response?.message || "GitHub login failed");
        setGithubCallbackStatus("error");
        return;
      }
      // Set redirecting state before navigation
      setRedirecting(true);
      setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 1500);
    } catch (e) {
      setError("An unexpected error occurred");
      setGithubCallbackStatus("error");
      console.log("Error in github callback " + e);
    }
  };

  const goToLogin = () => {
    router.push("/login");
  };

  const verifyCode = async (payload: VerifyCodePayload) => {
    setError(null);
    setLoading(true);
    const result = await verifyCodeAction(payload);
    if (!result?.success) {
      setError(result?.message);
      setLoading(false);
      return null;
    }
    setLoading(false);
    setRedirecting(true);
    setTimeout(() => {
      router.replace("/");
      router.refresh();
    }, 1500);
  };

  const login = async (payload: LoginPayload) => {
    setError(null);
    setLoading(true);
    const result = await loginAction(payload);

    if (!result?.success) {
      setError(result?.message);
      // Check if the error is due to unverified account
      if (
        result?.details === "USER_UNVERIFIED" ||
        result.message === "Verification code is already send to email" ||
        result.message?.includes("verification code")
      ) {
        setError("");
        setLoading(false);
        return "USER_UNVERIFIED";
      }
      setLoading(false);
      return;
    }

    if (result.success) {
      setLoading(false);
      setRedirecting(true);
      const redirectTo = searchParams.get("redirect") || "/";

      // Add slight delay for better UX
      setTimeout(() => {
        router.replace(redirectTo);
        router.refresh();
      }, 1500);
    } else {
      setLoading(false);
      setError("Unknown error while login");
    }
  };

  // Load user on mount - but skip on auth pages
  useEffect(() => {
    const authPages = [
      "/login",
      "/register",
      "/forget-password",
      "/reset-password",
    ];
    const isAuthPage = authPages.some((page) => pathname.startsWith(page));

    if (!isAuthPage) {
      getCurrentUser();
    }
  }, [pathname]);

  const getCurrentUser = async () => {
    setError(null);
    setLoading(true);
    const user = await getCurrentUserAction();
    if (user) {
      setUser(user);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const forgetPassword = async (payload: ForgetPasswordPayload) => {
    setLoading(true);
    setError(null);

    const result = await forgetPasswordAction(payload);
    if (!result == true) {
      return false;
    }
    setLoading(false);
    return true;
  };

  const verifyTokenAndSetPassword = async (
    payload: VerifyTokenAndSetPasswordPayload
  ) => {
    setLoading(true);
    setError(null);
    const result = await verifyTokenAndSetPasswordAction(payload);
    if (!result == true) {
      return false;
    }
    setRedirecting(true);
    setTimeout(() => router.replace("/login"), 3000);
    setLoading(false);
    return true;
  };

  const logout = async () => {
    setError(null);
    setLoading(true);
    await logoutAction();
    setUser(null);
    router.replace("/");
    router.refresh();
    setLoading(false);
  };

  return {
    user,
    loading,
    error,
    redirecting,
    githubCallbackStatus,
    register,
    verifyCode,
    login,
    goToLogin,
    loginWithGithub,
    loginWithGithubCallback,
    logout,
    getCurrentUser,
    forgetPassword,
    verifyTokenAndSetPassword,
  };
};
