import { AuthInput } from "../../molecules/AuthInput/AuthInput";
import { SubmitButton } from "../../molecules/SubmitButton/SubmitButton";
import type { LoginFormData, RegisterFormData } from "src/types";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

type FormData = LoginFormData & Partial<RegisterFormData>;

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  register,
  errors,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8 w-full">
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
      <SubmitButton>{type === "login" ? "ログイン" : "登録"}</SubmitButton>
    </form>
  );
};
