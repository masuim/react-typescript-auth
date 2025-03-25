import { Outlet, redirect, type LoaderFunctionArgs } from "react-router-dom";
import { Suspense } from "react";
import { requireAuthentication } from "@/features/auth/utils/authUtils";
import { Loading } from "@/components/atoms/Loading";

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
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
}
