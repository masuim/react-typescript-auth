import { Heading } from "../../src/components/atoms/Typography/Heading";
import { Text } from "../../src/components/atoms/Typography/Text";
import { Card } from "../../src/components/atoms/Card";
import { useAuthStore } from "../../src/features/auth/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../src/features/auth/services/authService";
import { Button } from "../../src/components/atoms/LinkAndButton/Button/Button";
import { removeCookie } from "src/lib/cookie";

export default function TopPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  // コンポーネント内でも認証状態をチェック
  useEffect(() => {
    if (!isAuthenticated() || !user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const userData = user || {
    name: "テストユーザー",
    email: "test@example.com",
  };

  const handleLogout = () => {
    logout();
    removeCookie("auth_token");
    navigate("/login");
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
        <Button variant="destructive" onClick={handleLogout}>
          ログアウト
        </Button>
      </div>
    </Card>
  );
}
