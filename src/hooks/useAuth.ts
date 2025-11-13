import { useState, useEffect } from "react";
import {
  ForgetPasswordPayload,
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
      setLoading(false);
      return;
    }
    // On success, redirect and refresh
    const redirectTo = searchParams.get("redirect") || "/";
    router.replace(redirectTo);
    router.refresh();
    setLoading(false);
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
    register,
    verifyCode,
    login,
    logout,
    getCurrentUser,
    forgetPassword,
    verifyTokenAndSetPassword,
  };
};
