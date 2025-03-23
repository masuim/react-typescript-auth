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
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <h1>React Router Header</h1>
        </header>
        <div className="w-full space-y-6 px-4">
          <AuthForm
            type="login"
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </main>
  );
}
