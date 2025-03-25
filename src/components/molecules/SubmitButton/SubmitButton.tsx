/**
 * フォーム送信用の拡張ボタンコンポーネント（Atomic Design: Molecules）
 *
 * 基本的なButtonコンポーネントを拡張し、以下の機能を追加:
 * - ローディング状態の表示（スピナーアニメーション）
 * - ローディング中のテキスト切り替え
 * - ローディング中の自動無効化
 * - デフォルトでtype="submit"
 * - 幅を親要素に合わせる（w-full）
 *
 * 使用例:
 * - フォームの送信ボタン
 * - 非同期処理を伴うアクション
 * - APIリクエストの実行ボタン
 *
 * 注意: 単純なUIアクションの場合は、基本的なButtonコンポーネントを使用してください。
 */
import { Button } from "@/components/atoms/links-and-buttons/Button";
import type { ButtonProps } from "@/components/atoms/links-and-buttons/Button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface SubmitButtonProps extends Omit<ButtonProps, "asChild"> {
  isLoading?: boolean;
  loadingText?: string;
}

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading = false,
      loadingText,
      type = "submit",
      variant = "primary",
      ...props
    },
    ref
  ) => {
    const buttonText = isLoading ? loadingText || children : children;

    return (
      <Button
        ref={ref}
        type={type}
        variant={variant}
        className={cn("w-full", className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        <span>{buttonText}</span>
      </Button>
    );
  }
);
