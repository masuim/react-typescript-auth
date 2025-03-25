import { LoginTemplate } from "@/components/templates/LoginTemplate";
import type { LoaderFunctionArgs } from "react-router-dom";
import { requireNoAuthentication } from "@/features/auth/utils/requireNoAuthentication";

// 既にログイン済みの場合、/top にリダイレクト
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await requireNoAuthentication(request);
};

export default function Login() {
  return (
    <LoginTemplate
      title="ログイン"
      subtitle="メールアドレスとパスワードを入力してください"
    />
  );
}
