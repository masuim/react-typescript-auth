import { Outlet, redirect, type LoaderFunctionArgs } from "react-router-dom";
import { Suspense } from "react";
import { requireAuthentication } from "@/features/auth/utils/authUtils";

// ローディング中に表示するコンポーネント
function LoadingComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

// 未認証の場合、/login にリダイレクト
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await requireAuthentication(request);
};

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
