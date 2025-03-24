import { LoginTemplate } from "../../src/components/templates/LoginTemplate/LoginTemplate";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginTemplate
        title="ログイン"
        subtitle="メールアドレスとパスワードを入力してください"
      />
    </div>
  );
}
