import { useEffect, useState } from "react";
import type { User } from "@/features/auth/types";
import { getUsers } from "@/features/auth/services/authService";
import { useAuthStore } from "@/features/auth/store/authStore";
import { Heading, Text } from "@/components/atoms/Typography";
import { Card } from "@/components/atoms/Card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/atoms/LinkAndButton";

/**
 * トップページコンポーネント
 * 認証チェックは親の_protectedルートで行われるため、
 * このコンポーネントでは認証済みであることを前提としたUIの表示のみを行う
 */
export default function ProtectedTopPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // 認証ストアからユーザー情報を取得
  const { user: currentUser } = useAuthStore();
  // 認証関連の操作を行うフックを使用
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        // サービス層のgetUsers関数を使用してユーザーデータを取得
        // 注：現在はモック実装ですが、将来的にはAPIからデータを取得する実装に置き換え可能
        const userData = await getUsers();
        setUsers(userData);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("ユーザーデータの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>ユーザーデータを読み込み中...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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
