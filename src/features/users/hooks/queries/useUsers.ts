import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/features/users/services";

/**
 * ユーザー一覧を取得するためのクエリフック
 *
 * 【データ取得と管理の戦略】
 * 詳細は @/features/auth/store/useAuthStore.ts を参照
 *
 * 【関連ファイル】
 * - app/routes/_protected.top.tsx: このクエリフックを使用してユーザー一覧を表示
 * - src/features/auth/store/useAuthStore.ts: 認証状態とユーザー情報の管理
 *
 * 【実装の特徴】
 * - React Queryを使用してユーザー一覧データを取得
 * - 5分間のキャッシュを設定し、不要なAPI呼び出しを防止
 * - エラー発生時は1回のみリトライ
 */
export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
    retry: 1,
  });
};
