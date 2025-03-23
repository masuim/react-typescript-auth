import { AuthInput } from "../../molecules/AuthInput/AuthInput";
import { SubmitButton } from "../../molecules/SubmitButton/SubmitButton";
import type { AuthenticationFormBase } from "src/types";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<AuthenticationFormBase>;
  errors: FieldErrors<AuthenticationFormBase>;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  register,
  errors,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8 w-[320px]">
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
      <SubmitButton>{type === "login" ? "ログイン" : "登録"}</SubmitButton>
    </form>
  );
};
