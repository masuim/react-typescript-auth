import React from "react";

const ProtectedPage: React.FC = () => {
  // TODO: 後で実際のユーザー情報を取得する処理を追加
  const mockUser = {
    name: "テストユーザー",
    email: "test@example.com",
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            認証済みページ
          </h1>
          <p className="text-gray-600 mb-6">
            このページは認証状態でのみ表示可能です
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            ユーザー情報
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">名前：</span> {mockUser.name}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">メール：</span> {mockUser.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedPage;
