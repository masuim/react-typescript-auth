import { queryClient } from "@/providers/QueryProvider";

/**
 * 認証関連のキャッシュ制御を一元管理するユーティリティ
 *
 * 【キャッシュ制御の戦略】
 * 1. ログイン時:
 *    - 認証状態を更新
 *    - ユーザー関連のクエリを無効化
 *
 * 2. ログアウト時:
 *    - 認証状態をクリア
 *    - 全クエリキャッシュをクリア
 *
 * 3. 認証状態変更時:
 *    - 関連するクエリを無効化
 *    - 必要に応じてキャッシュをクリア
 */

/**
 * 認証関連のクエリキー
 */
export const AUTH_QUERY_KEYS = {
  user: ["auth", "user"],
  users: ["users"],
} as const;

/**
 * 認証状態変更時のキャッシュ制御
 * ログイン/ログアウト時に呼び出し、関連するキャッシュを更新
 */
export const invalidateAuthQueries = async () => {
  await queryClient.invalidateQueries({
    queryKey: [AUTH_QUERY_KEYS.user],
  });
  await queryClient.invalidateQueries({
    queryKey: [AUTH_QUERY_KEYS.users],
  });
};

/**
 * ログアウト時のキャッシュ制御
 * 全クエリキャッシュをクリアし、認証関連のクエリを無効化
 */
export const clearAuthCache = async () => {
  await queryClient.clear();
  await invalidateAuthQueries();
};
