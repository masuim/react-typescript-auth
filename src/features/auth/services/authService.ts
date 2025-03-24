/**
 * 認証サービス
 * 認証に関連する外部APIとの通信を担当
 * 将来GraphQLやREST APIの変更があっても、このファイルに変更を集約できる
 */

import type { User } from "src/features/auth/types";
import Cookies from "universal-cookie";

const cookies = new Cookies();
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
    // 簡易的な検証（実際の実装では削除する）
    if (email && password) {
      // モックユーザーの認証情報を厳密にチェック
      if (email !== "test@example.com" || password !== "password123") {
        reject(new Error("メールアドレスまたはパスワードが正しくありません"));
        return;
      }

      setTimeout(() => {
        // ログイン成功時にトークンをCookieに保存
        const token = "dummy_token_" + Date.now();
        cookies.set(AUTH_TOKEN_KEY, token, {
          path: "/",
          maxAge: 86400, // 1日間有効
          sameSite: "lax",
        });

        resolve({
          id: "1",
          email: email,
          name: "テストユーザー",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }, 500);
    } else {
      reject(new Error("メールアドレスとパスワードは必須です"));
    }
  });
};

/**
 * ログアウト処理
 */
export const logout = (): void => {
  // 実際のAPI呼び出しをここに実装
  // 例: api.post('/auth/logout');

  // Cookieからトークンを削除
  cookies.remove(AUTH_TOKEN_KEY, { path: "/" });
};

/**
 * 認証状態の確認
 * @returns 認証されていればtrue、そうでなければfalse
 */
export const isAuthenticated = (): boolean => {
  // Cookieからトークンを取得して確認
  const token = cookies.get(AUTH_TOKEN_KEY);
  return !!token;
};
