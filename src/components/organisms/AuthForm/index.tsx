import React from "react";
import { AuthInput } from "../../molecules/AuthInput/AuthInput";
import { SubmitButton } from "../../molecules/SubmitButton/SubmitButton";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { AuthenticationFormBase } from "../../../types";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<AuthenticationFormBase>;
  errors: FieldErrors<AuthenticationFormBase>;
  isLoading?: boolean;
}

export const AuthForm = ({
  type,
  onSubmit,
  register,
  errors,
  isLoading = false,
}: AuthFormProps) => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {type === "login" ? "ログイン" : "新規登録"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <AuthInput
              label="メールアドレス"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              required
            />
            <AuthInput
              label="パスワード"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
              required
            />
          </div>

          <SubmitButton
            type="submit"
            disabled={isLoading}
            children={
              isLoading
                ? "処理中..."
                : type === "login"
                ? "ログイン"
                : "新規登録"
            }
          />
        </form>
      </div>
    </div>
  );
};
