import { LoginTemplate } from "src/components/templates/LoginTemplate";

export function Top() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <LoginTemplate
        title="ログイン"
        subtitle="メールアドレスとパスワードを入力してください"
      />
    </main>
  );
}
