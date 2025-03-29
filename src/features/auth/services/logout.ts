import { removeCookie } from "@/lib/cookie";
import { AUTH_TOKEN_KEY } from "@/features/auth/constants/auth-token-key";

/**
 * ログアウト処理
 */
export const logout = (): void => {
  // 実際のAPI呼び出しをここに実装
  // 例: api.post('/auth/logout');

  removeCookie(AUTH_TOKEN_KEY);
};

