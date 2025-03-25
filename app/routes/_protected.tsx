import { Outlet, redirect, type LoaderFunctionArgs } from "react-router-dom";
import { isAuthenticated } from "../../src/features/auth/services/authService";
import { Suspense } from "react";

// ローディング中に表示するコンポーネント
function LoadingComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

/**
 * 保護されたルート全体の認証チェックを行うローダー
 * 子ルートはこのローダーの結果をそのまま使用できる
 */
export async function loader({ request }: LoaderFunctionArgs) {
  // リクエストからクッキーを取得して認証チェック
  const cookies = request.headers.get("Cookie") || "";
  const hasAuthToken = cookies.includes("auth_token=");

  // サーバーサイドでの認証チェック
  if (!hasAuthToken) {
    // キャッシュを防ぐためのヘッダーを設定
    return redirect("/login", {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  }

  try {
    // クライアントサイドの認証チェック - クッキー文字列を渡す
    const authenticated = isAuthenticated(cookies);

    if (!authenticated) {
      return redirect("/login", {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
    }

    // 認証が成功した場合、このデータは子ルートで利用可能
    return {
      authenticated: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("認証チェック中にエラーが発生", error);
    return redirect("/login", {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  }
}

/**
 * 保護されたルート全体のレイアウト
 * 子ルートのコンテンツはOutletでレンダリングされる
 */
export default function ProtectedLayout() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Outlet />
    </Suspense>
  );
}
