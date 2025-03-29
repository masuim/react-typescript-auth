import { AuthInput } from "@/components/molecules/AuthInput";
import { SubmitButton } from "@/components/molecules/SubmitButton";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormData } from "@/features/auth/types";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const AuthForm = ({
  type,
  onSubmit,
  register,
  errors,
}: AuthFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full">
      <div className="flex flex-col gap-8 mb-4">
        <AuthInput
          label="メールアドレス"
          type="email"
          name="email"
          required
          register={register}
          error={errors.email?.message}
        />
        <AuthInput
          label="パスワード"
          type="password"
          name="password"
          required
          register={register}
          error={errors.password?.message}
        />
        {type === "register" && (
          <AuthInput
            label="パスワード（確認）"
            type="password"
            name="confirmPassword"
            required
            register={register}
            error={errors.confirmPassword?.message}
          />
        )}
      </div>
      <SubmitButton>{type === "login" ? "ログイン" : "登録"}</SubmitButton>
    </form>
  );
};

