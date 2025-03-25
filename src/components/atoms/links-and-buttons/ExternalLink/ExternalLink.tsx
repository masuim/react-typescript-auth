import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { LinkVariant } from "../styles/link-styles";
import { linkVariants } from "../styles/link-styles";

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
   * 追加のクラス名
   */
  className?: string;
}

/**
 * 外部リンクコンポーネント
 * target="_blank"とrel="noopener noreferrer"が自動的に設定されます
 */
export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          linkVariants({
            variant,
            className,
          })
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);
