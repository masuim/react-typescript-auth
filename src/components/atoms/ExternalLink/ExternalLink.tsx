import { cn } from "../../../lib/utils";
import { theme } from "../../../config/theme";
import { forwardRef } from "react";

type LinkVariant = keyof typeof theme.typography.link;

export interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
   * リンク先のURL
   */
  href: string;
  /**
   * 追加のクラス名
   */
  className?: string;
  /**
   * target="_blank"を自動で付与するかどうか
   * @default true
   */
  openInNewTab?: boolean;
}

/**
 * 外部サイトへのリンクに使用するコンポーネント
 * セキュリティのため、rel="noopener noreferrer"が自動で付与されます
 */
export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  (
    {
      variant = "default",
      className,
      children,
      href,
      openInNewTab = true,
      ...props
    },
    ref
  ) => {
    const linkStyle = theme.typography.link[variant];

    return (
      <a
        ref={ref}
        href={href}
        className={cn(linkStyle, className)}
        {...(openInNewTab
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
        {...props}
      >
        {children}
      </a>
    );
  }
);
