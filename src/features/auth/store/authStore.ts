import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/features/auth/types";

/**
 * 認証状態を管理するストア
 * 【関連ファイル】
 * - app/routes/_protected.top.tsx: このストアを使用してユーザー情報を表示
 * - src/hooks/queries.ts: ログイン/ログアウト処理でこのストアを更新
 *
 * NOTE: 認証データの管理戦略について
 * - 現在の実装ではZustandとpersistミドルウェアを使用して認証状態とユーザー情報をローカルストレージに保存
 *
 * 考慮すべき点:
 * 1. データの鮮度
 *   - ストアに保存されたユーザー情報は、ログイン時のみ更新される
 *   - ユーザープロフィールが変更された場合、ストア内のデータは古くなる
 *
 * 2. 改善案
 *   - トークンと最小限の識別情報(id, email)のみをストアで管理
 *   - ユーザープロフィールの詳細情報はReact Queryを使用して取得
 *   - ストアデータに有効期限を設定し、定期的に検証または更新
 *
 * 3. セキュリティ対策
 *   - トークンの有効期限確認の実装
 *   - センシティブ情報はセッションストレージの使用も検討
 *   - トークンリフレッシュメカニズムの実装
 *
 * バランスの取れたアプローチ:
 * - 認証状態の維持にはストアを使用(UX向上)
 * - ユーザー情報の表示には専用のクエリを使用(データ鮮度確保)
 */
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
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
