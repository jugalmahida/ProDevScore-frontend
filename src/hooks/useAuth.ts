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

// managing the states of ui and calling the server actions
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // In useAuth hook, add this:
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
      return false; // Return failure
    }
    setLoading(false);
    return true; // Return success
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
      // Success - redirect to dashboard
      router.replace("/");
      router.refresh();
    } catch (e) {
      setError("An unexpected error occurred");
      setGithubCallbackStatus("error");
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
    router.replace("/");
    router.refresh();
    setLoading(false);
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
        // console.log(result);
        setError("");
        setLoading(false);
        return "USER_UNVERIFIED";
      }
      setLoading(false);
      return;
    }

    if (result.success) {
      // On success, redirect and refresh
      setLoading(false);
      const redirectTo = searchParams.get("redirect") || "/";
      router.replace(redirectTo);
      router.refresh();
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
    setTimeout(() => router.replace("/login"), 3 * 1000);
    setLoading(false);
    return true;
  };

  /**
   * Logs out the current user.
   */
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
