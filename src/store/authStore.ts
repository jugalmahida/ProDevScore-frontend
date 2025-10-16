import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuthenticated: (auth: boolean) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-storage", // unique name for localStorage key
    }
  )
);
