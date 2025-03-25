import { isAuthenticated } from "@/features/auth/services/auth";
import { PATHS } from "@/features/auth/constants/paths";

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
