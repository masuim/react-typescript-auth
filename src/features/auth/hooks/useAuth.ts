import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { isAuthenticated } from "@/features/auth/services";
import { useEffect } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
} from "@/features/auth/hooks/queries";
import { invalidateAuthQueries } from "@/features/auth/utils/cacheControl";
import { useError } from "@/hooks/useError";

type AuthResult<T = undefined> = {
  success: boolean;
  data?: T;
  error?: string;
};

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

  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  useEffect(() => {
    try {
      const authState = isAuthenticated();
      if (authState !== storeIsAuthenticated) {
        setIsAuthenticated(authState);
        // 認証状態が変更された場合、キャッシュを更新
        invalidateAuthQueries();
      }
    } catch (error) {
      handleError(error, "認証状態の確認");
    }
  }, [setIsAuthenticated, storeIsAuthenticated, handleError]);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResult<typeof user>> => {
    clearError();
    try {
      await loginMutation.mutateAsync({ email, password });
      return { success: true, data: user };
    } catch (error) {
      handleError(error, "ログイン");
      return {
        success: false,
        error: errorMessage ?? "不明なエラーが発生しました",
      };
    }
  };

  const logout = async (): Promise<AuthResult> => {
    clearError();
    try {
      await logoutMutation.mutateAsync();
      return { success: true };
    } catch (error) {
      handleError(error, "ログアウト");
      return {
        success: false,
        error: errorMessage ?? "不明なエラーが発生しました",
      };
    }
  };

  const clearAuthError = () => {
    clearError();
  };

  return {
    isAuthenticated: storeIsAuthenticated,
    user,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
    error: errorMessage ?? undefined,
    login,
    logout,
    clearAuthError,
  };
};
