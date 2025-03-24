import { isAuthenticated } from "../../src/features/auth/services/authService";
import { redirect, type LoaderFunctionArgs } from "react-router-dom";

/**
 * データローダー関数
 * React Router FSRでは、.data.tsファイルはルートのデータローダーとして機能します
 */
export async function loader({ request }: LoaderFunctionArgs) {
  // リクエストからクッキーを取得して認証チェック
  const cookies = request.headers.get("Cookie") || "";
  const hasAuthToken = cookies.includes("auth_token=");

  // クライアントサイドの認証チェックも実行
  const authenticated = isAuthenticated();

  // サーバーサイドとクライアントサイドの両方で認証状態を確認
  // 厳格に両方の認証が必要
  if (!hasAuthToken || !authenticated) {
    return redirect("/login");
  }

  return {
    authenticated: true,
    timestamp: new Date().toISOString(),
  };
}
