/**
 * 基本的なボタンコンポーネント
 *
 * 注意:
 * - フォーム送信やローディング状態が必要な場合は、SubmitButtonを使用してください。
 * - 画面遷移の場合は、コンポーネント名に Link がつくコンポーネントを使用してください。
 */
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/atoms/loadings/LoadingSpinner";
import type {
  ButtonVariant,
  ButtonSize,
} from "@/components/atoms/links-and-buttons/styles/button-styles";
import {
  buttonBaseStyles,
  buttonVariantStyles,
  buttonSizeStyles,
} from "@/components/atoms/links-and-buttons/styles/button-styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      type = "button",
      disabled = false,
      isLoading = false,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          buttonBaseStyles,
          buttonVariantStyles[variant],
          buttonSizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <LoadingSpinner className="mr-2" size="sm" />}
        {children}
      </button>
    );
  }
);

