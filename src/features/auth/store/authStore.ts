import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthResponse } from "../types";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string): Promise<AuthResponse> => {
        // モックの認証処理
        const mockUser: User = {
          id: "1",
          email: "test@example.com",
          name: "テストユーザー",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        if (email !== "test@example.com" || password !== "password123") {
          return {
            success: false,
            error: "メールアドレスまたはパスワードが正しくありません",
          };
        }

        set({ isAuthenticated: true, user: mockUser });
        return { success: true, data: mockUser };
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
      setUser: (user) => set({ user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
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
