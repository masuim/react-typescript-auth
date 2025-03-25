import { useForm } from "react-hook-form";
import { AuthForm } from "@/components/organisms/AuthForm/AuthForm";
import { Heading, Text } from "@/components/atoms/Typography";
import { Card } from "@/components/atoms/Card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/authSchemas";

interface LoginTemplateProps {
  title: string;
  subtitle?: string;
}

export const LoginTemplate = ({ title, subtitle }: LoginTemplateProps) => {
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await login(data.email, data.password);
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
