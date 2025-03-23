import { AuthInput } from "src/components/molecules/AuthInput/AuthInput";
import { SubmitButton } from "src/components/molecules/SubmitButton/SubmitButton";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <h1>React Router Header</h1>
        </header>
        <div className="w-full space-y-6 px-4">
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                コンポーネント確認
              </h2>

              <div className="space-y-4">
                <AuthInput
                  id="email"
                  name="email"
                  type="email"
                  label="メールアドレス"
                  required
                />
                <AuthInput
                  id="password"
                  name="password"
                  type="password"
                  label="パスワード"
                  required
                  error="パスワードは8文字以上で入力してください"
                />
              </div>

              <div className="space-y-4">
                <SubmitButton>通常のボタン</SubmitButton>
                <SubmitButton loading>ローディング中のボタン</SubmitButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
