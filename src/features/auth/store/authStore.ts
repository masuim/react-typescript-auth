import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/features/auth/types";

/**
 * 認証状態を管理するストア
 *
 * 【データ取得と管理の戦略】
 * 1. 認証状態の管理
 *    - ログイン状態（isAuthenticated）とユーザー情報（user）をZustandで管理
 *    - persistミドルウェアを使用してローカルストレージに永続化
 *
 * 2. データの鮮度管理
 *    - ログイン時にユーザー情報を更新
 *    - ログアウト時に情報をクリア
 *    - トークンの有効期限に基づいて認証状態を検証
 *
 * 3. セキュリティ対策
 *    - トークンはCookieで管理（httpOnly, secure, sameSite）
 *    - センシティブ情報はストアに保存しない
 *
 * 4. パフォーマンス最適化
 *    - 認証状態の変更時のみ再レンダリング
 *    - 不要なAPI呼び出しを避けるためのキャッシュ戦略
 *
 * 【関連ファイル】
 * - app/routes/_protected.top.tsx: このストアを使用してユーザー情報を表示
 * - src/features/users/hooks/queries/useUsers.ts: ユーザー一覧データの取得
 *
 * 【改善案】
 * 1. トークン管理の強化
 *    - リフレッシュトークンの実装
 *    - トークンの有効期限管理
 *
 * 2. データの鮮度向上
 *    - 定期的な認証状態の検証
 *    - ユーザー情報の更新トリガーの実装
 *
 * 3. エラーハンドリング
 *    - トークン無効時の自動ログアウト
 *    - ネットワークエラー時のリトライ戦略
 */
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    }),
    {
      name: "auth-storage",
    }
  )
);
