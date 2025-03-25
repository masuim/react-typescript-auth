import { LoginTemplate } from "@/components/templates/LoginTemplate";
import { type LoaderFunctionArgs, redirect } from "react-router-dom";
import { isAuthenticated } from "@/features/auth/services/authService";

// 既にログイン済みの場合、/topにリダイレクト
export async function loader({ request }: LoaderFunctionArgs) {
  const cookies = request.headers.get("Cookie") || "";
  const hasAuthToken = cookies.includes("auth_token=");

  const authenticated = isAuthenticated(cookies);

  if (hasAuthToken && authenticated) {
    return redirect("/top");
  }

  return { authenticated: false };
}

export default function Login() {
  return (
    <LoginTemplate
      title="ログイン"
      subtitle="メールアドレスとパスワードを入力してください"
    />
  );
}
