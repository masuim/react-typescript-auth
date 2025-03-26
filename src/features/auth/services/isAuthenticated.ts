import { AUTH_TOKEN_KEY } from "@/features/auth/constants/auth-token-key";
import { getCookie } from "@/lib/cookie";

/**
 * 認証状態の確認
 * @param cookieStr サーバーサイドのクッキー文字列（省略可）
 * @returns 認証されていればtrue、そうでなければfalse
 * @throws {Error} クッキーの取得に失敗した場合
 */
export const isAuthenticated = (cookieStr?: string): boolean => {
  try {
    const token = getCookie(AUTH_TOKEN_KEY, cookieStr);
    const isAuth = !!token;
    return isAuth;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `認証トークンの取得に失敗: ${error.message}`
        : "認証トークンの取得中に予期せぬエラーが発生";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
