/**
 * 認証サービス
 * 認証に関連する外部APIとの通信を担当
 * 将来GraphQLやREST APIの変更があっても、このファイルに変更を集約できる
 */

import type { User } from "src/features/auth/types";
import { getCookie, setCookie, removeCookie } from "src/lib/cookie";

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

        // 改善したクッキー関数を使用
        setCookie(AUTH_TOKEN_KEY, token, {
          path: "/",
          maxAge: 86400, // 1日間有効
          sameSite: "strict",
          secure:
            typeof window !== "undefined" &&
            window.location.protocol === "https:",
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
  removeCookie(AUTH_TOKEN_KEY);
};

/**
 * 認証状態の確認
 * @param cookieStr サーバーサイドのクッキー文字列（省略可）
 * @returns 認証されていればtrue、そうでなければfalse
 */
export const isAuthenticated = (cookieStr?: string): boolean => {
  try {
    // Cookieからトークンを取得して確認
    const token = getCookie(AUTH_TOKEN_KEY, cookieStr);
    const isAuth = !!token;

    // デバッグ用
    console.log(
      "isAuthenticated check:",
      isAuth,
      "token:",
      token,
      "cookieStr provided:",
      !!cookieStr
    );

    return isAuth;
  } catch (error) {
    console.error("認証チェック中にエラーが発生:", error);
    return false;
  }
};
