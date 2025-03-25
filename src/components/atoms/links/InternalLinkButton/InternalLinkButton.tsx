import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/atoms/Button";
import { forwardRef } from "react";

type ButtonVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface InternalLinkButtonProps extends Omit<LinkProps, "className"> {
  /**
   * ボタンのバリアント
   * @default "default"
   */
  variant?: ButtonVariant;
  /**
   * ボタンのサイズ
   * @default "default"
   */
  size?: ButtonSize;
  /**
   * リンクのテキストまたは内容
   */
  children: React.ReactNode;
  /**
   * 追加のクラス名
   */
  className?: string;
}

/**
 * アプリケーション内の画面遷移に使用するボタン型のリンクコンポーネント
 * ユーザーが直感的に操作できるようにボタンのようなスタイルがついています
 * react-router-domのLinkをラップしています
 */
export const InternalLinkButton = forwardRef<
  HTMLAnchorElement,
  InternalLinkButtonProps
>(
  (
    {
      variant = "default",
      size = "default",
      className,
      children,
      to,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        to={to}
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          })
        )}
        {...props}
      >
        {children}
      </Link>
    );
  }
);
