import { forwardRef } from "react";
import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";
import type {
  ButtonVariant,
  ButtonSize,
} from "@/components/atoms/links-and-buttons/styles/button-styles";
import {
  buttonBaseStyles,
  buttonVariantStyles,
  buttonSizeStyles,
} from "@/components/atoms/links-and-buttons/styles/button-styles";

export interface InternalLinkButtonProps extends Omit<LinkProps, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

/**
 * アプリケーション内の画面遷移に使用するボタン型スタイルのリンクコンポーネント
 * ユーザーが直感的に操作できるようにボタンのようなスタイルがついています
 */
export const InternalLinkButton = forwardRef<
  HTMLAnchorElement,
  InternalLinkButtonProps
>(({ className, variant = "default", size = "default", to, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      to={to}
      className={cn(
        buttonBaseStyles,
        buttonVariantStyles[variant],
        buttonSizeStyles[size],
        className
      )}
      {...props}
    />
  );
});
