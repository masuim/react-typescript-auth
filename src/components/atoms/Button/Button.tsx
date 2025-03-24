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
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "src/lib/utils";
import { theme } from "src/config/theme";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

export const buttonVariants = cva(
  [
    theme.button.base.layout,
    theme.button.base.appearance,
    theme.button.base.interaction,
    theme.button.base.state,
  ].join(" "),
  {
    variants: {
      variant: theme.button.variants,
      size: theme.button.sizes,
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonVariant = keyof typeof theme.button.variants;
type ButtonSize = keyof typeof theme.button.sizes;
