import * as React from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";
import { cn } from "../../../lib/utils";
import { buttonVariants } from "../Button/Button";

type ButtonVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface InternalLinkButtonProps
  extends Omit<RouterLinkProps, "className"> {
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
 * ボタンのような見た目のアプリケーション内リンクコンポーネント
 * CTAやメインアクションとして使用することを想定しています
 */
export const InternalLinkButton = React.forwardRef<
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
      <RouterLink
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
      </RouterLink>
    );
  }
);
