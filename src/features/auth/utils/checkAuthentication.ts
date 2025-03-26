import { isAuthenticated } from "@/features/auth/services/auth";
import { PATHS } from "@/features/auth/constants/paths";

type AuthenticationResult = {
  authenticated: boolean;
  redirectTo?: string;
  userData?: {
    timestamp: string;
  };
  error?: {
    message: string;
    cause?: unknown;
  };
};

/**
 * リクエストの認証状態を確認し、適切な結果を返す
 * @param request HTTPリクエスト
 * @returns 認証結果を含むオブジェクト
 */
export const checkAuthentication = async (
  request: Request
): Promise<AuthenticationResult> => {
  const cookies = request.headers.get("Cookie") || "";
  const hasAuthToken = cookies.includes("auth_token=");

  if (!hasAuthToken) {
    return {
      authenticated: false,
      redirectTo: PATHS.AUTH.LOGIN,
      error: {
        message: "認証トークンが見つかりません",
      },
    };
  }

  try {
    const authenticated = isAuthenticated(cookies);

    if (!authenticated) {
      return {
        authenticated: false,
        redirectTo: PATHS.AUTH.LOGIN,
        error: {
          message: "認証トークンが無効です",
        },
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
    const errorMessage =
      error instanceof Error
        ? error.message
        : "認証チェック中に予期せぬエラーが発生";

    console.error("認証チェックエラー:", errorMessage);

    return {
      authenticated: false,
      redirectTo: PATHS.AUTH.LOGIN,
      error: {
        message: errorMessage,
        cause: error,
      },
    };
  }
};
