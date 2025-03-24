import { useForm } from "react-hook-form";
import { AuthForm } from "src/components/organisms/AuthForm/AuthForm";
import type { AuthenticationFormBase } from "src/types/forms/authentication-forms";
import { Heading } from "src/components/atoms/Typography/Heading";
import { Text } from "src/components/atoms/Typography/Text";
import { Card } from "src/components/atoms/Card";

interface LoginTemplateProps {
  title: string;
  subtitle?: string;
}

export const LoginTemplate: React.FC<LoginTemplateProps> = ({
  title,
  subtitle,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationFormBase>();

  const onSubmit = (data: AuthenticationFormBase) => {
    // TODO: ログイン処理を追加
    console.log(data);
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
      <AuthForm
        type="login"
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </Card>
  );
};
