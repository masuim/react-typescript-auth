import { useAuthStore } from "../store/authStore";
import {
  login as authLogin,
  logout as authLogout,
  isAuthenticated,
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
      const user = await authLogin(email, password);

      setUser(user);
      setIsAuthenticated(true);

      navigate("/top");

      return { success: true, data: user };
    } catch (error) {
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
