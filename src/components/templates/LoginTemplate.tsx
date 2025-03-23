import React from "react";
import { useForm } from "react-hook-form";
import { AuthForm } from "src/components/organisms/AuthForm/AuthForm";
import type { AuthenticationFormBase } from "src/types/forms/authentication-forms";

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
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[480px] w-[360px] rounded-lg shadow bg-white">
      <div className="flex flex-col items-center justify-center mb-8 h-[160px] gap-4">
        <h1 className="text-4xl font-extrabold text-slate-800">{title}</h1>
        {subtitle && <p className="text-slate-600 text-xs">{subtitle}</p>}
      </div>
      <AuthForm
        type="login"
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </div>
  );
};
