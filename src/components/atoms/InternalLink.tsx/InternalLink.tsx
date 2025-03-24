import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";
import { cn } from "../../../lib/utils";
import { theme } from "../../../config/theme";
import { forwardRef } from "react";

type LinkVariant = keyof typeof theme.typography.link;

export interface InternalLinkProps extends Omit<RouterLinkProps, "className"> {
  /**
   * リンクのバリアント
   * @default "default"
   */
  variant?: LinkVariant;
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
 * アプリケーション内の画面遷移に使用するリンクコンポーネント
 * react-router-domのLinkをラップしています
 */
export const InternalLink = forwardRef<HTMLAnchorElement, InternalLinkProps>(
  ({ variant = "default", className, children, to, ...props }, ref) => {
    const linkStyle = theme.typography.link[variant];

    return (
      <RouterLink
        to={to}
        ref={ref}
        className={cn(linkStyle, className)}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }
);
