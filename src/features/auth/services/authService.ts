/**
 * 認証サービス
 * 認証に関連する外部APIとの通信を担当
 * 将来GraphQLやREST APIの変更があっても、このファイルに変更を集約できる
 */

import type { User, AuthResponse } from "@/features/auth/types";
import { getCookie, setCookie, removeCookie } from "@/lib/cookie";
import { mockUsers, MOCK_PASSWORD } from "@/features/auth/mock/users";

const AUTH_TOKEN_KEY = "auth_token";

/**
 * ユーザー認証を行う関数
 *
 * 注意: これはモック実装です
 * 実際の環境では、APIやデータベースを使用して認証を行います
 * 例: const response = await api.post('/auth/login', { email, password });
 */
export const authenticateUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  // 遅延をシミュレート（リアルなAPI呼び出しのように見せるため）
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = mockUsers.find((user) => user.email === email);

  if (!user || password !== MOCK_PASSWORD) {
    return {
      success: false,
      error: "メールアドレスまたはパスワードが正しくありません",
    };
  }

  return { success: true, data: user };
};

/**
 * すべてのユーザーを取得する関数
 *
 * 注意: これはモック実装です
 * 実際の環境では、APIやデータベースからユーザーリストを取得します
 * 例: const response = await api.get('/users');
 */
export const getUsers = async (): Promise<User[]> => {
  // 遅延をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [...mockUsers]; // 元の配列を変更しないようコピーを返す
};

/**
 * IDによるユーザー取得関数
 *
 * 注意: これはモック実装です
 * 実際の環境では、APIやデータベースから特定のユーザー情報を取得します
 * 例: const response = await api.get(`/users/${id}`);
 */
export const getUserById = async (id: string): Promise<User | null> => {
  // 遅延をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 200));

  return mockUsers.find((user) => user.id === id) || null;
};

/**
 * メールアドレスによるユーザー取得関数
 *
 * 注意: これはモック実装です
 * 実際の環境では、APIやデータベースからユーザー情報を取得します
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  // 遅延をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 200));

  return mockUsers.find((user) => user.email === email) || null;
};

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
    const token = getCookie(AUTH_TOKEN_KEY, cookieStr);
    const isAuth = !!token;
    return isAuth;
  } catch (error) {
    console.error("認証チェック中にエラーが発生:", error);
    return false;
  }
};
