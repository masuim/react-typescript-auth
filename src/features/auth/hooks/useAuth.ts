import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { isAuthenticated } from "@/features/auth/services/auth";
import { useEffect } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
} from "@/features/auth/hooks/queries";
import { invalidateAuthQueries } from "@/features/auth/utils/cacheControl";
import { useError } from "@/hooks/useError";
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
  const { errorMessage, handleError, clearError } = useError();

  // ログイン・ログアウトのミューテーションを取得
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  // 認証状態の同期処理
  useEffect(() => {
    const authState = isAuthenticated();
    if (authState !== storeIsAuthenticated) {
      setIsAuthenticated(authState);
      // 認証状態が変更された場合、キャッシュを更新
      invalidateAuthQueries();
    }
  }, [setIsAuthenticated, storeIsAuthenticated]);

  /**
   * ログイン処理
   */
  const login = async (email: string, password: string) => {
    clearError();
    try {
      await loginMutation.mutateAsync({ email, password });
      return { success: true, data: user };
    } catch (error) {
      handleError(error, "ログイン");
      return { success: false, error: errorMessage };
    }
  };

  /**
   * ログアウト処理
   */
  const logout = () => {
    clearError();
    logoutMutation.mutate();
  };

  return {
    isAuthenticated: storeIsAuthenticated,
    user,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
    error: errorMessage,
    login,
    logout,
  };
};
