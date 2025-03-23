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
    <div className="flex flex-col items-center h-[380px] w-[360px] rounded-lg shadow bg-white pt-8 pb-6 px-6">
      <div className="flex flex-col items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <p className="text-slate-500 text-sm">{subtitle}</p>
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
