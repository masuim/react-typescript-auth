/**
 * 基本的なボタンコンポーネント（Atomic Design: Atoms）
 *
 * このコンポーネントは最も基本的なボタンの機能を提供します。
 * - variant: ボタンのスタイルバリエーション（default, destructive, outline, etc.）
 * - size: ボタンのサイズ（sm, default, lg）
 * - asChild: Radix UIのSlot機能を使用して、別のコンポーネントとしてレンダリング可能
 *
 * 使用例:
 * - 単純なアクションボタン（キャンセル、閉じるなど）
 * - カスタムボタンコンポーネントの基礎として
 *
 * 注意: フォーム送信やローディング状態が必要な場合は、SubmitButtonを使用してください。
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
