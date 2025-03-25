import { getCookie } from "@/lib/cookie";

const AUTH_TOKEN_KEY = "auth_token";

/**
 * 認証状態の確認
 * @param cookieStr サーバーサイドのクッキー文字列（省略可）
 * @returns 認証されていればtrue、そうでなければfalse
 */
export const isAuthenticated = (cookieStr?: string): boolean => {
  try {
    const token = getCookie(AUTH_TOKEN_KEY, cookieStr);
    const isAuth = !!token;
    return isAuth;
  } catch (error) {
    console.error("認証チェック中にエラーが発生:", error);
    return false;
  }
};
