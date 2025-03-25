import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getUsers,
  login as authLogin,
  logout as authLogout,
} from "@/features/auth/services/authService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/features/auth/constants/routes";
import { useAuthStore } from "@/features/auth/store/authStore";

/**
 * 認証エラーのハンドリング
 */
export const handleAuthError = (error: unknown): { message: string } => {
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: "予期せぬエラーが発生しました" };
};

/**
 * ユーザー一覧を取得するためのクエリフック
 * 【関連ファイル】
 * - app/routes/_protected.top.tsx: このクエリフックを使用してユーザー一覧を表示
 * - src/features/auth/store/authStore.ts: 認証状態とユーザー情報の管理と併用される
 *
 * NOTE: ユーザーデータの取得戦略について
 * - 現在は全ユーザーデータのみをクエリで取得し、現在のユーザーはストアから取得している
 * - より一貫性のある実装としては、以下の選択肢がある:
 *   1. 現在のユーザー情報も専用のクエリで取得する(useCurrentUserQuery)
 *      - メリット: 常に最新データを取得できる
 *      - デメリット: 追加のAPI呼び出しが必要
 *
 *   2. キャッシュ戦略の最適化
 *      - staleTimeの調整: 現在は5分に設定されているが、データの鮮度要件に合わせて調整
 *      - 条件付き再フェッチ: フォーカス時やネットワーク再接続時に再取得するオプションの検討
 *
 *   3. ハイブリッドアプローチ
 *      - 認証トークンのみをストアで管理
 *      - ユーザープロフィールデータはすべてクエリで管理し適切にキャッシュ
 */
export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
    retry: 1,
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await authLogin(email, password);
    },
    onSuccess: (user) => {
      setUser(user);
      setIsAuthenticated(true);

      // 少し遅延させてから遷移させることで、状態更新が完了してからの遷移を保証
      setTimeout(() => {
        navigate(ROUTES.TOP);
      }, 100);
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      authLogout();
      return Promise.resolve();
    },
    onSuccess: () => {
      setUser(null);
      setIsAuthenticated(false);
      navigate(ROUTES.LOGIN);
    },
  });
};
