import { useAuthStore } from "../store/authStore";
import {
  login as authLogin,
  logout as authLogout,
  isAuthenticated,
  getAuthToken,
  TOKEN_COOKIE_KEY,
} from "app/lib/auth";
import { getCookie } from "app/lib/cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface AuthError {
  message: string;
  code?: string;
}

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

  // cookieの認証状態をZustandと同期
  useEffect(() => {
    const authState = isAuthenticated();
    if (authState !== storeIsAuthenticated) {
      setIsAuthenticated(authState);
    }
  }, [setIsAuthenticated, storeIsAuthenticated]);

  const handleError = (error: unknown): AuthError => {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: "予期せぬエラーが発生しました" };
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Login attempt with:", email, password);

      // 認証処理
      const user = await authLogin(email, password);
      console.log("Login successful, user:", user);

      // 状態の更新
      setUser(user);
      setIsAuthenticated(true);

      console.log("State updated, redirecting to /top");

      // クッキーが確実に設定されたことを確認してからリダイレクト
      const token = getCookie(TOKEN_COOKIE_KEY);
      console.log("Before redirect, cookie check:", token);

      // setTimeout ではなく直接リプレイスを実行
      // フォームの送信と処理が完了したら即時リダイレクト
      console.log("Performing direct navigation to /top");

      // 絶対パスを使用して確実にリダイレクト
      const baseUrl = window.location.origin;
      window.location.href = `${baseUrl}/top`;

      return { success: true, data: user };
    } catch (error) {
      console.error("Login error:", error);
      const authError = handleError(error);
      setError(authError);
      return { success: false, error: authError.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setError(null);
    try {
      authLogout();
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      const authError = handleError(error);
      setError(authError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated: storeIsAuthenticated,
    user,
    isLoading,
    error,
    login,
    logout,
  };
};
