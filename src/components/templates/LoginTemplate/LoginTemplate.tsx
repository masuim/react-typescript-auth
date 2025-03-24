import { useForm } from "react-hook-form";
import { AuthForm } from "src/components/organisms/AuthForm/AuthForm";
import type { AuthenticationFormBase } from "src/features/auth/types";
import { Heading } from "src/components/atoms/Typography/Heading";
import { Text } from "src/components/atoms/Typography/Text";
import { Card } from "src/components/atoms/Card";
import { useAuth } from "src/features/auth/hooks/useAuth";
import { LoadingSpinner } from "src/components/atoms/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "src/components/atoms/ErrorMessage/ErrorMessage";

interface LoginTemplateProps {
  title: string;
  subtitle?: string;
}

export const LoginTemplate: React.FC<LoginTemplateProps> = ({
  title,
  subtitle,
}) => {
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationFormBase>();

  const onSubmit = async (data: AuthenticationFormBase) => {
    console.log("Login form submitted with:", data);

    try {
      // login関数に処理を委譲
      const result = await login(data.email, data.password);
      console.log("Login process completed with result:", result);
    } catch (e) {
      console.error("Error during login process:", e);
    }
  };

  return (
    <Card
      width="w-full max-w-md mx-auto"
      padding="p-8 pb-10"
      className="shadow-md"
    >
      <div className="flex flex-col items-center gap-3 mb-6">
        <Heading level="h2" className="text-slate-800">
          {title}
        </Heading>
        {subtitle && <Text variant="subtle">{subtitle}</Text>}
      </div>
      {error && <ErrorMessage message={error.message} className="mb-4" />}
      <div className="relative">
        <AuthForm
          type="login"
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50">
            <LoadingSpinner size="lg" />
          </div>
        )}
      </div>
    </Card>
  );
};
