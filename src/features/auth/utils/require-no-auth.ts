import { redirect } from "react-router-dom";
import { PATHS } from "@/features/auth/constants/paths";
import { checkAuthentication } from "./check-auth";
import { invalidateAuthQueries } from "@/utils/cache/cache-control";

/**
 * 未認証ユーザー専用ページ用の認証チェック関数
 *
 * 役割:
 * 1. ログインページなど、未認証ユーザーのみがアクセスすべきページで使用
 * 2. すでに認証済みのユーザーが訪問した場合、トップページに自動的にリダイレクト
 * 3. 認証されていない場合は何も返さず、通常通りページを表示
 *
 * @param request - リクエストオブジェクト（クッキー情報などを含む）
 * @returns null（未認証の場合、ページは通常通り表示される）
 * @throws 認証済みの場合、トップページへのリダイレクトを投げる
 */
export const requireNoAuthentication = async (request: Request) => {
  const result = await checkAuthentication(request);

  if (result.authenticated) {
    await invalidateAuthQueries();
    throw redirect(PATHS.PROTECTED.TOP);
  }

  return null;
};
