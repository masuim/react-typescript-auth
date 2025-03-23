import { AuthForm } from "src/components/organisms/AuthForm";
import { useForm } from "react-hook-form";
import type { AuthenticationFormBase } from "src/types";

export function Welcome() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationFormBase>();

  const onSubmit = (data: AuthenticationFormBase) => {
    console.log(data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <AuthForm
        type="login"
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        title="ログイン"
        className="w-full max-w-md px-4 sm:px-6 lg:px-8"
      />
    </main>
  );
}
