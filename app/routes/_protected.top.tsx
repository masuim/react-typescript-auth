import { useAuthStore } from "@/features/auth/store/authStore";
import { Heading, Text } from "@/components/atoms/typography";
import { Card } from "@/components/atoms/Card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/atoms/Button";
import { Loading } from "@/components/atoms/Loading";
import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { useUsersQuery } from "@/features/auth/hooks/queries";

/**
 * NOTE: ユーザーデータの取得と管理に関するベストプラクティスについて
 * 【関連ファイル】
 * - src/features/auth/store/authStore.ts: 認証状態とユーザー情報をストアで管理する実装
 * - src/hooks/queries.ts: ユーザーデータをクエリで取得する実装
 *
 * 現在の実装:
 * - ユーザー一覧: React Query (useUsersQuery)を使用して取得 - サーバーから最新データを取得
 * - 現在のユーザー: Zustand (useAuthStore)を使用して管理 - ローカルストレージに保存
 *
 * 考慮点:
 * 1. データの一貫性:
 *   - 現在の実装では、ログイン時に取得したユーザー情報がストアに保存され、その後更新されない
 *   - ユーザーデータが変更された場合、ストアのデータは古くなる可能性がある
 *
 * 2. UXと効率性:
 *   - ストアを使用する利点は、ページ間の遷移でもユーザー情報を維持できること
 *   - 毎回クエリで取得すると、認証情報の検証は確実だが、余分なAPIリクエストが発生する
 *
 * 3. セキュリティ:
 *   - セッション管理の観点では、トークンの有効性確認が重要
 *   - 現在は`isAuthenticated`関数でトークンの存在チェックのみ行っている
 *
 * 推奨アプローチ:
 * - ハイブリッドアプローチ: 基本認証情報はストアで管理し、詳細情報はクエリで取得
 * - 定期的な検証: ストア内のユーザー情報の有効期限を設定
 * - ユースケースに応じて: 管理機能ではクエリ、頻繁なアクセスにはストア+キャッシュの組み合わせ
 *
 * アプリケーションの規模と要件に応じて、ストアとクエリの適切な組み合わせを選択することが重要。
 */

/**
 * トップページコンポーネント
 * 認証チェックは親の_protectedルートで行われるため、
 * このコンポーネントでは認証済みであることを前提としたUIの表示のみを行う
 */
export default function ProtectedTopPage() {
  const { user: currentUser } = useAuthStore();
  const { logout } = useAuth();

  const { data: users = [], isLoading, error } = useUsersQuery();

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
