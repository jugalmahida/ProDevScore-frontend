import { useAuthStore } from "@/store/authStore";
import { apiService } from "@/services/apiService";

export interface LoginPayload {
  email: string;
  password: string;
}

export const useAuth = () => {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const logoutStore = useAuthStore((state) => state.logout);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.loginUser({ email, password });

      // Using your API response structure
      if (response.success && response.count > 0 && response.data?.user) {
        setUser(response.data.user);
        setAuthenticated(true);
        return true;
      } else {
        setUser(null);
        setAuthenticated(false);
        throw new Error("Invalid login response");
      }
    } catch (error) {
      setUser(null);
      setAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    await apiService.logoutUser(); // Call your logout endpoint to clear cookie/session
    logoutStore();
  };

  return { login, logout };
};
