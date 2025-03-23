import React from "react";
import { AuthInput } from "../../molecules/AuthInput/AuthInput";
import { SubmitButton } from "../../molecules/SubmitButton/SubmitButton";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { AuthenticationFormBase } from "../../../types";
import { cn } from "../../../lib/utils";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<AuthenticationFormBase>;
  errors: FieldErrors<AuthenticationFormBase>;
  isLoading?: boolean;
  className?: string;
  title?: string;
}

export const AuthForm = ({
  type,
  onSubmit,
  register,
  errors,
  isLoading = false,
  className,
  title,
}: AuthFormProps) => {
  return (
    <form onSubmit={onSubmit} className={cn("space-y-6", className)}>
      {title && <h2 className="text-2xl font-semibold">{title}</h2>}
      <div className="space-y-4">
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

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? "処理中..." : type === "login" ? "ログイン" : "新規登録"}
      </SubmitButton>
    </form>
  );
};
