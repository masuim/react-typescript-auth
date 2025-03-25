import { redirect } from "react-router-dom";
import { PATHS } from "@/features/auth/constants/paths";
import { checkAuthentication } from "./checkAuthentication";
import { invalidateAuthQueries } from "./cacheControl";

/**
 * 保護されたルート用の認証チェック関数
 *
 * 役割:
 * 1. 認証が必要なルート（保護されたページ）のローダー内で使用する
 * 2. ユーザーが認証されていない場合、ログインページに自動的にリダイレクト
 * 3. 認証済みの場合、userData（認証情報）を返し、子ルートで利用可能にする
 *
 * @param request - リクエストオブジェクト（クッキー情報などを含む）
 * @returns 認証済みユーザーのデータ
 * @throws 未認証の場合、ログインページへのリダイレクトを投げる
 */
export const requireAuthentication = async (request: Request) => {
  const result = await checkAuthentication(request);

  if (!result.authenticated) {
    // 認証関連のキャッシュを無効化
    await invalidateAuthQueries();
    throw redirect(result.redirectTo || PATHS.AUTH.LOGIN);
  }

  return result.userData;
};
