import { useAuthStore } from "@/features/auth/store/authStore";
import { isAuthenticated } from "@/features/auth/services/authService";
import { useEffect, useState } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
  handleAuthError,
} from "@/hooks/queries";

/**
 * 認証関連の操作と状態を管理するカスタムフック
 * TanStack Queryを使用して認証操作を最適化
 */
export const useAuth = () => {
  const {
    isAuthenticated: storeIsAuthenticated,
    user,
    setIsAuthenticated,
  } = useAuthStore();
  const [error, setError] = useState<{ message: string } | null>(null);

  // ログイン・ログアウトのミューテーションを取得
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  // 認証状態の同期処理
  useEffect(() => {
    const authState = isAuthenticated();
    if (authState !== storeIsAuthenticated) {
      setIsAuthenticated(authState);
    }
  }, [setIsAuthenticated, storeIsAuthenticated]);

  /**
   * ログイン処理
   */
  const login = async (email: string, password: string) => {
    setError(null);
    try {
      await loginMutation.mutateAsync({ email, password });
      return { success: true, data: user };
    } catch (error) {
      const authError = handleAuthError(error);
      setError(authError);
      return { success: false, error: authError.message };
    }
  };

  /**
   * ログアウト処理
   */
  const logout = () => {
    setError(null);
    logoutMutation.mutate();
  };

  return {
    isAuthenticated: storeIsAuthenticated,
    user,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
    error,
    login,
    logout,
  };
};
