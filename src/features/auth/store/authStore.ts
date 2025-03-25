import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthResponse } from "@/features/auth/types";
import { authenticateUser } from "@/features/auth/services/authService";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
      login: async (email: string, password: string): Promise<AuthResponse> => {
        set({ loading: true, error: null });

        try {
          // サービス層の認証関数を呼び出す
          const response = await authenticateUser(email, password);

          if (response.success && response.data) {
            set({ isAuthenticated: true, user: response.data, loading: false });
          } else {
            set({
              error: response.error || "認証に失敗しました",
              loading: false,
            });
          }

          return response;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "認証処理中にエラーが発生しました";
          set({ error: errorMessage, loading: false });
          return { success: false, error: errorMessage };
        }
      },
      logout: () => {
        set({ isAuthenticated: false, user: null, error: null });
      },
      setUser: (user) => set({ user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
