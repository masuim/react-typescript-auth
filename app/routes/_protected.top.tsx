import { Heading, Text } from "../../src/components/atoms/Typography";
import { Card } from "../../src/components/atoms/Card";
import { useAuthStore } from "../../src/features/auth/store/authStore";
import { useLoaderData } from "react-router-dom";
import { Button } from "../../src/components/atoms/LinkAndButton";
import { useAuth } from "../../src/features/auth/hooks/useAuth";

/**
 * トップページコンポーネント
 * 認証チェックは親の_protectedルートで行われるため、
 * このコンポーネントでは認証済みであることを前提としたUIの表示のみを行う
 */
export default function TopPage() {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();
  // 親ルートのローダーからのデータを取得
  const loaderData = useLoaderData();

  const userData = user || {
    name: "テストユーザー",
    email: "test@example.com",
  };

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
            <span className="font-medium">名前：</span> {userData.name}
          </Text>
          <Text as="p">
            <span className="font-medium">メール：</span> {userData.email}
          </Text>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button variant="destructive" onClick={logout}>
          ログアウト
        </Button>
      </div>
    </Card>
  );
}
