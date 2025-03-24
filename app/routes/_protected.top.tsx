import { Heading } from "../../src/components/atoms/Typography/Heading";
import { Text } from "../../src/components/atoms/Typography/Text";
import { Card } from "../../src/components/atoms/Card";

const ProtectedPage: React.FC = () => {
  // TODO: 後で実際のユーザー情報を取得する処理を追加
  const mockUser = {
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
            <span className="font-medium">名前：</span> {mockUser.name}
          </Text>
          <Text as="p">
            <span className="font-medium">メール：</span> {mockUser.email}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default ProtectedPage;
