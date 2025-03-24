import { getCookie, setCookie, removeCookie } from "./cookie";

export const TOKEN_COOKIE_KEY = "auth_token";

export interface User {
  id: string;
  email: string;
  name: string;
}

export const login = async (email: string, password: string): Promise<User> => {
  console.log("email, password", email, password);
  // 実際の環境では、APIリクエストを行う
  // このサンプルではモックデータを返す
  const mockUser = {
    id: "1",
    email,
    name: "ユーザー1",
  };

  setCookie(TOKEN_COOKIE_KEY, "mock-jwt-token");

  return mockUser;
};

export const logout = (): void => {
  removeCookie(TOKEN_COOKIE_KEY);
};

export const getAuthToken = (): string | null => {
  return getCookie(TOKEN_COOKIE_KEY) || null;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
