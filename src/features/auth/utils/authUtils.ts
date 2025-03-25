import { redirect } from "react-router-dom";
import { isAuthenticated } from "@/features/auth/services/auth";
import { PATHS } from "@/features/auth/constants/paths";

/**
 * キャッシュを防ぐためのHTTPヘッダーを提供する関数
 *
 * getNoCacheHeaders関数が必要な理由:
 * 1. セキュリティリスク防止: キャッシュされた認証情報が漏洩するリスクを軽減
 * 2. 認証状態の一貫性: ブラウザがキャッシュした古い認証状態を表示することを防止
 * 3. ログアウト後の安全性: ログアウト後にブラウザバックで保護ページを表示できてしまう問題を防止
 * 4. 共有端末での情報漏洩防止: 公共の端末でセッション情報が残らないようにする
 *
 * 具体例:
 * - このヘッダーがない場合、ユーザーがログアウト後にブラウザバックすると
 *   キャッシュから保護ページが表示され、セキュリティ上の問題となる
 * - 認証状態が変更されてもキャッシュが優先され、最新の状態が反映されない
 *
 * @returns キャッシュを無効化するHTTPヘッダーオブジェクト
 */
export const getNoCacheHeaders = () => {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  };
};

export const checkAuthentication = async (request: Request) => {
  const cookies = request.headers.get("Cookie") || "";
  const hasAuthToken = cookies.includes("auth_token=");

  if (!hasAuthToken) {
    return {
      authenticated: false,
      redirectTo: PATHS.AUTH.LOGIN,
    };
  }

  try {
    const authenticated = isAuthenticated(cookies);

    if (!authenticated) {
      return {
        authenticated: false,
        redirectTo: PATHS.AUTH.LOGIN,
      };
    }

    // 認証成功
    return {
      authenticated: true,
      userData: {
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("認証チェック中にエラーが発生", error);
    return {
      authenticated: false,
      redirectTo: PATHS.AUTH.LOGIN,
      error,
    };
  }
};

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
    throw redirect(result.redirectTo || PATHS.AUTH.LOGIN, {
      headers: getNoCacheHeaders(),
    });
  }

  return result.userData;
};

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
    throw redirect(PATHS.PROTECTED.TOP, {
      headers: getNoCacheHeaders(),
    });
  }

  return null;
};
