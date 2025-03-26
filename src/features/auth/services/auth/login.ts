import type { User } from "@/features/auth/types";
import { setCookie } from "@/lib/cookie";
import { mockUsers } from "@/features/users/mock/mockUsers";
import { PATHS } from "@/features/auth/constants/paths";

const AUTH_TOKEN_KEY = "auth_token";

/**
 * ログイン処理
 * @param email ユーザーのメールアドレス
 * @param password ユーザーのパスワード
 * @returns ユーザー情報
 */
export const login = async (email: string, password: string): Promise<User> => {
  // 実際のAPI呼び出しをここに実装
  // 例: return api.post('/auth/login', { email, password });

  // 仮の実装 - 実際のAPIと置き換えること
  return new Promise((resolve, reject) => {
    if (email && password) {
      // メールアドレスでユーザーを検索
      const user = mockUsers.find((user) => user.email === email);

      // ユーザーが見つからないか、パスワードが一致しない場合はエラー
      if (!user || user.password !== password) {
        reject(new Error("メールアドレスまたはパスワードが正しくありません"));
        return;
      }

      setTimeout(() => {
        // ログイン成功時にトークンをCookieに保存
        const token = "dummy_token_" + Date.now();

        setCookie(AUTH_TOKEN_KEY, token, {
          path: PATHS.ROOT,
          maxAge: 86400, // 1日間有効
          sameSite: "strict",
          secure:
            typeof window !== "undefined" &&
            window.location.protocol === "https:",
        });

        // パスワードを除いたユーザー情報を返す
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword);
      }, 500);
    } else {
      reject(new Error("メールアドレスとパスワードは必須です"));
    }
  });
};
