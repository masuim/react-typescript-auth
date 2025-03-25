import { useQuery } from "@tanstack/react-query";
import type { User } from "@/features/auth/types";
import { getUsers } from "@/features/auth/services/authService";
import { useAuthStore } from "@/features/auth/store/authStore";
import { Heading, Text } from "@/components/atoms/Typography";
import { Card } from "@/components/atoms/Card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/atoms/LinkAndButton";
import { Loading } from "@/components/atoms/Loading";
import { ErrorMessage } from "@/components/atoms/ErrorMessage";

/**
 * トップページコンポーネント
 * 認証チェックは親の_protectedルートで行われるため、
 * このコンポーネントでは認証済みであることを前提としたUIの表示のみを行う
 */
export default function ProtectedTopPage() {
  const { user: currentUser } = useAuthStore();
  const { logout } = useAuth();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
    retry: 1,
  });

  if (isLoading) return <Loading />;

  if (error)
    return <ErrorMessage message="ユーザーデータの取得に失敗しました" />;

  return (
    <Card width="w-full max-w-md mx-auto" padding="p-8" className="shadow-md">
      <div className="text-center">
        <Heading level="h2" className="mb-4">
          認証済みページ
        </Heading>
        <Text variant="default" className="mb-6">
          このページは認証状態でのみ表示可能です
        </Text>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <Heading level="h3" className="mb-2">
          ユーザー情報
        </Heading>
        <div className="space-y-2">
          <Text as="p">
            <span className="font-medium">名前：</span> {currentUser?.name}
          </Text>
          <Text as="p">
            <span className="font-medium">メール：</span> {currentUser?.email}
          </Text>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button variant="destructive" onClick={logout}>
          ログアウト
        </Button>
      </div>

      <div className="mt-6">
        <h1>ユーザー一覧</h1>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-list-item">
              <span className="user-name">{user.name}</span>
              <span className="user-email">({user.email})</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
