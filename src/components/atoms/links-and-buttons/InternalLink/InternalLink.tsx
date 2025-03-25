import { forwardRef } from "react";
import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { LinkVariant } from "@/components/atoms/links-and-buttons/styles/link-styles";
import { linkVariants } from "@/components/atoms/links-and-buttons/styles/link-styles";

export interface InternalLinkProps extends Omit<LinkProps, "className"> {
  variant?: LinkVariant;
  children: React.ReactNode;
  className?: string;
}

/**
 * アプリケーション内の画面遷移に使用するリンクコンポーネント
 */
export const InternalLink = forwardRef<HTMLAnchorElement, InternalLinkProps>(
  ({ variant = "default", className, children, to, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        to={to}
        className={cn(
          linkVariants({
            variant,
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
