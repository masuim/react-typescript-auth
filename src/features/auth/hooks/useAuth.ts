import { useAuthStore } from "@/features/auth/store/authStore";
import {
  login as authLogin,
  logout as authLogout,
  isAuthenticated,
} from "@/features/auth/services/authService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "@/features/auth/constants/routes";

// 認証エラー型の定義
// APIの仕様変更に合わせて拡張可能
interface AuthError {
  message: string;
  code?: string;
}

/**
 * 認証関連の操作と状態を管理するカスタムフック
 * 将来的なGraphQLやREST API変更に対応するため、
 * 認証ロジックはこのフックに集約されている
 */
export const useAuth = () => {
  const {
    isAuthenticated: storeIsAuthenticated,
    user,
    setUser,
    setIsAuthenticated,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const navigate = useNavigate();

  // 認証状態の同期処理
  // バックエンドAPIの実装が変わっても、ここだけ修正すれば良い
  useEffect(() => {
    const authState = isAuthenticated();
    if (authState !== storeIsAuthenticated) {
      setIsAuthenticated(authState);
    }
  }, [setIsAuthenticated, storeIsAuthenticated]);

  /**
   * エラーハンドリング関数
   * 将来的にAPI固有のエラー形式に対応する場合、この関数を拡張する
   */
  const handleError = (error: unknown): AuthError => {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "予期せぬエラーが発生しました" };
  };

  /**
   * ログイン処理
   * GraphQLやREST APIの変更があっても、この関数内だけを修正すれば良い
   * @param email ユーザーのメールアドレス
   * @param password ユーザーのパスワード
   */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // authLoginは実装の詳細をカプセル化したヘルパー関数
      // API変更時はservices/authServiceのみを修正すれば良い
      const user = await authLogin(email, password);

      // 状態更新を先に行い、その後ナビゲーションを実行
      setUser(user);
      setIsAuthenticated(true);

      // 少し遅延させてから遷移させることで、状態更新が完了してからの遷移を保証
      setTimeout(() => {
        navigate(ROUTES.TOP);
      }, 100);

      return { success: true, data: user };
    } catch (error) {
      const authError = handleError(error);
      setError(authError);
      return { success: false, error: authError.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ログアウト処理
   * GraphQLやREST APIの変更があっても、この関数内だけを修正すれば良い
   */
  const logout = () => {
    setIsLoading(true);
    setError(null);
    try {
      // authLogoutはAPIの詳細をカプセル化したヘルパー関数
      authLogout();
      setUser(null);
      setIsAuthenticated(false);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      const authError = handleError(error);
      setError(authError);
    } finally {
      setIsLoading(false);
    }
  };

  // 認証情報のインターフェースは一貫性を保ち、
  // 内部実装の変更から利用側を守る
  return {
    isAuthenticated: storeIsAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
  };
};
