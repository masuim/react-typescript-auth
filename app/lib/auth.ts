import type { User } from "src/features/auth/types";
import { getCookie, setCookie, removeCookie } from "./cookie";
import { mockUsers } from "src/features/auth/mock/users";

/**
 * 認証モジュール
 *
 * 注意: このモジュールは開発環境用のモック認証を含んでいます
 * - クライアントサイド: cookieベースの通常の認証ロジック
 * - サーバーサイド: 開発のため常に認証済みとなるモック実装
 *
 * 本番環境では、サーバーサイドでの適切な認証検証を実装する必要があります
 */

export const TOKEN_COOKIE_KEY = "auth_token";

export const login = async (email: string, password: string): Promise<User> => {
  // 実際の環境では、APIリクエストを行う
  // このサンプルではモックデータを返す
  const mockUser = mockUsers[0];

  try {
    // 開発環境用のcookie設定
    // 本番環境では以下の設定を変更することを推奨:
    // 1. httpOnly: true - XSS攻撃からの保護のため
    // 2. secure: true - HTTPS接続のみでcookieを送信
    // 3. sameSite: "strict" - CSRF攻撃からの保護を強化
    setCookie(TOKEN_COOKIE_KEY, "mock-jwt-token", {
      path: "/",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      sameSite: "lax" as const, // 本番環境では "strict" を推奨
      httpOnly: false, // 開発環境用。本番環境では true を推奨
      secure: process.env.NODE_ENV === "production", // 本番環境ではHTTPSのみ
    });
  } catch (e) {
    console.error("Failed to set cookie:", e);
  }

  return mockUser;
};

export const logout = (): void => {
  removeCookie(TOKEN_COOKIE_KEY);
};

export const getAuthToken = (): string | null => {
  return getCookie(TOKEN_COOKIE_KEY) || null;
};

export const isAuthenticated = (): boolean => {
  // クライアントサイドの場合は通常のcookie認証
  if (typeof document !== "undefined") {
    const token = getAuthToken();
    return !!token;
  }

  // サーバーサイドの場合（開発環境）はモック認証を使用
  // 本番環境では適切な認証ロジックに置き換える必要があります
  return true; // 開発環境では常に認証済みとする
};
