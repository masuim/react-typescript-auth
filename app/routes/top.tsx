import { redirect } from "react-router-dom";
import { Heading } from "../../src/components/atoms/Typography/Heading";
import { Text } from "../../src/components/atoms/Typography/Text";
import { Card } from "../../src/components/atoms/Card";
import { isAuthenticated } from "../lib/auth";
import { useAuthStore } from "../../src/features/auth/store/authStore";
import { getAuthToken } from "../lib/auth";

export async function loader() {
  console.log("Top page loader executed");

  // document.cookieの直接確認（サーバーサイドなのでundefined）
  console.log("Server-side document access:", typeof document);

  // 認証チェック（開発環境ではモック認証を使用）
  const authenticated = isAuthenticated();
  console.log("Authentication status:", authenticated);

  // 本来は認証が必要だが、開発環境ではサーバーサイドは常に認証OK
  if (!authenticated) {
    console.log("Not authenticated, redirecting to login");
    return redirect("/login");
  }

  console.log("Authenticated, rendering top page");
  return {
    authenticated: true,
    timestamp: new Date().toISOString(),
  };
}

export default function TopPage() {
  // Zustandストアからユーザー情報を取得
  const user = useAuthStore((state) => state.user);

  // フォールバック用のモックデータ
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
    </Card>
  );
}
